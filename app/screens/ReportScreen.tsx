import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator, 
  Dimensions 
} from 'react-native';
import Pdf from 'react-native-pdf';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PostStackParamList } from '../navigation/PostStackParamList';
import FeatherIcon from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

type ReportScreenRouteProp = RouteProp<PostStackParamList, 'ReportScreen'>;

const ReportScreen = ({ route }: { route: ReportScreenRouteProp }) => {
  const [reports, setReports] = useState<any[]>([]);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<NavigationProp<PostStackParamList>>();
  const { receipt } = route.params;

  // Generate HTML content dynamically
  const generateHtmlContent = () => {
    if (!receipt || Object.keys(receipt).length === 0) {
      return `<html><body><h1>No Data Available</h1></body></html>`;
    }

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

  const uploadReport = async (pdfPath: string, receipt: any) => {
    try {
      // 1. Upload PDF to Storage
      const fileName = `reports/${Date.now()}_receipt_report.pdf`;
      const reference = storage().ref(fileName);
      await reference.putFile(pdfPath);
      const downloadUrl = await reference.getDownloadURL();

      // 2. Store metadata in Firestore
      const reportMetadata = {
        fileName: fileName,
        downloadUrl: downloadUrl,
        createdAt: firestore.Timestamp.now(),
        receiptData: receipt,
        status: 'completed'
      };

      // Add to 'reports' collection in Firestore
      await firestore()
        .collection('reports')
        .add(reportMetadata);

      return { downloadUrl, metadata: reportMetadata };
    } catch (error) {
      console.error('Error uploading report:', error);
      throw error;
    }
  };

  const fetchReports = async () => {
    try {
      const reportsSnapshot = await firestore()
        .collection('reports')
        .orderBy('createdAt', 'desc')
        .get();

      return reportsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  };

  const loadReports = async () => {
    try {
      const fetchedReports = await fetchReports();
      setReports(fetchedReports);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch reports');
    }
  };

  const createPdf = async () => {
    try {
      const pdfContent = generateHtmlContent();
      const options = {
        html: pdfContent,
        fileName: 'receipt_report',
        directory: 'Documents',
      };

      const pdf = await RNHTMLtoPDF.convert(options);
      if (pdf.filePath) {
        setPdfPath(pdf.filePath);
        const result = await uploadReport(pdf.filePath, receipt);
        Alert.alert('Success', 'Report uploaded successfully!');
        loadReports(); // Refresh the reports list
        return result;
      }
      throw new Error('Failed to generate PDF file');
    } catch (error) {
      console.error('Error creating PDF:', error);
      Alert.alert('Error', 'Failed to generate or upload the PDF file.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    createPdf();
    loadReports();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FeatherIcon name="corner-up-left" size={25} color="#fff" />
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
    marginTop: 20,
    marginLeft: 10,
  },
});