import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import { AuthContext } from "./AuthProvider";

import AuthStack from "./AuthStack";
import Tabs from "./tabs"; // Capitalize the component name

const Routes = () => {
    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true); // Initialize to true

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false); // Update initializing state
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return () => subscriber(); // unsubscribe on unmount
    }, []);

    if (initializing) {
        // Optionally return a loading component or a simple text
        return null;
    }

    return (
        <NavigationContainer>
            {user ? <Tabs /> : <AuthStack />}
        </NavigationContainer>
    );
};


export default Routes;
