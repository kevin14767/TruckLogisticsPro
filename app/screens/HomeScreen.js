import React from "react";
import { ScrollView, View, Text, Button, StyleSheet, Dimensions, TextInput, Platform } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

//i need to redo home screen lmao all hardcoded


// Determine if the device has a notch (based on platform and screen height)
const { height: windowHeight } = Dimensions.get('window');
const hasNotch = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV && windowHeight > 800;

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      {/* <View style={[styles.searchBarContainer, { paddingTop: hasNotch ? insets.top : 20 }]}>
        <Ionicons name="search" size={20} color="#6c6c6e" style={styles.searchIcon} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#6c6c6e"
          style={styles.searchInput}
        />
      </View> */}

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>Welcome to Truck Logistics Pro!</Text>
        <Text style={styles.subText}>Your one-stop app for managing truck logistics.</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.itemText}>📄 Last Receipt: Delivered 2 hours ago</Text>
          <Text style={styles.itemText}>🛠 Maintenance Check: 3 days left</Text>
          <Text style={styles.itemText}>🔧 Next Oil Change: 200 miles remaining</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <Button
            title="View All Receipts"
            onPress={() => navigation.navigate("Reports")}
            color="#004d40"
          />
          <Button
            title="Manage Fleet"
            onPress={() => navigation.navigate("Stats")}
            color="#004d40"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <Text style={styles.itemText}>🚛 Active Trucks: 15</Text>
          <Text style={styles.itemText}>💰 Total Income: $50,000</Text>
          <Text style={styles.itemText}>🕒 Average Delivery Time: 4.5 hours</Text>
        </View>

        {/* Add some space at the bottom to account for the tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderBottomColor: '#29292b',
    borderBottomWidth: 1,
    padding: 10,
    zIndex: 10,
    position: 'relative', // Ensures search bar is within the normal flow
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#29292b',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 12,
    paddingTop: 50, // Padding to ensure content starts below the search bar
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    
  },
  subText: {
    fontSize: 16,
    color: '#b0b0b0',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#29292b',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#b0b0b0',
    marginBottom: 5,
  },
  bottomSpacer: {
    height: 80, // Adjust this value if necessary to ensure content isn't hidden
  },
});