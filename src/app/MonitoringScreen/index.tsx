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

export default function MonitoringScreen() {
    const DioxidoDecarbono = (valor: number) => {
        if (valor !== 0) {
            return (valor*100 / 1000000).toFixed(1) + "%";
        } else {
            return "0.0%";
        }
    };

    const GasesVolateis = (valor1: number,valor2:number,valor3:number) => {
        if (valor1 !== 0 ||valor2 !==0 ||valor3 !==0) {
            return (
                (valor1+valor2+valor3)*100/1000000).toFixed(1) + "%";
        } else {
            return "0.0%";
        }
    };

    const AirQuality = (valor: number) => {
        switch (true) {
            case valor > 5000:
                return "Péssima";
            case valor <= 5000 && valor >= 2000:
                return "Ruim";
            case valor <= 2000 && valor >= 1000:
                return "Moderada";
            case valor <= 1000 && valor >= 400:
                return "Boa";
            case valor < 400:
                return "Excelente";
            default:
                return "Desconhecido";
        }
    };
    const AirQualityColor = (valor: number) => {
      switch (true) {
          case valor > 5000:
              return "#FF0000";
          case valor <= 5000 && valor >= 2000:
              return "#FF8C00";
          case valor <= 2000 && valor >= 1000:
              return "#FFD700";
          case valor <= 1000 && valor >= 400:
              return "#008000";
          case valor < 400:
              return "#0000FF";
          default:
              return "#0000";
      }
  };
const Temperatura = (valor:number) =>{
  switch(true){
    case valor < 0:
      return "#00BFFF";
    case valor>=0 && valor<10:
      return "#1E90FF";
    case valor>=10 && valor<20:
      return "#32CD32";
    case valor>=20 && valor<30:
      return "#FFA500";
    case valor >= 30:
      return "#FF4500";


  }
}

    const [valorSensores1, setValorSensores1] = useState<number>(0);
    const [valorSensores2, setValorSensores2] = useState<number>(0);
    const [valorSensores3, setValorSensores3] = useState<number>(0);
    const [valorSensores4, setValorSensores4] = useState<number>(0);
    const [valorSensores5, setValorSensores5] = useState<number>(0);
    const [valorSensores6, setValorSensores6] = useState<number>(0);

    useEffect(() => {
        const dbRef = ref(database, 'Sensores');
        const unsubscribe = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setValorSensores1(data.BME280T);
                setValorSensores2(data.BME280U);
                setValorSensores3(data.MQ135OUT);
                setValorSensores4(data.MQ2);
                setValorSensores5(data.MQ7);
                setValorSensores6(data.MQ8);
            } else {
                console.log("Sem dados disponiveis");
            }
        });
        return () => unsubscribe();
    }, []);

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
                        <View style={styles.mainViewButton}>
                            {/* Card 1,2 */}
                            <View style={styles.viewButton}>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={()=>router.push("GraphicsScreen")}>
                                    <MaterialCommunityIcons
                                        name="weather-windy-variant"
                                        size={width * 0.14}
                                        color="#07C3C3"
                                        style={{ marginBottom: height * 0.02 }}
                                    />
                                    <Text style={[styles.dataText, {color:AirQualityColor(valorSensores3)}]}>{AirQuality(valorSensores3)}</Text>
                                    <Text style={styles.buttonText}>Qualidade do ar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                                    <Svg
                                        height={height * 0.07}
                                        viewBox="0 -960 960 960"
                                        width={width * 0.14}
                                        fill="#07C3C3"
                                        style={{ marginBottom: height * 0.01 }}
                                    >
                                        <Path d="M620-520q-25 0-42.5-17.5T560-580q0-17 9.5-34.5t20.5-32q11-14.5 20.5-24l9.5-9.5 9.5 9.5q9.5 9.5 20.5 24t20.5 32Q680-597 680-580q0 25-17.5 42.5T620-520Zm160-120q-25 0-42.5-17.5T720-700q0-17 9.5-34.5t20.5-32q11-14.5 20.5-24l9.5-9.5 9.5 9.5q9.5 9.5 20.5 24t20.5 32Q840-717 840-700q0 25-17.5 42.5T780-640Zm0 240q-25 0-42.5-17.5T720-460q0-17 9.5-34.5t20.5-32q11-14.5 20.5-24l9.5-9.5 9.5 9.5q9.5 9.5 20.5 24t20.5 32Q840-477 840-460q0 25-17.5 42.5T780-400ZM360-120q-83 0-141.5-58.5T160-320q0-48 21-89.5t59-70.5v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q38 29 59 70.5t21 89.5q0 83-58.5 141.5T360-120ZM240-320h240q0-29-12.5-54T432-416l-32-24v-280q0-17-11.5-28.5T360-760q-17 0-28.5 11.5T320-720v280l-32 24q-23 17-35.5 42T240-320Z" />
                                    </Svg>
                                    <Text style={[styles.dataText,{color:Temperatura(valorSensores1

                                    )}]}>
                                        {valorSensores1.toFixed(0) + "ºC"}
                                    </Text>
                                    <Text style={styles.buttonText}>Temperatura</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Card 3,4 */}
                            <View style={styles.viewButton}>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                                    <Svg
                                        height={height * 0.07}
                                        viewBox="0 -960 960 960"
                                        width={width * 0.18}
                                        fill="#07C3C3"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Path d="M440-360q-17 0-28.5-11.5T400-400v-160q0-17 11.5-28.5T440-600h120q17 0 28.5 11.5T600-560v160q0 17-11.5 28.5T560-360H440Zm20-60h80v-120h-80v120Zm-300 60q-17 0-28.5-11.5T120-400v-160q0-17 11.5-28.5T160-600h120q17 0 28.5 11.5T320-560v40h-60v-20h-80v120h80v-20h60v40q0 17-11.5 28.5T280-360H160Zm520 120v-100q0-17 11.5-28.5T720-380h80v-40H680v-60h140q17 0 28.5 11.5T860-440v60q0 17-11.5 28.5T820-340h-80v40h120v60H680Z" />
                                    </Svg>
                                    <Text style={styles.dataText}>{DioxidoDecarbono(valorSensores3)}</Text>
                                    <Text style={styles.buttonText}>Níveis de CO2 (%)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                                    <Svg
                                        height={height * 0.07}
                                        viewBox="0 -960 960 960"
                                        width={width * 0.14}
                                        fill="#07C3C3"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                                    </Svg>
                                    <Text style={styles.dataText}>{GasesVolateis(valorSensores4,valorSensores5,valorSensores6)}</Text>
                                    <Text style={styles.buttonText}>Níveis de Compostos Voláteis (%)</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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