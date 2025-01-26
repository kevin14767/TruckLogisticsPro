// LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Colors, horizontalScale, verticalScale, moderateScale } from '../themes';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const { googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Image 
            source={require('../assets/icons/logo.jpg')} 
            style={styles.logo} 
          />
          <Text style={styles.title}>Trucking Logistics Pro</Text>
          <Text style={styles.subtitle}>Welcome back!</Text>
        </View>

        <View style={styles.formContainer}>
          <FormInput
            labelValue={email}
            onChangeText={setEmail}
            placeholderText="Email"
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FormInput
            labelValue={password}
            onChangeText={setPassword}
            placeholderText="Password"
            iconType="lock"
            secureTextEntry
          />
          
          <TouchableOpacity 
            style={styles.forgotButton} 
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotButtonText}>Forgot Password?</Text>
          </TouchableOpacity>

          <FormButton 
            buttonTitle="Sign In" 
            onPress={() => login(email, password)} 
          />
        </View>

        <View style={styles.socialButtonsContainer}>
          <Text style={styles.orText}>- OR -</Text>
          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#004d40"
            backgroundColor="#ffffff"
            onPress={googleLogin}
          />
        </View>

        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.createAccountText}>
            Don't have an account? <Text style={styles.signUpText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black_grey,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(20),
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  logo: {
    height: moderateScale(120),
    width: moderateScale(120),
    resizeMode: 'cover',
    borderRadius: moderateScale(60),
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: verticalScale(15),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: Colors.grey,
    marginTop: verticalScale(5),
  },
  formContainer: {
    width: '100%',
    marginBottom: verticalScale(5),
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginVertical: verticalScale(15),
  },
  forgotButtonText: {
    color: Colors.grey,
    fontWeight: '600',
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.grey,
  },
  orText: {
    color: Colors.grey,
    paddingHorizontal: horizontalScale(10),
    fontSize: moderateScale(14),
    fontWeight: '600',
    textAlign: 'center',
  },
  createAccountButton: {
    marginTop: verticalScale(20),
  },
  createAccountText: {
    color: Colors.grey,
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  signUpText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default LoginScreen;