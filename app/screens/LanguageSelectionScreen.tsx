// app/screens/LanguageSelectionScreen.tsx
import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Image, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, horizontalScale, verticalScale, moderateScale } from '../themes';
import { setLanguage } from '../i188n';
import FormButton from '../components/FormButton';

const LanguageSelectionScreen = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = async (language: string) => {
    await setLanguage(language);
    navigation.navigate('Onboarding');
  };

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
          <Text style={styles.subtitle}>{t('selectLanguage')}</Text>
        </View>

        <View style={styles.formContainer}>
          <FormButton 
            buttonTitle={t('english')}
            onPress={() => handleLanguageChange('en')}
            backgroundColor={i18n.language === 'en' ? Colors.greenThemeColor : Colors.grey}
          />

          <FormButton 
            buttonTitle={t('spanish')}
            onPress={() => handleLanguageChange('es')}
            backgroundColor={i18n.language === 'es' ? Colors.greenThemeColor : Colors.grey}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{t('chooseLater')}</Text>
        </View>
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
    marginTop: verticalScale(20),
  },
  footerContainer: {
    marginTop: verticalScale(20),
  },
  footerText: {
    color: Colors.grey,
    fontSize: moderateScale(14),
    textAlign: 'center',
  }
});

export default LanguageSelectionScreen;