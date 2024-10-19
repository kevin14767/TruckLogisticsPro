import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;
    useEffect(() =>{
      AsyncStorage.getItem('alreadyLaunched').then(value => {
        if (value == null){
          AsyncStorage.setItem('alreadyLaunched','true'); // no need to wait for setItem to finish although u can handle errors
          setIsFirstLaunch(true);
        }else{
          setIsFirstLaunch(false);
        }
      }); //add some error handling also you can simply do setIsFirstLaunch(null)
      
    },[]);

    if (isFirstLaunch === null){
        return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
      }else if( isFirstLaunch == true){
        routeName = 'Onboarding';
      }else{
        routeName = 'Login';
      }
  
      return(
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{header: () => null}}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{header: () => null}}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={({navigation}) => ({
                title: '',
                headerStyle: {
                  backgroundColor: '#29292b',
                  shadowColor: '#29292b',
                  elevation: 0,
                },
                headerLeft: () => (
                  <View style={{marginLeft: 10}}>
                    <FontAwesome.Button 
                      name="long-arrow-left"
                      size={25}
                      backgroundColor="#29292b"
                      color="#fff"
                      onPress={() => navigation.navigate('Login')}
                    />
                  </View>
                ),
              })}
            />

        </Stack.Navigator>
      );

};

export default AuthStack;