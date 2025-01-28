import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors, horizontalScale, verticalScale, moderateScale } from '../themes';

const StatsScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const statsData = [
    {
      title: "Total Trips",
      value: "328",
      change: "+12%",
      icon: "truck",
      isPositive: true
    },
    {
      title: "Active Vehicles",
      value: "45",
      change: "-3",
      icon: "activity",
      isPositive: false
    },
    {
      title: "Avg Distance",
      value: "142 km",
      change: "+5%",
      icon: "map",
      isPositive: true
    },
    {
      title: "Fuel Usage",
      value: "2,450 L",
      change: "-8%",
      icon: "droplet",
      isPositive: true
    }
  ];

  const performanceData = [
    {
      label: "Vehicle Maintenance",
      value: "92%",
      color: "#4CAF50"
    },
    {
      label: "Route Efficiency",
      value: "87%",
      color: "#2196F3"
    },
    {
      label: "On-Time Delivery",
      value: "95%",
      color: "#FFC107"
    }
  ];

  const renderStatCard = ({ title, value, change, icon, isPositive }) => (
    <View style={styles.statCard}>
      <View style={styles.statIconContainer}>
        <FeatherIcon name={icon} size={moderateScale(20)} color={Colors.white} />
      </View>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <View style={styles.statChangeContainer}>
        <FeatherIcon 
          name={isPositive ? "arrow-up" : "arrow-down"} 
          size={moderateScale(14)} 
          color={isPositive ? '#4CAF50' : '#F44336'} 
        />
        <Text style={[
          styles.statChange,
          {color: isPositive ? '#4CAF50' : '#F44336'}
        ]}>{change}</Text>
      </View>
    </View>
  );

  const renderPerformanceBar = ({ label, value, color }) => (
    <View style={styles.performanceItem}>
      <View style={styles.performanceHeader}>
        <Text style={styles.performanceLabel}>{label}</Text>
        <Text style={styles.performanceValue}>{value}</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[
          styles.progressBarFill,
          {
            width: value,
            backgroundColor: color
          }
        ]} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
        <Text style={styles.headerSubtitle}>Fleet Performance Overview</Text>
      </View>

      <View style={styles.periodSelector}>
        <TouchableOpacity 
          style={[styles.periodTab, selectedPeriod === 'week' && styles.periodTabActive]}
          onPress={() => setSelectedPeriod('week')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'week' && styles.periodTextActive]}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.periodTab, selectedPeriod === 'month' && styles.periodTabActive]}
          onPress={() => setSelectedPeriod('month')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'month' && styles.periodTextActive]}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.periodTab, selectedPeriod === 'year' && styles.periodTabActive]}
          onPress={() => setSelectedPeriod('year')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'year' && styles.periodTextActive]}>Year</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => navigation.navigate('StatDetail', { type: stat.title })}
            >
              {renderStatCard(stat)}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.performanceContainer}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          {performanceData.map((item, index) => (
            <View key={index} style={styles.performanceWrapper}>
              {renderPerformanceBar(item)}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_grey,
  },
  header: {
    padding: moderateScale(24),
  },
  headerTitle: {
    fontSize: moderateScale(34),
    fontWeight: '700',
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: moderateScale(16),
    color: Colors.grey,
    marginTop: verticalScale(8),
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(24),
    marginBottom: verticalScale(24),
  },
  periodTab: {
    flex: 1,
    paddingVertical: verticalScale(8),
    alignItems: 'center',
    borderRadius: moderateScale(8),
    marginHorizontal: horizontalScale(4),
    backgroundColor: Colors.darkGrey,
  },
  periodTabActive: {
    backgroundColor: Colors.greenThemeColor,
  },
  periodText: {
    color: Colors.grey,
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  periodTextActive: {
    color: Colors.white,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: moderateScale(16),
  },
  statCard: {
    width: '%',
    backgroundColor: Colors.darkGrey,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    margin: '2%',
  },
  statIconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.greenThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  statTitle: {
    color: Colors.grey,
    fontSize: moderateScale(14),
  },
  statValue: {
    color: Colors.white,
    fontSize: moderateScale(20),
    fontWeight: '700',
    marginVertical: verticalScale(8),
  },
  statChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statChange: {
    marginLeft: horizontalScale(4),
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
  performanceContainer: {
    padding: moderateScale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: Colors.white,
    marginBottom: verticalScale(16),
  },
  performanceWrapper: {
    marginBottom: verticalScale(16),
  },
  performanceItem: {
    marginBottom: verticalScale(12),
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },
  performanceLabel: {
    color: Colors.white,
    fontSize: moderateScale(14),
  },
  performanceValue: {
    color: Colors.grey,
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  progressBarBackground: {
    height: verticalScale(8),
    backgroundColor: Colors.darkGrey,
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(20),
  },
  progressBarFill: {
    height: '100%',
    borderRadius: moderateScale(4),
  },
});

export default StatsScreen;