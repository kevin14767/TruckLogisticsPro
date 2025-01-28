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
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../i188n';
import { ActivityIndicator } from 'react-native';

export default function Example() {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isLanguageLoading, setIsLanguageLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const navigation = useNavigation();

  // Add this function to handle language change
  const handleLanguageChange = async () => {
    setIsLanguageLoading(true);
    try {
      const newLanguage = i18n.language === 'en' ? 'es' : 'en';
      await setLanguage(newLanguage);
    } catch (error) {
      console.log('Error changing language:', error);
    } finally {
      setIsLanguageLoading(false);
    }
  };
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black_grey }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('settings')}</Text>
          <Text style={styles.headerSubtitle}>{t('manageAccount')}</Text>
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
            <Text style={styles.sectionTitle}>{t('preferences')}</Text>

            <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity 
                style={styles.row}
                onPress={() => {
                  // Toggle between English and Spanish
                  handleLanguageChange(i18n.language === 'en' ? 'es' : 'en');
                }}>
                <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                  <FeatherIcon color="#29292b" name="globe" size={20} />
                </View>
                <Text style={styles.rowLabel}>{t('languagePreference')}</Text>
                <View style={styles.rowSpacer} />
                {isLanguageLoading ? (
                  <ActivityIndicator size="small" color={Colors.greenThemeColor} />
                ) : (
                  <>
                    <Text style={styles.rowValue}>
                      {i18n.language === 'en' ? t('english') : t('spanish')}
                    </Text>
                    <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                  </>
                )}
              </TouchableOpacity>
            </View>


              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View style={[styles.rowIcon, { backgroundColor: '#007AFF' }]}>
                    <FeatherIcon color="#29292b" name="moon" size={20} />
                  </View>
                  <Text style={styles.rowLabel}>{t('darkMode')}</Text>
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
                  <Text style={styles.rowLabel}>{t('location')}</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>{getLocation()}</Text>     
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('notifications')}</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                    <FeatherIcon color="#29292b" name="at-sign" size={20} />
                  </View>
                  <Text style={styles.rowLabel}>{t('emailNotifications')}</Text>
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
                  <Text style={styles.rowLabel}>{t('pushNotifications')}</Text>
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
    backgroundColor: Colors.black_grey,
    paddingVertical: 24,
    flex: 1,
    marginBottom: 24,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.grey,
    marginTop: 8,
  },
  profile: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: Colors.darkGrey,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: Colors.greenThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.greenThemeColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  avatarText: {
    fontSize: 28,
    color: Colors.white,
    fontWeight: '700',
  },
  profileName: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
  },
  profileEmail: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.grey,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    marginHorizontal: 24,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.grey,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionBody: {
    backgroundColor: Colors.darkGrey,
    borderRadius: 16,
    marginHorizontal: 16,
    paddingLeft: 16,
    overflow: 'hidden',
  },
  row: {
    paddingVertical: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: Colors.transParent,
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
    flex: 1,
  },
  rowValue: {
    fontSize: 16,
    color: Colors.grey,
    marginRight: 8,
  },
  rowIcon: {
    marginRight: 16,
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowSpacer: {
    flex: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});