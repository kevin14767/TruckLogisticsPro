import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { horizontalScale, verticalScale, moderateScale } from "../themes/Metrics";


// Using device dimensions helps create a more responsive layout
const { width, height } = Dimensions.get('window');

// The Dots component has been enhanced with smoother transitions and better spacing
const Dots = ({ selected }) => {
  return (
    <View
      style={[
        styles.dot,
        selected ? styles.selectedDot : styles.unselectedDot,
      ]}
    />
  );
};

// Navigation buttons now have improved touch targets and spacing
const Skip = ({ ...props }) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.buttonText}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.buttonText}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.buttonText}>Get Started</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      // Pages have been enhanced with better spacing and typography
      pages={[
        {
          backgroundColor: "#004d40",
          image: (
            <Image
              source={require("../assets/icons/trucking_logistics.png")}
              style={styles.image}
            />
          ),
          title: "Welcome to Trucking Logistics Pro",
          subtitle:
            "Simplify your logistics with advanced tools for seamless trucking operations.",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: "#1c1c1e",
          image: (
            <Image
              source={require("../assets/icons/pngwing.com(1).png")}
              style={styles.image}
            />
          ),
          title: "Generate Insightful Reports",
          subtitle:
            "Track and analyze your performance with professional-grade reporting tools.",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: "#00796b",
          image: (
            <Image
              source={require("../assets/icons/pngwing.com(2).png")}
              style={styles.image}
            />
          ),
          title: "Stay on Track",
          subtitle:
            "Real-time navigation and scheduling for efficient deliveries.",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(16),
    borderRadius: moderateScale(8),
  },
  buttonText: {
    fontSize: moderateScale(16),
    color: "#ffffff",
    fontWeight: "600",
    letterSpacing: moderateScale(0.1),
  },
  dot: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    marginHorizontal: horizontalScale(5),
    marginBottom: verticalScale(16),
  },
  selectedDot: {
    backgroundColor: "#ffffff",
    transform: [{scale: 1.2}],
  },
  unselectedDot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  image: {
    width: horizontalScale(350),
    height: verticalScale(350),
    resizeMode: "contain",
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: verticalScale(16),
    paddingHorizontal: horizontalScale(20),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: moderateScale(24),
    paddingHorizontal: horizontalScale(40),
    marginBottom: verticalScale(24),
  },
});