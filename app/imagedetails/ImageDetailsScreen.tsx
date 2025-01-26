// ImageDetailsScreen.tsx
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, TouchableOpacity, ActivityIndicator, Platform, Modal } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import styles from "./ImageDetailsStyles";
import { ImageDetailRouteType, responseType } from "./ImageDetailsTypes";
import { recognizeImage } from "./ImageDetailsUtils";
import RNFS from "react-native-fs";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { PostStackParamList } from "../navigation/PostStackParamList";
import { BaseReceipt, ReceiptType } from './ReceiptInterfaces';
import { ReceiptProcessingService } from './ReceiptProcessingService';

const ImageDetailsScreen = () => {
 const route = useRoute<RouteProp<ImageDetailRouteType, "imageDetails">>();
 const [isImageModalVisible, setIsImageModalVisible] = useState(false);
 const [response, setResponse] = useState<Array<responseType>>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [receiptType, setReceiptType] = useState<ReceiptType | null>(null);
 const [processedReceipt, setProcessedReceipt] = useState<BaseReceipt | null>(null);
 const [structuredData, setStructuredData] = useState<object | null>(null);
 const [processingWithAI, setProcessingWithAI] = useState(false);

 const navigation = useNavigation<NavigationProp<PostStackParamList>>();
 const uri = route?.params?.uri;
 let tempPath: string | null = null;

 useEffect(() => {
   if (uri) {
     processImage(uri);
   }
   return () => {
     if (tempPath) {
       cleanupTemporaryFile(tempPath);
     }
   };
 }, [uri]);

 const cleanupTemporaryFile = async (path: string) => {
   try {
     const exists = await RNFS.exists(path);
     if (exists) {
       await RNFS.unlink(path);
     }
   } catch (error) {
     console.error("Error deleting temporary file:", error);
   }
 };

 const prepareUniqueFilePath = async (uri: string) => {
   const fileExtension = uri.split(".").pop();
   const fileName = `${Date.now()}.${fileExtension}`;
   const tempPath = `${RNFS.TemporaryDirectoryPath}${fileName}`;
   
   try {
     await RNFS.copyFile(uri, tempPath);
     return tempPath;
   } catch (error) {
     console.error("Error copying file to temp path:", error);
     throw error;
   }
 };

 const processImage = async (url: string) => {
   let tempPath;
   try {
     tempPath = await prepareUniqueFilePath(url);
     const fileUrl = Platform.OS === 'ios' 
       ? tempPath.startsWith('file://') ? tempPath : `file://${tempPath}`
       : tempPath;
     
     const result = await recognizeImage(fileUrl);
     if (result?.blocks?.length > 0) {
       setResponse(result?.blocks);
     }
   } catch (error) {
     console.error("Error processing image:", error);
     setIsLoading(false);
   } finally {
     if (tempPath) {
       await cleanupTemporaryFile(tempPath);
     }
   }
 };

 const handleProcessWithAI = async () => {
   if (response.length === 0) {
     alert("Extracted text is empty! Please analyze the image first.");
     return;
   }
 
   setProcessingWithAI(true);
   const fullExtractedText = response.map((block) => block.text).join(" ");
 
   try {
     const classifiedType = await ReceiptProcessingService.classifyReceiptType(fullExtractedText);
     
     if (!classifiedType) {
       alert('Could not classify receipt type.');
       return;
     }
     setReceiptType(classifiedType);

     const processedReceiptData = await ReceiptProcessingService.processReceiptByType(
       fullExtractedText, 
       classifiedType
     );
     if (processedReceiptData) {
       setProcessedReceipt(processedReceiptData);
     }
   } catch (error) {
     console.error("Error processing with OpenAI:", error);
     alert("Failed to process data with OpenAI.");
   } finally {
     setProcessingWithAI(false);
   }
 };

 const handleVerifyReceipt = () => {
   if (!processedReceipt) {
     alert("No processed receipt available for verification.");
     return;
   }
   navigation.navigate("VerificationScreen", { receipt: processedReceipt, uri });
 };

 const renderExtractedText = () => {
   if (response.length === 0) {
     return isLoading ? (
       <ActivityIndicator size="large" color="#007BFF" />
     ) : (
       <Text style={styles.titleResult}>No text found.</Text>
     );
   }

   return (
     <View style={styles.resultWrapper}>
       {response.map((block, index) => (
         <Text style={styles.textStyle} key={index}>
           {block.text}
         </Text>
       ))}
     </View>
   );
 };

 const renderProcessedReceipt = () => {
   if (!processedReceipt) return null;

   return (
     <View style={styles.structuredDataContainer}>
       <Text style={styles.titleResult}>
         {processedReceipt.receiptType} Receipt Details:
       </Text>
       <ScrollView
         contentContainerStyle={styles.structuredDataContent}
         style={styles.structuredDataScroll}
       >
         <Text style={styles.textStyle}>
           {JSON.stringify(processedReceipt, null, 2)}
         </Text>
       </ScrollView>
     </View>
   );
 };

 return (
   <View style={styles.outerView}>
     <ScrollView contentContainerStyle={styles.scrollContent}>
       <Text style={styles.titleImage}>Image:</Text>
       <View style={styles.imageContainer}>
         <TouchableOpacity onPress={() => setIsImageModalVisible(true)}>
           <Image source={{ uri }} style={styles.addedImage} resizeMode="contain" />
         </TouchableOpacity>
       </View>

       <Modal visible={isImageModalVisible} transparent={true}>
         <View style={styles.modalView}>
           <TouchableOpacity style={styles.closeButton} onPress={() => setIsImageModalVisible(false)}>
             <Text style={styles.closeText}>×</Text>
           </TouchableOpacity>
           <Image source={{ uri }} style={styles.fullScreenImage} />
         </View>
       </Modal>

       <Text style={styles.titleResult}>Extracted Text:</Text>
       <View style={styles.textScrollContainer}>
         <ScrollView contentContainerStyle={styles.textContentContainer}>
           {renderExtractedText()}
         </ScrollView>
       </View>

       <View style={styles.imageContainer}>
         <TouchableOpacity 
           style={styles.button} 
           onPress={handleProcessWithAI}
           disabled={processingWithAI || response.length === 0}
         >
           <Text style={styles.buttonText}>
             {processingWithAI ? 'Processing...' : 'Process with AI'}
           </Text>
         </TouchableOpacity>
       </View>

       {renderProcessedReceipt()}

       {processedReceipt && (
         <View style={styles.verify_receipt}>
           <TouchableOpacity
             style={styles.submitButton}
             onPress={handleVerifyReceipt}
           >
             <Text style={styles.buttonText}>Verify Receipt</Text>
           </TouchableOpacity>
         </View>
       )}
     </ScrollView>
   </View>
 );
};

export default ImageDetailsScreen;