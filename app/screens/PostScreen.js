import React, { useState } from 'react';
import { Button, Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchCamera as _launchCamera } from 'react-native-image-picker';
import { launchImageLibrary as _launchLibrary } from 'react-native-image-picker';

const PostScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const navigation = useNavigation(); // Access navigation

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    _launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri); // Set image directly without cropping
        setIsPhotoTaken(true); // Photo is taken
      }
    });
  };

  const handleRetakePhoto = () => {
    setSelectedImage(null);
    setIsPhotoTaken(false); // Reset to allow retaking the photo
  };

  const handleImageLibraryLaunch = () => {
    //this will for image selection from photo library
    const options = {
      mediaType: 'photo',
    };
    _launchLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled');
      }else if (response.error) {
        console.log('Image picker error: ', response.error);
      }else {
        let imageUri = response.uri || response.assets?.[0].uri;
        setSelectedImage(imageUri); // Set image directly without cropping
        setIsPhotoTaken(true); // Photo is taken
      }
    });

  }

  const process = () => {
    if (selectedImage) {
      navigation.navigate('ImageDetailsScreen', { uri: selectedImage });
    } else {
      console.log('No image selected');
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
  
          {/* Process Image Button under the Image Preview */}
          <TouchableOpacity onPress={process} style={styles.processImage}>
            <Text style={styles.buttonText}>Process Image</Text>
          </TouchableOpacity>
  
          {/* Retake Button at the top-right corner */}
          <TouchableOpacity onPress={handleRetakePhoto} style={styles.retakeButton}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity onPress={handleCameraLaunch} style={styles.openCamera}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImageLibraryLaunch} style={styles.openLibrary}>
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
    backgroundColor: '#29292b',
  },
  openCamera: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ff6347',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center', // Center text within the button
    marginRight: 10, // Add space between the two buttons
  },
  openLibrary: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4682b4',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center', // Center text within the button
    marginLeft: 10, // Add space between the two buttons
  },
  imagePreview: {
    width: '100%',
    height: '60%',
  },
  processImage: {
    backgroundColor: '#ff6347',
    padding: 13,
    borderRadius: 5,
    marginTop: 15, // Adds space between the image and button
  },
  retakeButton: {
    position: 'absolute',
    top: 90, // Adjust as needed
    right: 20,
    backgroundColor: '#ff6347',
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 120, // Place the buttons near the bottom of the screen
    flexDirection: 'row', // Place the buttons next to each other
    justifyContent: 'space-between', // Space between the buttons
    width: '90%', // Adjust width to fit the buttons with padding on the sides
    paddingHorizontal: 10, // Add padding for the container sides
  },
});


export default PostScreen;
