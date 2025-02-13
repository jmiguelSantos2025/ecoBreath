import { View, StyleSheet, Text, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');


export default function FirstScreenToUseScreen() {
    
    return (
        <View style={style.containerFull}>
            <ImageBackground source={require('../../../assets/TopWaveComponent.png')} style={style.background}>
                <View style={style.container}>

                    <View>
                        <Image source={require('../../../assets/LogoAzul.png')} style={style.imageIcon} />
                    </View>
                    <View style={style.viewTitle}>
                        <Text style={style.title}>Bem vindo!</Text>
                        <Text style={style.secondText}>Se prepare para explorar o ar mais puro</Text>
                    </View>

                </View>
            </ImageBackground>

            <View style={style.viewTextBottom} >
                <TouchableOpacity style={{flex:1, }} >
                <Text style={style.textBottom} >Vamos lá!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const style = StyleSheet.create({
    containerFull: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#13D8B0",



    },
    background: {
        width: "100%",
        height: "85%",
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: "center",



    },
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    viewTitle: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,

    },
    title: {
        color: "#08C4C2",
        fontWeight: "bold",
        fontSize: height * 0.025

    },
    secondText: {
        color: "#0AA8E3",
        fontWeight: "bold",
        fontSize: height * 0.016

    },
    textBottom: {
        color: "white",
        fontWeight: "bold",
        fontSize: height * 0.025,
        marginBottom: height * 0.15,

    },
    viewTextBottom: {
        width: "100%",
        height: "25%",
        justifyContent: "center",
        alignItems: "center",




    },
    imageIcon: {
        width: width * 0.3,
        height: width * 0.3,
        resizeMode: "contain",
    }


});