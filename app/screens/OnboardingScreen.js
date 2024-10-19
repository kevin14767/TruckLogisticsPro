import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import Onboarding from "react-native-onboarding-swiper";


const Dots = ({selected}) =>{
    let backgroundColor;
    backgroundColor = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)';
    return(
        <View
            style={{
                width:6,
                height:6,
                marginHorizontal:3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>

    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
    style={{marginHorizontal:10}}
    {...props}
>
    <Text style={{fontSize:16}}>Next</Text>

</TouchableOpacity>

);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);


const OnboardingScreen = ({navigation}) =>{
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
                backgroundColor: '#004d40',
                image: <Image source={require('../assets/icons/data.png')} />,
                title: 'Onboarding',
                subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
                backgroundColor: '#1c1c1e',
                image: <Image source={require('../assets/icons/report.png')} />,
                title: 'Onboarding',
                subtitle: 'Done with React Native Onboarding Swiper',
            },
        ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});