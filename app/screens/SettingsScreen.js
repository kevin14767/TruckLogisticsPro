import React, { useContext, useEffect, useState } from 'react';
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
import firestore from '@react-native-firebase/firestore';
import defaultImage from "../assets/icons/default-avatar.png";
import { useFocusEffect } from '@react-navigation/native'; // Add this import

export default function Example() {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const navigation = useNavigation();

  // Fetch user data from Firestore
  const getUserData = async () => {
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

  const getLocation = () => {
    if (!userData) return 'Unknown Location';
    const { city = '', state = '' } = userData;
    return `${city}, ${state}`.trim().replace(/^, |, $/g, ''); // Handles empty fields gracefully
  };
  const getFullName = () => {
    if (!userData) return 'John Doe';
    const { fname = '', lname = '' } = userData;
    return `${fname} ${lname}`.trim();
  };

  const renderAvatar = () => {
    if (userData && userData.fname && userData.lname) {
      const initials = `${userData.fname[0]}${userData.lname[0]}`.toUpperCase();
      return (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      );
    }
    return (
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>JD</Text>
      </View>
    );
  };


  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1e' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Manage your account settings.</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profile}>
          {renderAvatar()}

         <Text style={styles.profileName}>{getFullName()}</Text>   
         <Text style={styles.profileEmail}>{userData?.email || 'john.doe@mail.com'}</Text>



            <TouchableOpacity
              onPress={() => navigation.navigate('EditScreen')}>
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Edit Profile</Text>
                <FeatherIcon color="#fff" name="edit" size={16} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Log Out</Text>
                <FeatherIcon color="#fff" name="log-out" size={16} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity style={styles.row}>
                  <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                    <FeatherIcon color="#29292b" name="globe" size={20} />
                  </View>
                  <Text style={styles.rowLabel}>Language</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>English</Text>
                  <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                </TouchableOpacity>
              </View>

              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View style={[styles.rowIcon, { backgroundColor: '#007AFF' }]}>
                    <FeatherIcon color="#29292b" name="moon" size={20} />
                  </View>
                  <Text style={styles.rowLabel}>Dark Mode</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={(darkMode) => setForm({ ...form, darkMode })}
                    value={form.darkMode}
                  />
                </View>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity style={styles.row}>
                  <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                    <FeatherIcon color="#29292b" name="navigation" size={20} />
                  </View>
                  <Text style={styles.rowLabel}>Location</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>{getLocation()}</Text>     
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                    <FeatherIcon color="#29292b" name="at-sign" size={20} />
                  </View>
                  <Text style={styles.rowLabel}>Email Notifications</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={(emailNotifications) =>
                      setForm({ ...form, emailNotifications })
                    }
                    value={form.emailNotifications}
                  />
                </View>
              </View>

              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                    <FeatherIcon color="#29292b" name="bell" size={20} />
                  </View>
                  <Text style={styles.rowLabel}>Push Notifications</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={(pushNotifications) =>
                      setForm({ ...form, pushNotifications })
                    }
                    value={form.pushNotifications}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginBottom: 36,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  /** Header */
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#b0b0b0',
    marginTop: 6,
  },
  /** Profile */
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#29292b',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#29292b',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    backgroundColor: '#fff'
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#ffff',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#b0b0b0',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004d40',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: '600',
    color: '#b0b0b0',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: '#29292b',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#29292b',
  },
  /** Row */
  row: {
    paddingVertical: 12,
    paddingRight: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFirst: {
    paddingTop: 16,
  },
  rowWrapper: {
    paddingRight: 16,
    marginLeft: 0,
    borderTopWidth: 1,
    borderColor: '#444444',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '300',
    color: '#b0b0b0',
    marginRight: 8,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowIcon: {
    marginRight: 12,
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});