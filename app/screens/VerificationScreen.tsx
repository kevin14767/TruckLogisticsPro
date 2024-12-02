import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, ScrollView, TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { PostStackParamList } from '../navigation/PostStackParamList';
import { BaseReceipt } from '../imagedetails/ReceiptInterfaces';
import { useNavigation, NavigationProp } from "@react-navigation/native";

type VerificationScreenRouteProp = RouteProp<PostStackParamList, 'VerificationScreen'>;

const VerificationScreen = ({ route }: { route: VerificationScreenRouteProp }) => {

    const navigation = useNavigation<NavigationProp<PostStackParamList>>();

    const { receipt, uri } = route.params;
  
    const [formData, setFormData] = useState<BaseReceipt>(receipt);
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const handleInputChange = (field: keyof BaseReceipt, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleImagePress = () => {
      setIsModalVisible(true);
    };
  
    const closeModal = () => {
      setIsModalVisible(false);
    };
  
    const handleSubmit = () => {
      console.log("Verified Receipt Data:", formData);
      alert("Receipt details saved successfully!");
    };

    const handleNavigateToReport = () => {
        navigation.navigate('ReportScreen', { receipt: formData, uri:uri });
    };
  
    return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {/* Header Section */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Verify Receipt</Text>
              <Text style={styles.headerSubtitle}>
                Please review and edit the receipt details below.
              </Text>
            </View>
      
            {/* Form Fields */}
            <View style={styles.section}>
              {Object.keys(formData).map((key) => (
                <View key={key} style={styles.formField}>
                  <Text style={styles.label}>{key}:</Text>
                  <TextInput
                    style={styles.input}
                    value={formData[key as keyof BaseReceipt]?.toString() || ''}
                    onChangeText={(text) => handleInputChange(key as keyof BaseReceipt, text)}
                    placeholder={`Enter ${key}`}
                    placeholderTextColor="#929292"
                  />
                </View>
              ))}
            </View>
      
            {/* Image Preview */}
            <TouchableOpacity onPress={handleImagePress}>
              <Image source={{ uri }} style={styles.imagePreview} resizeMode="contain" />
            </TouchableOpacity>
      
            {/* Full-Screen Image Modal */}
            <Modal visible={isModalVisible} transparent={true}>
              <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <Image source={{ uri }} style={styles.fullScreenImage} resizeMode="contain" />
                </View>
            </Modal>

            {/* Sticky Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleNavigateToReport}>
                <Text style={styles.submitButtonText}>Save and Continue</Text>
            </TouchableOpacity>

        </ScrollView>

    </View>

    );
  };
  
  export default VerificationScreen;
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#1c1c1e',
    },
    contentContainer: {
      paddingTop: 60,
      paddingBottom: 80, // Extra space for the sticky button
      paddingHorizontal: 16,
    },
    header: {
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 14,
      color: '#b0b0b0',
    },
    section: {
      marginBottom: 20,
    },
    formField: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      color: '#fff',
      marginBottom: 8,
    },
    input: {
      backgroundColor: '#29292b',
      color: '#fff',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#444',
    },
    imagePreview: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 16,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullScreenImage: {
      width: '100%',
      height: '80%',
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    stickyButtonContainer: {
        backgroundColor: '#007BFF',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 20, // Additional space at the bottom
    },
    submitButton: {
      backgroundColor: '#007BFF',
      borderRadius: 8,
      paddingVertical: 18,
      alignItems: 'center',
      marginBottom: 36, // Additional space at the bottom
      paddingHorizontal: 24,


    },
    submitButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
  });
  