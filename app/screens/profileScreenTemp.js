//temporary user profile screen
import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { AuthContext } from '../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
    const {user, logout} = useContext(AuthContext);

    const navigation = useNavigation(); // Initialize navigation


    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1e' }}>
            <ScrollView
            style={styles.container}
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            showsVerticalScrollIndicator={false}
            >
            
            <Image
            style = {styles.userImg}
            source={require('../assets/icons/Default_pfp.svg.png')}
            />

            <Text style={styles.profileName}>John Doe</Text>

            <Text style={styles.profileEmail}>john.doe@mail.com</Text>


            <View style={styles.userBtnWrapper}>


                <TouchableOpacity
                onPress={() => {
                    // handle onPress
                    navigation.navigate('EditScreen');
                }}>
                <View style={styles.userBtn}>
                    <Text style={styles.userBtnTxt}>Edit Profile</Text>
                    <FeatherIcon color="#fff" name="edit" size={16} />
                </View>

                </TouchableOpacity>


                <TouchableOpacity
                onPress={() => {
                    logout() //see how this works
                }}>
                <View style={styles.userBtn}>
                    <Text style={styles.userBtnTxt}>Log Out</Text>
                    <FeatherIcon color="#fff" name="log-out" size={16} />
                </View>

                </TouchableOpacity>



            </View>








            </ScrollView>


        </SafeAreaView>
    );

};

export default ProfileScreen;


const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#1c1c1e',
      padding:20,
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
    },
    text: {
      fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 35,
    },
    userImg: {
        height:150,
        width:150,
        borderRadius:75,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom:10,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
      fontFamily: 'Lato-Regular',
    },
    userBtn: {
       borderWidth:2,
       borderRadius:3,
       paddingVertical:8,
       paddingHorizontal:12,
       marginHorizontal:5, 
    },
    userBtnTxt:{
        color:'ffff',
    },
    userBtnWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        width:'100%',
        marginBottom:10,
    }
  });