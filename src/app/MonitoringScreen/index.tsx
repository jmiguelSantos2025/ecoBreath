import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Path } from 'react-native-svg';
const { width, height } = Dimensions.get("window");

export default function MonitoringScreen() {
    return (
        <View style={style.container}>
            <View style={style.firstPierce}>
                <Image source={require("../../../assets/LogoAzul.png")} style={{ marginBottom: 10, }} />
            </View>

            <View style={style.secondPierce}>
                <ImageBackground source={require('../../../assets/blueWave.png')}
                    style={style.imageBackground}
                >
                    <View style={{ overflow: "hidden", flex: 1, margin: 20 }}>
                        <View style={style.textView}>
                            

                            <View style={style.mainViewButton}>
                                {/* Card 1 */}
                                <View style={style.viewButton}>
                                    <TouchableOpacity style={style.button} activeOpacity={0.7}>
                                        <MaterialCommunityIcons
                                            name="weather-windy-variant"
                                            size={width * 0.14}
                                            color="#07C3C3"
                                            style={{ marginBottom: 20, }}

                                        />
                                        <Text>Dado</Text>
                                        <Text style={style.buttonText}>Qualidade do ar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.button} activeOpacity={0.7}>

                                        
                                        <Svg style={{ marginBottom: 20 }} height={height * 0.07} viewBox="0 -960 960 960" width={width * 0.2} fill="#07C3C3">
                                            <Path d="M620-520q-25 0-42.5-17.5T560-580q0-17 9.5-34.5t20.5-32q11-14.5 20.5-24l9.5-9.5 9.5 9.5q9.5 9.5 20.5 24t20.5 32Q680-597 680-580q0 25-17.5 42.5T620-520Zm160-120q-25 0-42.5-17.5T720-700q0-17 9.5-34.5t20.5-32q11-14.5 20.5-24l9.5-9.5 9.5 9.5q9.5 9.5 20.5 24t20.5 32Q840-717 840-700q0 25-17.5 42.5T780-640Zm0 240q-25 0-42.5-17.5T720-460q0-17 9.5-34.5t20.5-32q11-14.5 20.5-24l9.5-9.5 9.5 9.5q9.5 9.5 20.5 24t20.5 32Q840-477 840-460q0 25-17.5 42.5T780-400ZM360-120q-83 0-141.5-58.5T160-320q0-48 21-89.5t59-70.5v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q38 29 59 70.5t21 89.5q0 83-58.5 141.5T360-120ZM240-320h240q0-29-12.5-54T432-416l-32-24v-280q0-17-11.5-28.5T360-760q-17 0-28.5 11.5T320-720v280l-32 24q-23 17-35.5 42T240-320Z" />
                                        </Svg>
                                        <Text> Dado 2</Text>
                                        <Text style={style.buttonText}>Temperatura</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Card 2 */}
                                <View style={style.viewButton}>
                                    <TouchableOpacity style={style.button} activeOpacity={0.7}>
                                        {/* <MaterialCommunityIcons
                                            name="phone"
                                            size={width * 0.16}
                                            color="#07C3C3"
                                        /> */}
                                        <Svg style={{ marginBottom: 20 }} height={height * 0.1} viewBox="0 -960 960 960" width={width * 0.2} fill="#07C3C3">
                                            <Path d="M440-360q-17 0-28.5-11.5T400-400v-160q0-17 11.5-28.5T440-600h120q17 0 28.5 11.5T600-560v160q0 17-11.5 28.5T560-360H440Zm20-60h80v-120h-80v120Zm-300 60q-17 0-28.5-11.5T120-400v-160q0-17 11.5-28.5T160-600h120q17 0 28.5 11.5T320-560v40h-60v-20h-80v120h80v-20h60v40q0 17-11.5 28.5T280-360H160Zm520 120v-100q0-17 11.5-28.5T720-380h80v-40H680v-60h140q17 0 28.5 11.5T860-440v60q0 17-11.5 28.5T820-340h-80v40h120v60H680Z" /></Svg>|

                                        <Text>Dado 3</Text>
                                        <Text style={style.buttonText}>Contate-nos</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.button} activeOpacity={0.7}>
                                        {/* <MaterialCommunityIcons
                                            name="danger"
                                            size={width * 0.14}
                                            color="#07C3C3"

                                        /> */}
                                        <Svg style={{ marginBottom: 20 }} height={height * 0.07} viewBox="0 -960 960 960" width={width * 0.2} fill="#07C3C3"><Path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" /></Svg>

                                        <Text>Dado 3</Text>
                                        <Text style={style.buttonText}>Configurações</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
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
    text: {
        color: "#13C1CA",
        fontWeight: "bold",
        fontSize: height * 0.023,
        marginTop: width * 0.035,
    },
    textView: {
        justifyContent: "center",
        alignItems: "center",
    },
    mainViewButton: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 2,
        width: "100%",
        height: "78%",
        overflow: "hidden",

    },
    viewButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: "45%",
        marginBottom: 5,
        overflow: "hidden",
    },
    button: {
        width: "48%",
        height: "100%",
        borderRadius: 12,
        borderColor: "#07C3C3",
        borderWidth: 2,
        marginHorizontal: 5,
        elevation: 5, //Sombra
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    buttonText: {
        fontSize: width * 0.035,
        color: "#07C3C3",
        marginTop: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
});
