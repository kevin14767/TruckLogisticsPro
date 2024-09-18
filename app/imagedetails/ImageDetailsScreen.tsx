import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import styles from './ImageDetailsStyles';
import { ImageDetailRouteType, responseType } from './ImageDetailsTypes';
import { recognizeImage } from './ImageDetailsUtils';

//fuel data type for parsing
type FuelData = {
  fuelType: string | null;
  amountPurchased: number | null;
  pricePerGallon: number | null;
  totalCost: number | null;
};

// function for extracting some regex
const extractFuelData = (text: string): FuelData => {
  const fuelTypeMatch = text.match(/\b(gas|diesel)\b/i);
  const amountPurchasedMatch = text.match(/\b(\d+(\.\d+)?)\s*(gallons|liters)\b/i);
  const pricePerGallonMatch = text.match(/\bPrice\s*Per\s*Gallon\s*[:$]*\s*(\d+(\.\d+)?)\b/i);
  const totalCostMatch = text.match(/\bTotal\s*Cost\s*[:$]*\s*(\d+(\.\d+)?)\b/i);

  return {
    fuelType: fuelTypeMatch ? fuelTypeMatch[1] : null,
    amountPurchased: amountPurchasedMatch ? parseFloat(amountPurchasedMatch[1]) : null,
    pricePerGallon: pricePerGallonMatch ? parseFloat(pricePerGallonMatch[1]) : null,
    totalCost: totalCostMatch ? parseFloat(totalCostMatch[1]) : null,
  };
};

const ImageDetailsScreen = () => {
  const route = useRoute<RouteProp<ImageDetailRouteType, 'imageDetails'>>();
  const [response, setResponse] = useState<Array<responseType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  //variables for setFuelData
  const [fuelData, setFuelData] = useState<FuelData | null>(null); // Ensure correct type
  const uri = route?.params?.uri;

  useEffect(() => {
    if (uri) {
      processImage(uri);
    }
  }, [uri]);

  const processImage = async (url: string) => {
    if (url) {
      try {
        const result = await recognizeImage(url);
        setIsLoading(false);
        if (result?.blocks?.length > 0) {
          setResponse(result?.blocks);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  // analyzingOutput
  const handleAnalyzeOutput = () => {
    const text = response.map(block => block.text).join(' ');
    const extractedData = extractFuelData(text);
    setFuelData(extractedData); // No more red underline
  };

  return (
    <View style={styles.outerView}>
      <Text style={styles.titleImage}>Image:</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri }} style={styles.addedImage} resizeMode="contain" />
      </View>
      <Text style={styles.titleResult}>Output:</Text>
      <ScrollView style={styles.imageContainer}>
        {response.length !== 0 ? (
          <View style={styles.resultWrapper}>
            {response.map((block, index) => (
              <Text style={styles.textStyle} key={index}>
                {block.text}
              </Text>
            ))}
          </View>
        ) : isLoading ? (
          <Text style={styles.titleResult}>Please Wait...</Text>
        ) : (
          <Text style={styles.titleResult}>Sorry!🙁 No text found</Text>
        )}
      </ScrollView>

      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAnalyzeOutput}>
          <Text style={styles.buttonText}>Analyze Output</Text>
        </TouchableOpacity>
      </View>

      {fuelData && (
        <View style={styles.fuelDataContainer}>
          <Text style={styles.titleResult}>Fuel Data:</Text>
          <Text>Fuel Type: {fuelData.fuelType || 'N/A'}</Text>
          <Text>Amount Purchased: {fuelData.amountPurchased ? `${fuelData.amountPurchased} gallons` : 'N/A'}</Text>
          <Text>Price Per Gallon: {fuelData.pricePerGallon ? `$${fuelData.pricePerGallon}` : 'N/A'}</Text>
          <Text>Total Cost: {fuelData.totalCost ? `$${fuelData.totalCost}` : 'N/A'}</Text>
        </View>
      )}
    </View>
  );
};
export default ImageDetailsScreen;