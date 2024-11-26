import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

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
    <Text style={styles.buttonText}>Done</Text>
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
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  selectedDot: {
    backgroundColor: "#ffffff",
  },
  unselectedDot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
});
