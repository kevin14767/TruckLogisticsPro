// app/i18n/index.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
  en: {
    translation: {
      // Auth & Onboarding
      english: 'English',
      spanish: 'Spanish',
      continue: 'Continue',
      
      // Navigation
      home: 'HOME',
      reports: 'REPORTS',
      stats: 'STATS',
      settings: 'SETTINGS',
      
      // Settings
      languagePreference: 'Language Preference',
      
      // Common
      save: 'Save',
      cancel: 'Cancel',

      // Settings tab
      manageAccount: 'Manage your account settings.',
      preferences: 'Preferences',
      notifications: 'Notifications',
      language: 'Language',
      darkMode: 'Dark Mode',
      location: 'Location',
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',

      // onboarding
      welcome: 'Welcome to TruckingLogisticsPro',
      selectLanguage: 'Choose your preferred language',
      chooseLater: 'You can change the language later in settings'
      
    }
  },
  es: {
    translation: {
      // Auth & Onboarding
      welcome: 'Bienvenido a TruckingLogisticsPro',
      selectLanguage: 'Elige tu idioma preferido',
      english: 'Inglés',
      spanish: 'Español',
      chooseLater: 'Puedes cambiar el idioma más tarde en configuración',
      continue: 'Continuar',
      
      // Navigation
      home: 'INICIO',
      reports: 'INFORMES',
      stats: 'ESTADÍSTICAS',
      settings: 'AJUSTES',
      
      // Settings
      languagePreference: 'Preferencia de Idioma',
      
      // Common
      save: 'Guardar',
      cancel: 'Cancelar',

      manageAccount: 'Administra la configuración de tu cuenta.',
      preferences: 'Preferencias',
      notifications: 'Notificaciones',
      language: 'Idioma',
      darkMode: 'Modo Oscuro',
      location: 'Ubicación',
      emailNotifications: 'Notificaciones por Correo',
      pushNotifications: 'Notificaciones Push'
    }
  }
};

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false
  }
});

// Helper functions for language persistence
export const loadStoredLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('userLanguage');
    if (savedLanguage) {
      await i18n.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.error('Error loading language:', error);
  }
};

export const setLanguage = async (language: string) => {
  try {
    await AsyncStorage.setItem('userLanguage', language);
    await i18n.changeLanguage(language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

export default i18n;