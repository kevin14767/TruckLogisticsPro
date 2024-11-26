import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import styles from "./ImageDetailsStyles";
import { ImageDetailRouteType, responseType } from "./ImageDetailsTypes";
import { recognizeImage } from "./ImageDetailsUtils";
import OpenAI from "openai";

import {API_KEY} from "@env";
import axios from "axios";
// Initialize the OpenAI SDK
const openai = new OpenAI({
  apiKey: API_KEY,
});

const ImageDetailsScreen = () => {
  const route = useRoute<RouteProp<ImageDetailRouteType, "imageDetails">>();
  const [response, setResponse] = useState<Array<responseType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [structuredData, setStructuredData] = useState<object | null>(null);
  const [processingWithAI, setProcessingWithAI] = useState(false);

  const uri = route?.params?.uri;

  useEffect(() => {
    if (uri) {
      processImage(uri);
    }
  }, [uri]);

  const processImage = async (url: string) => {
    try {
      const result = await recognizeImage(url);
      setIsLoading(false);
      if (result?.blocks?.length > 0) {
        setResponse(result?.blocks);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error processing image:", error);
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
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
  
      const resultText = result.data.choices[0]?.message?.content?.trim();
      setStructuredData(JSON.parse(resultText || "{}"));
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

        <h1>
          Fields
        </h1>


      </ScrollView>
    </View>
  );
};

export default ImageDetailsScreen;
