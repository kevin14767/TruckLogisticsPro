import React, { useContext, useState } from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, ScrollView} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/Forminput';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';


const SignupScreen = () =>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const {register} = useContext(AuthContext);
    const navigation = useNavigation(); // Initialize navigation


    return(
        <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
    
        <Text style={styles.text}>Create an account</Text>

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


        <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />
        
        <FormButton
            buttonTitle="Sign up"
            onPress={() => register(email, password)}
        />

        <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
                By registering, you confirm that you accept our{' '}
            </Text>
            <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
                    Terms of service
                </Text>
            </TouchableOpacity>
            <Text style={styles.color_textPrivate}> and </Text>
            <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Privacy Policy
            </Text>
        </View>

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
            style={styles.navButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.navButtonText}>
                Have an account? Sign In
            </Text>
        </TouchableOpacity>


        </ScrollView>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#29292b",
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50
    },
    scrollView: {
      backgroundColor: '#29292b', // Set the background color of the ScrollView
      flex: 1, // Ensure it takes the full height
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
   
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#fff',
      //fontFamily: 'Lato-Regular',
    },
    textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 35,
      justifyContent: 'center',
    },
    color_textPrivate: {
      fontSize: 13,
      fontWeight: '400',
      fontFamily: 'Lato-Regular',
      color: 'grey',
    },
  });