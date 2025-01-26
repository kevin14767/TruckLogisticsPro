import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImagePicker from "react-native-image-crop-picker";
import { Colors, horizontalScale, verticalScale, moderateScale } from '../themes';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you have react-native-vector-icons installed

const PostScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const navigation = useNavigation();

  const handleSelectImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 1080,
        height: 1920,
        cropping: true,
        freeStyleCropEnabled: true,
      });
      setSelectedImage(image.path);
      setIsPhotoTaken(true);
    } catch (error) {
      console.error("Image selection error:", error.message);
    }
  };

  const handleOpenCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 1080,
        height: 1920,
        cropping: true,
        freeStyleCropEnabled: true,
      });
      setSelectedImage(image.path);
      setIsPhotoTaken(true);
    } catch (error) {
      console.error("Camera capture error:", error.message);
    }
  };

  const handleRetakePhoto = () => {
    setSelectedImage(null);
    setIsPhotoTaken(false);
  };

  const handleProcess = () => {
    if (selectedImage) {
      console.log("Processing Image");
      navigation.navigate("ImageDetailsScreen", { uri: selectedImage });
    } else {
      console.log("No image selected");
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <>
          <Image
            source={{ uri: selectedImage }}
            style={styles.imagePreview}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={handleRetakePhoto} style={styles.retakeButton}>
            <Icon name="refresh" size={24} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProcess} style={styles.processImage}>
            <Text style={styles.buttonText}>Process Image</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity onPress={handleOpenCamera} style={styles.button}>
            <Icon name="camera-alt" size={24} color={Colors.white} />
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSelectImage} style={styles.button}>
            <Icon name="photo-library" size={24} color={Colors.white} />
            <Text style={styles.buttonText}>Open Photo Library</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkGrey,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.redThemeColor,
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginHorizontal: horizontalScale(10),
    flex: 1,
  },
  imagePreview: {
    width: '100%',
    height: '65%', // Keep the original height
    
  },
  processImage: {
    backgroundColor: Colors.redThemeColor,
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginTop: verticalScale(20),
  },
  retakeButton: {
    position: 'absolute',
    top: verticalScale(60),
    right: horizontalScale(20),
    backgroundColor: Colors.redThemeColor,
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: horizontalScale(10),
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: verticalScale(120),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: horizontalScale(10),
  },
});

export default PostScreen;