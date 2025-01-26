// navigation/tabs.js
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import Reports from '../screens/Reports';

import PostStack from '../navigation/postStack'; // Import the PostStack
import ReportScreen from '../screens/ReportScreen';

import SettingStack from '../navigation/SettingStack';


const Tab = createBottomTabNavigator();
const { height: windowHeight } = Dimensions.get('window');
const isSmallDevice = windowHeight < 700;

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: isSmallDevice ? -20 : -15,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: isSmallDevice ? 55 : 64,
        height: isSmallDevice ? 55 : 64,
        borderRadius: 40,
        backgroundColor: '#004d40',
        ...styles.shadow,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopColor: '#29292b',
          backgroundColor: '#1c1c1e',
          height: isSmallDevice ? 70 : 85,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../assets/icons/home.png')}
                resizeMode="contain"
                style={{
                  width: 18,
                  height: 18,
                  tintColor: focused ? '#004d40' : '#6c6c6e',
                }}
              />
              <Text style={{ color: focused ? '#004d40' : '#6c6c6e', fontSize: 10 }}>
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../assets/icons/document-signed.png')}
                resizeMode="contain"
                style={{
                  width: 18,
                  height: 18,
                  tintColor: focused ? '#004d40' : '#6c6c6e',
                }}
              />
              <Text style={{ color: focused ? '#004d40' : '#6c6c6e', fontSize: 10 }}>
                REPORTS
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={PostStack} // Use PostStack instead of ReportScreen
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/camera.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: '#fff',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../assets/icons/stats.png')}
                resizeMode="contain"
                style={{
                  width: 18,
                  height: 18,
                  tintColor: focused ? '#004d40' : '#6c6c6e',
                }}
              />
              <Text style={{ color: focused ? '#004d40' : '#6c6c6e', fontSize: 10 }}>
                STATS
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component = {SettingStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../assets/icons/settings-sliders.png')}
                resizeMode="contain"
                style={{
                  width: 18,
                  height: 18,
                  tintColor: focused ? '#004d40' : '#6c6c6e',
                }}
              />
              <Text style={{ color: focused ? '#004d40' : '#6c6c6e', fontSize: 10 }}>
                SETTINGS
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#272928',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
