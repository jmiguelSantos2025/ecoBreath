import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get("window");

export default function GraphicsScreenAirQuality() {
    return (
        <View style={style.container}>
            <View style={style.firstPierce}>
                <Image source={require("../../../assets/LogoAzul.png")} style={{ marginBottom: 10 }} />
            </View>

            <View style={style.secondPierce}>
                <ImageBackground source={require('../../../assets/blueWave.png')}
                    style={style.imageBackground}
                >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                        
                        {/* Gráfico Central com Número no Meio (do lado esquerdo) */}
                        <View style={style.centerGraph}>
                            <Svg width={width * 0.45} height={width * 0.45} viewBox="0 0 100 100">
                                <Circle cx="50" cy="50" r="40" stroke="#07C3C3" strokeWidth="10" fill="none" />
                                <Circle cx="50" cy="50" r="40" stroke="#13C1CA" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="125.6" fill="none" />
                                <Text style={style.centerText}>85</Text> {/* Número centralizado */}
                            </Svg>
                        </View>

                        {/* Dois Gráficos Menores do Lado Direito */}
                        <View style={style.rightGraphs}>
                            <View style={style.graphContainer}>
                                <Svg width={width * 0.3} height={width * 0.3} viewBox="0 0 100 100">
                                    <Circle cx="50" cy="50" r="40" stroke="#07C3C3" strokeWidth="10" fill="none" />
                                    <Circle cx="50" cy="50" r="40" stroke="#13C1CA" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="80" fill="none" />
                                    <Text style={style.graphText}>70</Text> {/* Número centralizado */}
                                </Svg>
                                <Text style={style.graphLabel}>Qualidade do ar</Text>
                            </View>

                            <View style={style.graphContainer}>
                                <Svg width={width * 0.3} height={width * 0.3} viewBox="0 0 100 100">
                                    <Circle cx="50" cy="50" r="40" stroke="#07C3C3" strokeWidth="10" fill="none" />
                                    <Circle cx="50" cy="50" r="40" stroke="#13C1CA" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="120" fill="none" />
                                    <Text style={style.graphText}>25</Text> {/* Número centralizado */}
                                </Svg>
                                <Text style={style.graphLabel}>Temperatura</Text>
                            </View>
                        </View>
                    </View>

                    {/* Gráfico de Níveis de Qualidade do Ar pelo Tempo (formato quadrado) */}
                    <View style={style.timeGraph}>
                        <Svg width={width * 0.9} height={width * 0.5} viewBox="0 0 100 100">
                            <Rect width="100" height="100" fill="white" />
                            <Path
                                fill="none"
                                stroke="#07C3C3"
                                strokeWidth="2"
                                d="M10,90 C30,70, 50,40, 70,50 C90,60, 110,20, 130,30"
                            />
                        </Svg>
                        <Text style={style.timeGraphText}>Níveis de Qualidade do Ar ao Longo do Tempo</Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: "white",
        overflow: "hidden",
    },
    firstPierce: {
        width: width,
        height: "23%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: height * 0.03,
    },
    secondPierce: {
        width: "100%",
        height: "100%",
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    centerGraph: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "45%",
    },
    centerText: {
        position: "absolute",
        top: "40%",
        left: "40%",
        fontSize: 30,
        color: "#13C1CA",
        fontWeight: "bold",
    },
    rightGraphs: {
        justifyContent: "center",
        alignItems: "center",
        width: "45%",
    },
    graphContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    graphText: {
        position: "absolute",
        top: "40%",
        left: "40%",
        fontSize: 18,
        color: "#13C1CA",
        fontWeight: "bold",
    },
    graphLabel: {
        marginTop: 10,
        fontSize: 16,
        color: "#07C3C3",
        fontWeight: "bold",
    },
    timeGraph: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    timeGraphText: {
        fontSize: 16,
        color: "#07C3C3",
        fontWeight: "bold",
        marginTop: 10,
    },
});
