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
                <Text style={styles.closeButtonText}>X</Text>
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
      paddingBottom: 80,
      paddingHorizontal: 20,
    },
    header: {
      marginBottom: 24,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: '#fff',
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: '#b0b0b0',
      lineHeight: 22,
    },
    section: {
      marginBottom: 24,
    },
    formField: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: '#fff',
      marginBottom: 8,
      fontWeight: '500',
    },
    input: {
      backgroundColor: '#29292b',
      color: '#fff',
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#444',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    imagePreview: {
      width: '100%',
      height: 250,
      borderRadius: 12,
      marginBottom: 20,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      justifyContent: 'center',
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
      backgroundColor: '#004d40',
      padding: 12,
      borderRadius: 30,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      elevation: 5,
      zIndex: 1,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    submitButton: {
      backgroundColor: '#004d40',
      borderRadius: 12,
      paddingVertical: 18,
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 36,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    submitButtonText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#fff',
    },
   });
  