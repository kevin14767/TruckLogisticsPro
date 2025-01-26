import { StyleSheet } from 'react-native';
import { Colors, moderateScale } from '../themes';

const styles = StyleSheet.create({
 outerView: {
   flex: 1,
   backgroundColor: Colors.black_grey,
   paddingHorizontal: moderateScale(16),
   paddingTop: moderateScale(50),
   paddingBottom: moderateScale(20),
 },
 addedImage: {
   width: '100%',
   height: moderateScale(250),
   borderRadius: moderateScale(12),
   marginTop: moderateScale(16),
 },
 titleImage: {
   fontSize: moderateScale(24),
   color: Colors.white,
   fontWeight: '600',
   marginBottom: moderateScale(8),
 },
 titleResult: {
   fontSize: moderateScale(20),
   color: Colors.white,
   fontWeight: '600',
   marginTop: moderateScale(24),
   marginBottom: moderateScale(16),
 },
 imageContainer: {
   width: '100%',
   backgroundColor: Colors.darkGrey,
   borderRadius: moderateScale(12),
   padding: moderateScale(12),
   marginBottom: moderateScale(2),
 },
 verify_receipt: {
  width: '100%',
  // backgroundColor: Colors.darkGrey,
  // borderRadius: moderateScale(12),
  padding: moderateScale(12),
  marginBottom: moderateScale(26),
  marginTop: moderateScale(1),
},

 textScrollContainer: {
   maxHeight: moderateScale(180),
   borderRadius: moderateScale(12),
   backgroundColor: Colors.darkGrey,
   padding: moderateScale(16),
   marginBottom: moderateScale(24),
   shadowColor: Colors.black,
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 8,
   elevation: 3,
 },
 textContentContainer: {
   flexGrow: 1,
 },
 resultWrapper: {
   paddingHorizontal: moderateScale(10),
   paddingVertical: moderateScale(5),
 },
 textStyle: {
   fontSize: moderateScale(16),
   color: Colors.grey,
   lineHeight: moderateScale(24),
   marginBottom: moderateScale(8),
 },
 button: {
   backgroundColor: Colors.redThemeColor,
   width: '100%',
   padding: moderateScale(16),
   borderRadius: moderateScale(12),
   marginVertical: moderateScale(10),
 },
 submitButton: {
   backgroundColor: Colors.redThemeColor,
   width: '100%',
   padding: moderateScale(16),
   borderRadius: moderateScale(12),
   marginTop: moderateScale(24),
   marginBottom: moderateScale(32),
 },
 buttonText: {
   color: Colors.white,
   fontWeight: '600',
   fontSize: moderateScale(16),
   textAlign: 'center',
 },
 structuredDataContainer: {
   backgroundColor: Colors.darkGrey,
   borderRadius: moderateScale(12),
   padding: moderateScale(16),
   marginTop: moderateScale(24),
 },
 structuredDataScroll: {
   maxHeight: moderateScale(250),
   marginTop: moderateScale(12),
 },
 structuredDataContent: {
   flexGrow: 1,
 },
 scrollContent: {
   flexGrow: 1,
   paddingHorizontal: moderateScale(10),
   paddingBottom: moderateScale(20),
 },
 modalView: {
   flex: 1,
   backgroundColor: Colors.black,
 },
 fullScreenImage: {
   width: '100%',
   height: '100%',
   resizeMode: 'contain',
 },
 closeButton: {
  position: 'absolute',
  top: 40,
  right: 20,
  padding: 12,
  zIndex: 1,
  backgroundColor: Colors.redThemeColor,
  borderRadius: 30,
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: Colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  elevation: 5, },
 closeText: {
  color: Colors.white,
  fontSize: 24,
  fontWeight: '600',
  lineHeight: 24, }
});

export default styles;