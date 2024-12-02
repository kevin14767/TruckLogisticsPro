import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PostStackParamList } from './PostStackParamList';
import PostScreen from '../screens/PostScreen';
import ImageDetailsScreen from '../imagedetails/ImageDetailsScreen';
import VerificationScreen from '../screens/VerificationScreen';
import ReportScreen from '../screens/ReportScreen';

const Stack = createStackNavigator<PostStackParamList>();

const PostStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PostScreen" 
        component={PostScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ImageDetailsScreen" 
        component={ImageDetailsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="VerificationScreen" 
        component={VerificationScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ReportScreen" 
        component={ReportScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default PostStack;
