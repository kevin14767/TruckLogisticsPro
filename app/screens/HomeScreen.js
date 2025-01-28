import React from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, horizontalScale, verticalScale, moderateScale } from '../themes';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
 return (
   <View style={styles.container}>
     <ScrollView contentContainerStyle={styles.scrollContainer}>
       <View style={styles.header}>
         <Text style={styles.welcomeText}>Welcome to Truck Logistics Pro!</Text>
         <Text style={styles.subText}>Your one-stop app for managing truck logistics.</Text>
       </View>

       <Card style={styles.card}>
         <Card.Title 
           title="Recent Activity" 
           titleStyle={styles.cardTitle}
           left={() => <Icon name="history" size={24} color={Colors.greenThemeColor} />}
         />
         <Card.Content>
           <ActivityItem icon="receipt" text="Last Receipt: Delivered 2 hours ago" />
           <ActivityItem icon="wrench" text="Maintenance Check: 3 days left" />
           <ActivityItem icon="oil" text="Next Oil Change: 200 miles remaining" />
         </Card.Content>
       </Card>

       <Card style={styles.card}>
         <Card.Title 
           title="Quick Access" 
           titleStyle={styles.cardTitle}
           left={() => <Icon name="star" size={24} color={Colors.greenThemeColor} />}
         />
         <Card.Content style={styles.buttonGrid}>
           <QuickAccessButton
             icon="file-document"
             title="View All Receipts"
             onPress={() => navigation.navigate("Reports")}
           />
           <QuickAccessButton 
             icon="truck"
             title="Manage Fleet"
             onPress={() => navigation.navigate("Stats")}
           />
         </Card.Content>
       </Card>

       <Card style={styles.card}>
         <Card.Title 
           title="Statistics" 
           titleStyle={styles.cardTitle}
           left={() => <Icon name="chart-bar" size={24} color={Colors.greenThemeColor} />}
         />
         <Card.Content style={styles.statsGrid}>
           <StatItem icon="truck" value="15" label="Active Trucks" />
           <StatItem icon="cash" value="$50,000" label="Income" />
           <StatItem icon="clock" value="4.5h" label="Avg Delivery" />
         </Card.Content>
       </Card>
     </ScrollView>
   </View>
 );
};

const ActivityItem = ({ icon, text }) => (
 <View style={styles.activityItem}>
   <Icon name={icon} size={20} color={Colors.greenThemeColor} />
   <Text style={styles.activityText}>{text}</Text>
 </View>
);

const QuickAccessButton = ({ icon, title, onPress }) => (
 <TouchableOpacity style={styles.quickButton} onPress={onPress}>
   <Icon name={icon} size={30} color={Colors.greenThemeColor} />
   <Text style={styles.quickButtonText}>{title}</Text>
 </TouchableOpacity>
);

const StatItem = ({ icon, value, label }) => (
 <View style={styles.statItem}>
   <Icon name={icon} size={24} color={Colors.greenThemeColor} />
   <Text style={styles.statValue}>{value}</Text>
   <Text style={styles.statLabel}>{label}</Text>
 </View>
);

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: Colors.black_grey,
 },
 scrollContainer: {
   padding: horizontalScale(16),
 },
 header: {
   marginVertical: verticalScale(38),
   alignItems: 'center',
 },
 welcomeText: {
   fontSize: moderateScale(22),
   fontWeight: 'bold',
   color: Colors.white,
   marginBottom: verticalScale(8),
 },
 subText: {
   fontSize: moderateScale(16),
   color: Colors.grey,
 },
 card: {
  backgroundColor: Colors.darkGrey, // Or use Colors.darkGrey if you prefer
  marginBottom: verticalScale(16),
  elevation: 4,
},
quickButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2c2c2e', // Slightly darker than card background
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
},
 cardTitle: {
   color: Colors.white,
 },
 activityItem: {
   flexDirection: 'row',
   alignItems: 'center',
   marginBottom: verticalScale(12),
   gap: horizontalScale(8),
 },
 activityText: {
   fontSize: moderateScale(14),
   color: Colors.grey,
 },
 buttonGrid: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   gap: horizontalScale(12),
 },
 quickButton: {
   flex: 1,
   alignItems: 'center',
   backgroundColor: Colors.darkGrey,
   padding: moderateScale(16),
   borderRadius: moderateScale(12),
 },
 quickButtonText: {
   color: Colors.white,
   marginTop: verticalScale(8),
 },
 statsGrid: {
   flexDirection: 'row',
   justifyContent: 'space-between',
 },
 statItem: {
   alignItems: 'center',
 },
 statValue: {
   fontSize: moderateScale(18),
   fontWeight: 'bold',
   color: Colors.white,
   marginTop: verticalScale(8),
 },
 statLabel: {
   fontSize: moderateScale(12),
   color: Colors.grey,
   marginTop: verticalScale(4),
 },
});

export default HomeScreen;