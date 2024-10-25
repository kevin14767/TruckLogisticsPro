import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from '../screens/SettingsScreen';
import EditScreen from '../screens/EditScreen';
//import profileScreenTemp for second version

const Stack = createStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}}/>
      <Stack.Screen name="EditScreen" component={EditScreen} options={{headerShown: true}} />
    </Stack.Navigator>
  );
};

export default SettingStack;
