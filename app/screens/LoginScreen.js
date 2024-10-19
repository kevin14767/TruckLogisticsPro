import React, { useState, useContext } from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, ScrollView} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/Forminput';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const LoginScreen = () =>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {login} = useContext(AuthContext);
    const navigation = useNavigation(); // Initialize navigation

    
    return(
        <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
        <Image
          source={require('../assets/icons/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>Trucking Logistics Pro</Text>

        <FormInput
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholderText={"Email"}
            iconType={"user"}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
        />


        <FormInput
            labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholderText="Password"
            iconType="lock"
            secureTextEntry={true}
        />
        
        <FormButton
            buttonTitle="Sign In"
            onPress={() => login(email, password)}
        />

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
            <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>


        <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            // onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            // onPress={() => googleLogin()}
          />



        <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.navButtonText}>
                Don't have an acount? Create here
            </Text>
        </TouchableOpacity>


        </ScrollView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#29292b",
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 125
    },
    scrollView: {
      backgroundColor: '#29292b', // Set the background color of the ScrollView
      flex: 1, // Ensure it takes the full height
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
      color: '#ffff',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 20,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#fff',
      //fontFamily: 'Lato-Regular',
    },
  });