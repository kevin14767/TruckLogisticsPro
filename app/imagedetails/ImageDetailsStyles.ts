import { StyleSheet } from 'react-native';
import { Colors, moderateScale } from '../themes';

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    backgroundColor: '#29292b',
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(50),
    paddingBottom: moderateScale(20),
  },
  addedImage: {
    width: '90%',
    height: moderateScale(200),
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  titleImage: {
    fontSize: moderateScale(20),
    paddingVertical: moderateScale(10),
    color: Colors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
  titleResult: {
    fontSize: moderateScale(20),
    paddingTop: moderateScale(10),
    color: Colors.white,
    fontWeight: '500',
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  textScrollContainer: {
    maxHeight: moderateScale(150), // Constrain height for scrolling
    borderWidth: 1,
    borderColor: '#b0b0b0',
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: '#3a3a3c',
    marginBottom: moderateScale(20),
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
    color: '#b0b0b0',
    marginBottom: moderateScale(5),
    lineHeight: moderateScale(22),
  },
  button: {
    backgroundColor: '#007BFF',
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%',
    padding: moderateScale(15),
    borderRadius: moderateScale(5),
    marginVertical: moderateScale(20),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: moderateScale(17),
  },
  structuredDataContainer: {
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(10),
  },
  structuredDataScroll: {
    maxHeight: moderateScale(250), // Constrain height for scrolling
    borderWidth: 1,
    borderColor: '#b0b0b0',
    borderRadius: moderateScale(10),
    backgroundColor: '#3a3a3c',
    padding: moderateScale(10),
  },
  structuredDataContent: {
    flexGrow: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(20),
  },
  
});

export default styles;
