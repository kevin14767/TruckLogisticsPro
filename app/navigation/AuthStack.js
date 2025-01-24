import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    useEffect(() => {
        const checkFirstLaunch = async () => {
            try {
                const value = await AsyncStorage.getItem('alreadyLaunched');
                if (value === null) {
                    await AsyncStorage.setItem('alreadyLaunched', 'true');
                    setIsFirstLaunch(true);
                } else {
                    setIsFirstLaunch(false);
                }
            } catch (error) {
                console.error('Error checking AsyncStorage', error);
                setIsFirstLaunch(false); // Default to showing login
            }
        };

        checkFirstLaunch();
    }, []);

    if (isFirstLaunch === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Stack.Navigator initialRouteName={isFirstLaunch ? 'Onboarding' : 'Login'}>
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
                
                // options={({ navigation }) => ({
                //     title: '',
                //     headerStyle: {
                //         backgroundColor: '#29292b',
                //         shadowColor: '#29292b',
                //         elevation: 0,
                //     },
                //     headerLeft: () => (
                //         <View style={{ marginLeft: 10 }}>
                //             <FontAwesome.Button
                //                 name="long-arrow-left"
                //                 size={25}
                //                 backgroundColor="#29292b"
                //                 color="#fff"
                //                 onPress={() => navigation.navigate('Login')}
                //             />
                //         </View>
                //     ),
                // })}
                options={{header: ()=> null}}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;
