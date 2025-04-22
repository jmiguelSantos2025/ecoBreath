import { View, Image, StyleSheet, Dimensions, Text, ImageBackground, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Path } from 'react-native-svg';
import { useEffect } from 'react';
import { get, onValue, ref } from 'firebase/database';
import { database } from '../../../firebaseConfig';
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';

const { width, height } = Dimensions.get("window");

export default function GraphicsScreen() {
    
    return (
        <ImageBackground
            source={require("../../../assets/TelaTipo2New.png")}
            style={styles.imageBackground}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <IconButton
                    icon="arrow-left"
                    size={30}
                    onPress={() => router.back()}
                    iconColor="white"
                    style={{ position: "absolute", top: 20, left: 20, zIndex: 10, backgroundColor: "#428F77" }}
                />
                <View style={styles.firstPierce}>
                    <Image
                        source={require("../../../assets/LogoAzul.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.secondPierce}>
                    <View style={styles.contentContainer}>
                        
                </View>
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    firstPierce: {
        width: "100%",
        height: "23%",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: width * 0.3,
        height: height * 0.2,
        resizeMode: "contain",
    },
    secondPierce: {
        width: "100%",
        height: "85%",
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: height * 0.05
    },
    mainViewButton: {
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    viewButton: {
        flexDirection: "row",
        width: "100%",
        marginBottom: height * 0.02,
    },
    button: {
        width: "50%",
        aspectRatio: 1,
        borderRadius: 12,
        borderColor: "#07C3C3",
        borderWidth: 2,
        elevation: 5,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    dataText: {
        fontSize: width * 0.04,
        color: "#07C3C3",
        marginTop: height * 0.01,
        textAlign: "center",
        fontWeight: "bold"
    },
    buttonText: {
        fontSize: width * 0.035,
        color: "#07C3C3",
        marginTop: height * 0.01,
        textAlign: "center",
        fontWeight: "bold",
    },
});