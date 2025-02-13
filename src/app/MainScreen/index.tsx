import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");

export default function MainScreen() {
    return (
        <View style={style.container}>
            <View style={style.firstPierce}>
                <Image source={require("../../../assets/LogoBranca.png")} />
            </View>

            <View style={style.secondPierce}>
                <ImageBackground source={require("../../../assets/wave.png")}
                    style={style.imageBackground}
                >
                    <View style={{ overflow: "hidden", flex: 1, margin: 20 }}>
                        <View style={style.textView}>
                            <Text style={style.text}>
                                Bem-vindo: Usuário
                            </Text>

                            <View style={style.mainViewButton}>
                                {/* Card 1 */}
                                <View style={style.viewButton}>
                                    <TouchableOpacity style={style.button} activeOpacity={0.7}>
                                        <MaterialCommunityIcons
                                            name="weather-windy"
                                            size={width*0.14}
                                            color="#07C3C3"
                                            
                                        />
                                        <Text style={style.buttonText}>Monitoramento</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.button} activeOpacity={0.7}>
                                        <MaterialCommunityIcons
                                            name="power"
                                            size={width*0.14}
                                            color="#07C3C3"
                                            
                                        />
                                        <Text style={style.buttonText}>Ligar/Desligar</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Card 2 */}
                                <View style={style.viewButton}>
                                    <TouchableOpacity style={style.button} activeOpacity={0.7}>
                                        <MaterialCommunityIcons
                                            name="phone"
                                            size={width*0.16}
                                            color="#07C3C3"
                                        />
                                        <Text style={style.buttonText}>Contate-nos</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.button} activeOpacity={0.7}>
                                        <MaterialCommunityIcons
                                            name="cog"
                                            size={width*0.14}
                                            color="#07C3C3"
                                            
                                        />
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
        backgroundColor: "#13D8B0",
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
        fontSize: width*0.035,
        color: "#07C3C3",
        marginTop: 20,
        textAlign: "center",
        fontWeight:"bold",
    },
});
