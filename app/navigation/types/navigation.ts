// src/navigation/types/navigation.ts
import { BaseReceipt } from '../../imagedetails/ReceiptInterfaces';

export type RootStackParamList = {
  Home: undefined;
  Reports: undefined;
  Stats: undefined;
  Settings: undefined;
  PostStack: undefined;
  EditScreen: undefined;
  LanguageSelection: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type PostStackParamList = {
  PostScreen: undefined;
  ImageDetailsScreen: { uri: string };
  VerificationScreen: { receipt: BaseReceipt; uri: string };
  ReportScreen: { receipt: BaseReceipt; uri: string };
};

export type AuthStackParamList = {
  Language: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type SettingsStackParamList = {
  SettingsScreen: undefined;
  EditScreen: undefined;
};