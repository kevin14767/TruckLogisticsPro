import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Initialize Google Sign-In configuration
GoogleSignin.configure({
  // Get this value from your GoogleService-Info.plist file
  iosClientId: '109641224107-qeear70iu9183fcl29r1le38bpnklupe.apps.googleusercontent.com',
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Add this new method for Google Sign-In
  const googleLogin = async () => {
    try {
      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();
      
      // Create a Firebase credential from the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign in to Firebase with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      
      // If this is a new user, create their document in Firestore
      const currentUser = userCredential.user;
      
      // Check if user document already exists
      const userDoc = await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get();
        
      if (!userDoc.exists) {
        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .set({
            fname: currentUser.displayName?.split(' ')[0] || '',
            lname: currentUser.displayName?.split(' ').slice(1).join(' ') || '',
            email: currentUser.email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
          });
        console.log('New Google user added to Firestore!');
      }
    } catch (error) {
      if (error.code === 'SIGN_IN_CANCELLED') {
        console.log('User cancelled the sign-in flow');
      } else if (error.code === 'IN_PROGRESS') {
        console.log('Sign-in is already in progress');
      } else {
        console.log('Google sign-in error:', error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        googleLogin, // Add the new Google sign-in method to the context
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
        logout: async () => {
          try {
            // Sign out from Google
            if (await GoogleSignin.isSignedIn()) {
              await GoogleSignin.signOut();
            }
            // Sign out from Firebase
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};