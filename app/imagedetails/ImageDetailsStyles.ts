import {StyleSheet} from 'react-native';
import {Colors, moderateScale} from '../themes';

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    backgroundColor: '#29292b',
  },
  addedImage: {
    width: '90%',
    height: '90%',
    right: moderateScale(70),
  },
  titleImage: {
    top: moderateScale(10),
    fontSize: moderateScale(20),
    paddingVertical: moderateScale(30),
    paddingHorizontal: moderateScale(20),
    color: Colors.white,
    fontWeight: '500',
  },
  titleResult: {
    fontSize: moderateScale(20),
    paddingTop: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    color: Colors.white,
    fontWeight: '500',
    bottom: moderateScale(10),
  },
  imageContainer: {
    flex: 1,
  },
  resultWrapper: {
    margin: moderateScale(20),
  },
  textStyle: {
    fontSize: moderateScale(17),
    color: '#b0b0b0',
  },
  buttonContainer: {
    flex: 1,
    paddingTop: moderateScale(20),
    justifyContent: 'center',
  },
  button: {
    top: moderateScale(30),
    backgroundColor: '#007BFF',
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%', // Adjust width to fit the buttons with padding on the sides
    padding: moderateScale(20),
    borderRadius: moderateScale(5),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: moderateScale(17),
  },
  fuelDataContainer: {
    marginTop: moderateScale(20),
    padding: moderateScale(15),
    backgroundColor: '#3a3a3c',
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(4),
    elevation: moderateScale(3),
  },
  fuelDataText: {
    fontSize: moderateScale(16),
    color: Colors.white,
    marginBottom: moderateScale(5),
  },
});

export default styles;
