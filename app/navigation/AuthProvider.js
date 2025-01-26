import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';

// Initial configuration for Google Sign-In
// This runs when the app starts and sets up the basic parameters needed for Google authentication
GoogleSignin.configure({
  iosClientId: '109641224107-qeear70iu9183fcl29r1le38bpnklupe.apps.googleusercontent.com',
  webClientId: '109641224107-bov0hmctvj2td85cmb9rnda27fjac6ls.apps.googleusercontent.com',
  offlineAccess: true, // This allows the app to refresh tokens when needed
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Central state management for user authentication status
  const [user, setUser] = useState(null);

  // Enhanced Google Sign-In implementation
  // This function handles the complete flow from Google authentication to Firebase sign-in
  const googleLogin = async () => {
    try {
      // Clear any existing sign-in state to prevent conflicts
      if (GoogleSignin && typeof GoogleSignin.signOut === 'function') {
        await GoogleSignin.signOut();
      }

      // Verify Google Play Services availability
      // This check is helpful even on iOS to ensure proper service initialization
      await GoogleSignin.hasPlayServices();
      
      // Initiate Google Sign-In and get user information
      const userInfo = await GoogleSignin.signIn();
      console.log('Successfully completed Google Sign In');
      
      // Retrieve authentication tokens
      const { accessToken } = await GoogleSignin.getTokens();
      console.log('Successfully got tokens');
      
      // Create Firebase credential using both ID token and access token
      const credential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        accessToken
      );
      console.log('Created credential');

      // Sign in to Firebase using the Google credential
      const result = await auth().signInWithCredential(credential);
      console.log('Successfully signed in to Firebase');

      // Handle Firestore user document creation or verification
      if (result.user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(result.user.uid)
          .get();
          
        // Create a new user document if it doesn't exist
        if (!userDoc.exists) {
          await firestore()
            .collection('users')
            .doc(result.user.uid)
            .set({
              fname: result.user.displayName?.split(' ')[0] || '',
              lname: result.user.displayName?.split(' ').slice(1).join(' ') || '',
              email: result.user.email,
              createdAt: firestore.Timestamp.fromDate(new Date()),
            });
          console.log('Created new user document in Firestore');
        }
      }
    } catch (error) {
      // Comprehensive error logging for debugging
      console.log('Detailed error information:', {
        errorCode: error.code,
        errorMessage: error.message,
        fullError: JSON.stringify(error, null, 2)
      });
      
      if (error?.response) {
        console.log('Error response:', error.response);
      }

      // Handle specific error cases
      if (error.code === 'SIGN_IN_CANCELLED') {
        console.log('User cancelled the sign-in flow');
      } else if (error.code === 'IN_PROGRESS') {
        console.log('Sign-in is already in progress');
      }
    }
  };

  // Enhanced logout function that handles both Google and Firebase sign-out
  const logout = async () => {
    try {
      // Check if GoogleSignin is available and properly initialized
      if (GoogleSignin && typeof GoogleSignin.isSignedIn === 'function') {
        try {
          const isSignedInWithGoogle = await GoogleSignin.isSignedIn();
          if (isSignedInWithGoogle) {
            await GoogleSignin.signOut();
            console.log('Successfully signed out from Google');
          }
        } catch (googleError) {
          console.log('Google sign out error:', googleError);
          // Continue with Firebase logout even if Google sign out fails
        }
      }

      // Proceed with Firebase sign out
      await auth().signOut();
      console.log('Successfully signed out from Firebase');
      
      // Clear the user state
      setUser(null);
    } catch (error) {
      console.log('Error during sign out:', {
        code: error?.code,
        message: error?.message,
        fullError: JSON.stringify(error, null, 2)
      });
      
      // Final cleanup attempt even if main logout fails
      try {
        await auth().signOut();
        setUser(null);
      } catch (finalError) {
        console.log('Final sign out attempt failed:', finalError);
      }
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

  // Context provider that makes authentication methods available throughout the app
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        // Standard email/password login
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        googleLogin, // Enhanced Google sign-in method
        // User registration with email/password
        register: async (email, password) => {
          try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const currentUser = userCredential.user;
            if (currentUser) {
              await firestore()
                .collection('users')
                .doc(currentUser.uid)
                .set({
                  fname: '',
                  lname: '',
                  email: email,
                  createdAt: firestore.Timestamp.fromDate(new Date()),
                });
              console.log('User added to Firestore!');
            }
          } catch (e) {
            console.log('Error during registration:', e);
          }
        },
        logout, // Enhanced logout method
        resetPassword,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};