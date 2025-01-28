import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';

GoogleSignin.configure({
  iosClientId: '109641224107-qeear70iu9183fcl29r1le38bpnklupe.apps.googleusercontent.com',
  webClientId: '109641224107-bov0hmctvj2td85cmb9rnda27fjac6ls.apps.googleusercontent.com',
  offlineAccess: true,
});

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleAuthError = (error) => {
    console.log('Detailed error information:', {
      errorCode: error.code,
      errorMessage: error.message,
      fullError: JSON.stringify(error, null, 2)
    });
    
    if (error?.response) {
      console.log('Error response:', error.response);
    }

    if (error.code === 'SIGN_IN_CANCELLED') {
      console.log('User cancelled the sign-in flow');
    } else if (error.code === 'IN_PROGRESS') {
      console.log('Sign-in is already in progress');
    }
  };

  const googleLogin = async () => {
    try {
      if (GoogleSignin?.signOut) {
        await GoogleSignin.signOut();
      }

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Successfully completed Google Sign In');
      
      const { accessToken } = await GoogleSignin.getTokens();
      console.log('Successfully got tokens');
      
      const credential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        accessToken
      );
      console.log('Created credential');

      const result = await auth().signInWithCredential(credential);
      console.log('Successfully signed in to Firebase');

      if (result.user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(result.user.uid)
          .get();
          
        if (!userDoc.exists) {
          const newUser = {
            uid: result.user.uid,
            fname: result.user.displayName?.split(' ')[0] || '',
            lname: result.user.displayName?.split(' ').slice(1).join(' ') || '',
            email: result.user.email || '',
            createdAt: firestore.Timestamp.fromDate(new Date()),
          };

          await firestore()
            .collection('users')
            .doc(result.user.uid)
            .set(newUser);
            
          setUser(newUser);
          console.log('Created new user document in Firestore');
        }
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const logout = async () => {
    try {
      if (GoogleSignin?.isSignedIn) {
        try {
          const isSignedInWithGoogle = await GoogleSignin.isSignedIn();
          if (isSignedInWithGoogle) {
            await GoogleSignin.signOut();
            console.log('Successfully signed out from Google');
          }
        } catch (googleError) {
          console.log('Google sign out error:', googleError);
        }
      }

      await auth().signOut();
      console.log('Successfully signed out from Firebase');
      setUser(null);
    } catch (error) {
      handleAuthError(error);
      try {
        await auth().signOut();
        setUser(null);
      } catch (finalError) {
        console.log('Final sign out attempt failed:', finalError);
      }
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      if (userCredential.user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(userCredential.user.uid)
          .get();

        const userData = userDoc.data();
        setUser(userData);
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const register = async (email, password) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      if (userCredential.user) {
        const newUser = {
          uid: userCredential.user.uid,
          email: email,
          fname: '',
          lname: '',
          createdAt: firestore.Timestamp.fromDate(new Date()),
        };

        await firestore()
          .collection('users')
          .doc(userCredential.user.uid)
          .set(newUser);

        setUser(newUser);
        console.log('User added to Firestore!');
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const resetPassword = async (email) => {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Success', 'Password reset email has been sent');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        googleLogin,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};