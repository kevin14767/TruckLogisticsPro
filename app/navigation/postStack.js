// navigation/PostStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PostScreen from '../screens/PostScreen';
import ImageDetailsScreen from '../imagedetails/ImageDetailsScreen';
import TextProcessingScreen from '../screens/TextProcessingScreen';

const Stack = createStackNavigator();

const PostStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostScreen" component={PostScreen} options={{headerShown: false}}/>
      <Stack.Screen name="ImageDetailsScreen" component={ImageDetailsScreen} options={{headerShown: false}} />
      <Stack.Screen name="TextProcessing" component={TextProcessingScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default PostStack;
