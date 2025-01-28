import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, Image, TouchableOpacity } from 'react-native';
import { Colors, horizontalScale, verticalScale, moderateScale } from '../themes';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';

const ForgotPasswordScreen = ({ navigation }) => {
 const [email, setEmail] = useState('');
 const { resetPassword } = useContext(AuthContext);

 const handleReset = async () => {
   if (email) {
     await resetPassword(email);
     navigation.goBack();
   } else {
     Alert.alert('Oops!', 'Please enter your email address');
   }
 };

 return (
   <SafeAreaView style={styles.safeArea}>
     <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
         <Text style={styles.backText}>← Back</Text>
       </TouchableOpacity>

       <View style={styles.contentContainer}>         
         <Text style={styles.title}>Forgot Password?</Text>
         <Text style={styles.subtitle}>
           No worries! Enter your email and we'll send you instructions to reset your password.
         </Text>

         <View style={styles.inputContainer}>
           <FormInput
             labelValue={email}
             onChangeText={setEmail}
             placeholderText="Enter your email"
             iconType="mail"
             keyboardType="email-address"
           />
         </View>

         <FormButton
           buttonTitle="Reset Password"
           onPress={handleReset}
         />
       </View>
     </View>
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 safeArea: {
   flex: 1,
   backgroundColor: Colors.black_grey,
 },
 container: {
   flex: 1,
   padding: horizontalScale(20),
 },
 backButton: {
 },
 backText: {
   color: Colors.white,
   fontSize: moderateScale(16),
 },
 contentContainer: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 image: {
   width: moderateScale(200),
   height: moderateScale(200),
   marginBottom: verticalScale(30),
 },
 title: {
   fontSize: moderateScale(28),
   fontWeight: 'bold',
   color: Colors.white,
   marginBottom: verticalScale(10),
 },
 subtitle: {
   fontSize: moderateScale(14),
   color: Colors.grey,
   textAlign: 'center',
   marginBottom: verticalScale(30),
   paddingHorizontal: horizontalScale(20),
 },
 inputContainer: {
   width: '100%',
   marginBottom: verticalScale(20),
 }
});

export default ForgotPasswordScreen;