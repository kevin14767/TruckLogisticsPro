import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PostStackParamList } from '../navigation/PostStackParamList';
import { BaseReceipt } from '../imagedetails/ReceiptInterfaces';

type ReportScreenRouteProp = RouteProp<PostStackParamList, 'ReportScreen'>;

const ReportScreen = ({ route }: { route: ReportScreenRouteProp }) => {
  const navigation = useNavigation<NavigationProp<PostStackParamList>>();
  const { receipt } = route.params;

  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate HTML content dynamically
  const generateHtmlContent = () => {
    const rows = Object.entries(receipt).map(
      ([key, value]) =>
        `<tr><td style="border: 1px solid #ddd; padding: 8px;">${key.replace(/([A-Z])/g, ' $1')}</td><td style="border: 1px solid #ddd; padding: 8px;">${value}</td></tr>`
    );

    return `
      <html>
        <head>
          <style>
            table {
              font-family: Arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #007BFF;
              color: white;
            }
            body {
              font-family: Arial, sans-serif;
              padding: 16px;
            }
          </style>
        </head>
        <body>
          <h1 style="text-align: center; color: #007BFF;">Receipt Report</h1>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${rows.join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

  // Create PDF from HTML content
  const createPdf = async () => {
    try {
      const pdfContent = generateHtmlContent();
      let options = {
        html: pdfContent,
        fileName: 'receipt_report',
        directory: 'Documents',
      };
      let pdf = await RNHTMLtoPDF.convert(options);
      if (pdf.filePath) {
        setPdfPath(pdf.filePath);
        setIsLoading(false);
      } else {
        throw new Error('Failed to generate PDF file');
      }
    } catch (error) {
      console.error('Error creating PDF:', error);
      Alert.alert('Error', 'Failed to generate the PDF file.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    createPdf();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back to Verification</Text>
      </TouchableOpacity>
      
      <Text style={styles.header}>Receipt Report</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : pdfPath ? (
        <Pdf
          source={{ uri: `file://${pdfPath}` }}
          style={styles.pdf}
          onLoadComplete={(numberOfPages) => console.log(`PDF loaded: ${numberOfPages} pages`)}
          onError={(error) => console.error('Failed to load PDF:', error)}
        />
      ) : (
        <Text style={styles.errorText}>Unable to generate the report</Text>
      )}
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    padding: 16,
    paddingTop: 48,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  pdf: {
    flex: 0.75,
    marginVertical: 16,
    width: Dimensions.get('window').width - 32,
    alignSelf: 'center',
  },
  errorText: {
    color: '#ff6347',
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
