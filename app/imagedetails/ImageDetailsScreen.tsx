import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import styles from "./ImageDetailsStyles";
import { ImageDetailRouteType, responseType } from "./ImageDetailsTypes";
import { recognizeImage } from "./ImageDetailsUtils";
import RNFS from "react-native-fs";

// import { OPENAI_API_KEY } from '@env';
import axios from "axios";
// Initialize the OpenAI SDK


const ImageDetailsScreen = () => {
  const route = useRoute<RouteProp<ImageDetailRouteType, "imageDetails">>();

  const [response, setResponse] = useState<Array<responseType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [structuredData, setStructuredData] = useState<object | null>(null);
  const [processingWithAI, setProcessingWithAI] = useState(false);

  const uri = route?.params?.uri;
  let tempPath: string | null = null; // To store the temporary file path

  useEffect(() => {
    console.log("Image URI passed to ImageDetailsScreen:", uri);
    if (uri) {
      processImage(uri);
    }
    // Cleanup on component unmount
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
        console.log("Temporary file deleted:", path);
      } else {
        console.log("Temporary file already deleted or does not exist:", path);
      }
    } catch (error) {
      console.error("Error deleting temporary file:", error);
    }
  };
  
  
  const prepareUniqueFilePath = async (uri: string) => {
    const fileExtension = uri.split(".").pop(); // Get file extension
    const fileName = `${Date.now()}.${fileExtension}`; // Generate unique name
    const tempPath = `${RNFS.TemporaryDirectoryPath}${fileName}`; // Fix double slashes
  
    try {
      // Copy the file to the temporary path
      await RNFS.copyFile(uri, tempPath);
      console.log("File successfully copied to temp path:", tempPath);
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
      console.log("Full temp path:", tempPath);
      
      // Debug: Check file existence
      const fileExists = await RNFS.exists(tempPath);
      console.log("File exists:", fileExists);
  
      // Try different path formats
      const pathFormats = [
        tempPath,
        `file://${tempPath}`,
        `file:///${tempPath}`,
        decodeURIComponent(tempPath)
      ];
  
      for (const path of pathFormats) {
        console.log("Trying path:", path);
        try {
          const result = await recognizeImage(path);
          if (result?.blocks?.length > 0) {
            setResponse(result?.blocks);
            return;
          }
        } catch (pathError) {
          console.error(`Error with path ${path}:`, pathError);
        }
      }
  
      throw new Error("Could not process image with any path format");
    } catch (error) {
      console.error("Comprehensive error processing image:", error);
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
      const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `Analyze this text and return structured data in JSON format: ${fullExtractedText}`,
            },
          ],
          max_tokens: 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
  
      const resultText = result.data.choices[0]?.message?.content?.trim();
  
      try {
        setStructuredData(JSON.parse(resultText || "{}"));
      } catch (parseError) {
        console.error("Error parsing OpenAI response:", parseError);
        alert("Failed to parse structured data.");
      }
    } catch (error) {
      console.error("Error processing with OpenAI:", error);
      alert("Failed to process data with OpenAI.");
    } finally {
      setProcessingWithAI(false);
    }
  };
  
  return (
    <View style={styles.outerView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Top Section */}
        <Text style={styles.titleImage}>Image:</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri }} style={styles.addedImage} resizeMode="contain" />
        </View>

        {/* Extracted Text Section */}
        <Text style={styles.titleResult}>Extracted Text:</Text>
        <View style={styles.textScrollContainer}>
          <ScrollView contentContainerStyle={styles.textContentContainer}>
            {response.length !== 0 ? (
              <View style={styles.resultWrapper}>
                {response.map((block, index) => (
                  <Text style={styles.textStyle} key={index}>
                    {block.text}
                  </Text>
                ))}
              </View>
            ) : isLoading ? (
              <ActivityIndicator size="large" color="#007BFF" />
            ) : (
              <Text style={styles.titleResult}>No text found.</Text>
            )}
          </ScrollView>
        </View>

        {/* Process Button */}
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.button} onPress={handleProcessWithAI}>
            <Text style={styles.buttonText}>
              {processingWithAI ? "Processing..." : "Process with AI"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Structured Data Section */}
        {structuredData && (
          <View style={styles.structuredDataContainer}>
            <Text style={styles.titleResult}>Structured Data:</Text>
            <ScrollView
              contentContainerStyle={styles.structuredDataContent}
              style={styles.structuredDataScroll}
            >
              <Text style={styles.textStyle}>
                {JSON.stringify(structuredData, null, 2)}
              </Text>
            </ScrollView>
          </View>
        )}

       


      </ScrollView>
    </View>
  );
};

export default ImageDetailsScreen;
