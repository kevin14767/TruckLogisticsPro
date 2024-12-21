import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import defaultImage from "../assets/icons/default-avatar.png";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
import firestore from '@react-native-firebase/firestore';
import Avatar from "react-avatar";

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
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FeatherIcon name="corner-up-left" size={25} color="#fff" />
      </TouchableOpacity>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.imageContainer}>{renderAvatar()}</View>
          </TouchableOpacity>
          <Text style={styles.userName}>
            {userData ? `${userData.fname} ${userData.lname}` : ''}
          </Text>
        </View>

        {/* Input Fields */}
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} color={"#fff"} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#fff"
            value={userData?.fname || ''}
            onChangeText={(txt) => setUserData({ ...userData, fname: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} color={"#fff"} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#fff"
            value={userData?.lname || ''}
            onChangeText={(txt) => setUserData({ ...userData, lname: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="phone" size={20} color={"#fff"} />
          <TextInput
            placeholder="Phone"
            keyboardType="number-pad"
            placeholderTextColor="#fff"
            value={userData?.phone || ''}
            onChangeText={(txt) => setUserData({ ...userData, phone: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={20} color={"#fff"} />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#fff"
            value={userData?.email || ''}
            onChangeText={(txt) => setUserData({ ...userData, email: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="globe" size={20} color={"#fff"} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#fff"
            value={userData?.country || ''}
            onChangeText={(txt) => setUserData({ ...userData, country: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FeatherIcon name="map-pin" size={20} color={"#fff"} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#fff"
            value={userData?.city || ''}
            onChangeText={(txt) => setUserData({ ...userData, city: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FeatherIcon name="map" size={20} color={"#fff"} />
          <TextInput
            placeholder="State"
            placeholderTextColor="#fff"
            value={userData?.state || ''}
            onChangeText={(txt) => setUserData({ ...userData, state: txt })}
            style={styles.textInput}
          />
        </View>

        <FormButton buttonTitle="Update" onPress={handleUpdate} />
      </View>
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    paddingTop: 36,
  },
  backButton: {
    marginTop: 20,
    marginLeft: 10,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007BFF",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
  },
  imageBackground: {
    height: 100,
    width: 100,
  },
  imageStyle: {
    borderRadius: 50,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#fff",
  },
});
