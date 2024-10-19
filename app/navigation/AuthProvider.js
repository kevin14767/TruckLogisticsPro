import React, {createContext, useState} from 'react';
import Auth from '@react-native-firebase/auth';
import { Firestore } from 'firebase/firestore';

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return(
        <AuthContext.Provider
            value={{
            user,
            setUser,
            login: async (email, password) => {
                try {
                    await Auth().signInWithEmailAndPassword(email, password);
                } catch (e) {
                    console.log(e);
                }
            },
            register: async(email, password) => {
                try{
                    await Auth().createUserWithEmailAndPassword(email, password);
                } catch(e) {
                    console.log(e);
                }

            },
            logout: async () =>{
                try{
                    await Auth().signOut();
                } catch(e){
                    console.log(e);
                }
            },
            }}>
        {children}
        </AuthContext.Provider>



    );
}