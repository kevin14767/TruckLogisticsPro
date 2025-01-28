import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import defaultImage from "../assets/icons/default-avatar.png";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
import firestore from '@react-native-firebase/firestore';
import { Colors, moderateScale, horizontalScale, verticalScale } from '../themes';


const EditScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();

      if (documentSnapshot.exists) {
        setUserData(documentSnapshot.data());
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          fname: userData.fname || '',
          lname: userData.lname || '',
          phone: userData.phone || '',
          email: userData.email || '',
          country: userData.country || '',
          city: userData.city || '',
          state: userData.state || '',
        });

      Alert.alert('Profile Updated!', 'Your profile has been updated successfully.');
    } catch (error) {
      console.log('Error updating user profile:', error);
      Alert.alert('Update Failed', 'Something went wrong while updating your profile.');
    }
  };

  const renderAvatar = () => {
    if (userData && userData.fname && userData.lname) {
      const initials = `${userData.fname[0]}${userData.lname[0]}`.toUpperCase();
      return (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require("../assets/icons/default-avatar.png")}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FeatherIcon name="corner-up-left" size={25} color={Colors.white} />
      </TouchableOpacity>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.imageContainer}>{renderAvatar()}</View>
            </TouchableOpacity>
            <Text style={styles.userName}>
              {userData ? `${userData.fname} ${userData.lname}` : ''}
            </Text>
          </View>

          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} color={Colors.grey} />
            <TextInput
              placeholder="First Name"
              placeholderTextColor={Colors.grey}
              value={userData?.fname || ''}
              onChangeText={(txt) => setUserData({ ...userData, fname: txt })}
              style={styles.textInput}
            />
          </View>

          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} color={Colors.grey} />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor={Colors.grey}
              value={userData?.lname || ''}
              onChangeText={(txt) => setUserData({ ...userData, lname: txt })}
              style={styles.textInput}
            />
          </View>

          <View style={styles.action}>
            <FontAwesome name="phone" size={20} color={Colors.grey} />
            <TextInput
              placeholder="Phone"
              keyboardType="number-pad"
              placeholderTextColor={Colors.grey}
              value={userData?.phone || ''}
              onChangeText={(txt) => setUserData({ ...userData, phone: txt })}
              style={styles.textInput}
            />
          </View>

          <View style={styles.action}>
            <FontAwesome name="envelope-o" size={20} color={Colors.grey} />
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor={Colors.grey}
              value={userData?.email || ''}
              onChangeText={(txt) => setUserData({ ...userData, email: txt })}
              style={styles.textInput}
            />
          </View>

          <View style={styles.action}>
            <FontAwesome name="globe" size={20} color={Colors.grey} />
            <TextInput
              placeholder="Country"
              placeholderTextColor={Colors.grey}
              value={userData?.country || ''}
              onChangeText={(txt) => setUserData({ ...userData, country: txt })}
              style={styles.textInput}
            />
          </View>

          <View style={styles.action}>
            <FeatherIcon name="map-pin" size={20} color={Colors.grey} />
            <TextInput
              placeholder="City"
              placeholderTextColor={Colors.grey}
              value={userData?.city || ''}
              onChangeText={(txt) => setUserData({ ...userData, city: txt })}
              style={styles.textInput}
            />
          </View>

          <View style={styles.action}>
            <FeatherIcon name="map" size={20} color={Colors.grey} />
            <TextInput
              placeholder="State"
              placeholderTextColor={Colors.grey}
              value={userData?.state || ''}
              onChangeText={(txt) => setUserData({ ...userData, state: txt })}
              style={styles.textInput}
            />
          </View>

          <FormButton 
            buttonTitle="Update" 
            onPress={handleUpdate}
            style={styles.updateButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_grey,
  },
  contentContainer: {
    padding: moderateScale(20),
    paddingBottom: moderateScale(40),
  },
  backButton: {
    padding: moderateScale(16),
    marginLeft: horizontalScale(8),
  },
  profileSection: {
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  imageContainer: {
    height: moderateScale(120),
    width: moderateScale(120),
    borderRadius: moderateScale(60),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.greenThemeColor,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  avatar: {
    height: moderateScale(120),
    width: moderateScale(120),
    borderRadius: moderateScale(60),
    backgroundColor: Colors.greenThemeColor,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  avatarText: {
    fontSize: moderateScale(42),
    color: Colors.white,
    fontWeight: "700",
  },
  imageBackground: {
    height: moderateScale(120),
    width: moderateScale(120),
  },
  imageStyle: {
    borderRadius: moderateScale(60),
  },
  userName: {
    marginTop: verticalScale(16),
    fontSize: moderateScale(24),
    fontWeight: "700",
    color: Colors.white,
    marginBottom: verticalScale(24),
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.darkGrey,
    marginVertical: verticalScale(8),
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  textInput: {
    flex: 1,
    paddingLeft: horizontalScale(12),
    color: Colors.white,
    fontSize: moderateScale(16),
  },
  updateButton: {
    marginTop: verticalScale(24),
    backgroundColor: Colors.greenThemeColor,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: moderateScale(32),
  }
});
