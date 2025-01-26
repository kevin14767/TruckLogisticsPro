import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors, horizontalScale, verticalScale, moderateScale } from '../themes';

const Reports = ({ navigation }) => {
  // Sample data - this would come from your Firebase/backend
  const [receipts] = useState([
    {
      id: '1',
      date: '2025-01-20',
      type: 'Fuel',
      amount: '$124.50',
      vehicle: 'Truck 101',
      status: 'Approved'
    },
    {
      id: '2',
      date: '2025-01-19',
      type: 'Maintenance',
      amount: '$350.00',
      vehicle: 'Van 203',
      status: 'Pending'
    },
    {
      id: '3',
      date: '2025-01-18',
      type: 'Fuel',
      amount: '$98.75',
      vehicle: 'Truck 102',
      status: 'Approved'
    },
  ]);

  const renderReceiptCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.receiptCard}
      onPress={() => navigation.navigate('ReceiptDetail', { receipt: item })}
    >
      <View style={styles.receiptHeader}>
        <View style={styles.receiptType}>
          <FeatherIcon 
            name={item.type === 'Fuel' ? 'droplet' : 'tool'} 
            size={moderateScale(20)} 
            color={Colors.white} 
          />
          <Text style={styles.receiptTypeText}>{item.type}</Text>
        </View>
        <Text style={[
          styles.receiptStatus,
          { color: item.status === 'Approved' ? '#4CAF50' : '#FFC107' }
        ]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.receiptDetails}>
        <Text style={styles.receiptAmount}>{item.amount}</Text>
        <Text style={styles.receiptVehicle}>{item.vehicle}</Text>
      </View>

      <View style={styles.receiptFooter}>
        <Text style={styles.receiptDate}>{item.date}</Text>
        <FeatherIcon name="chevron-right" size={moderateScale(20)} color={Colors.grey} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Receipts</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('UploadReceipt')}
        >
          <FeatherIcon name="plus" size={moderateScale(24)} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchButton}>
          <FeatherIcon name="search" size={moderateScale(20)} color={Colors.grey} />
          <Text style={styles.searchText}>Search receipts...</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={receipts}
        renderItem={renderReceiptCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.receiptsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_grey,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(24),
  },
  headerTitle: {
    fontSize: moderateScale(34),
    fontWeight: '700',
    color: Colors.white,
  },
  addButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: Colors.redThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: horizontalScale(24),
    marginBottom: verticalScale(16),
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkGrey,
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
  },
  searchText: {
    color: Colors.grey,
    marginLeft: horizontalScale(8),
    fontSize: moderateScale(16),
  },
  receiptsList: {
    padding: moderateScale(24),
  },
  receiptCard: {
    backgroundColor: Colors.darkGrey,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: verticalScale(16),
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  receiptType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiptTypeText: {
    color: Colors.white,
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginLeft: horizontalScale(8),
  },
  receiptStatus: {
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  receiptDetails: {
    marginBottom: verticalScale(12),
  },
  receiptAmount: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: Colors.white,
    marginBottom: verticalScale(4),
  },
  receiptVehicle: {
    fontSize: moderateScale(14),
    color: Colors.grey,
  },
  receiptFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptDate: {
    fontSize: moderateScale(14),
    color: Colors.grey,
  },
});

export default Reports;