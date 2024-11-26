import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { processExtractedText } from "../services/openaiService";

type TextProcessingRouteParams = {
  extractedText: string;
};

const TextProcessingScreen = () => {
  const route = useRoute<RouteProp<{ params: TextProcessingRouteParams }, "params">>();
  const { extractedText } = route.params;

  const [processedText, setProcessedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleProcessText = async () => {
    setLoading(true);
    try {
      const result = await processExtractedText(extractedText);
      setProcessedText(result);
    } catch (error) {
      console.error("Error processing text:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Extracted Text:</Text>
      <Text style={styles.extractedText}>{extractedText}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : processedText ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Processed Result:</Text>
          <Text style={styles.resultText}>{processedText}</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleProcessText}>
          <Text style={styles.buttonText}>Process Text</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  extractedText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: "#f1f1f1",
    padding: 16,
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TextProcessingScreen;
