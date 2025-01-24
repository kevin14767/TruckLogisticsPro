import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Colors, horizontalScale, verticalScale, moderateScale } from '../themes';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const { googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Join Trucking Logistics Pro</Text>
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
          <FormInput
            labelValue={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderText="Confirm Password"
            iconType="lock"
            secureTextEntry
          />

          <FormButton 
            buttonTitle="Sign Up" 
            onPress={() => register(email, password)}
          />
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By registering, you confirm that you accept our{' '}
            <Text 
              style={styles.termsLink}
              onPress={() => alert('Terms Clicked!')}
            >
              Terms of Service
            </Text>
            {' '}and{' '}
            <Text 
              style={styles.termsLink}
              onPress={() => alert('Privacy Policy Clicked!')}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <SocialButton
          buttonTitle="Sign In with Google"
          btnType="google"
          color="#004d40"
          backgroundColor={Colors.white}
          onPress={googleLogin}
        />

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.signInText}>
            Have an account? <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
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
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: verticalScale(5),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: Colors.grey,
  },
  formContainer: {
    width: '100%',
    marginBottom: verticalScale(20),
  },
  termsContainer: {
    marginVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(10),
  },
  termsText: {
    fontSize: moderateScale(14),
    color: Colors.grey,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
  termsLink: {
    color: Colors.redThemeColor,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(5),
    marginBottom: verticalScale(15),
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
  },
  signInButton: {
    marginTop: verticalScale(20),
  },
  signInText: {
    color: Colors.grey,
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  signInLink: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default SignupScreen;