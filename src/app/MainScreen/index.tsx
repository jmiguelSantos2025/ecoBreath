import { router } from 'expo-router';
import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");

export default function MainScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.firstPierce}>
                <Image 
                    source={require("../../../assets/LogoBranca.png")} 
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.secondPierce}>
                <ImageBackground 
                    source={require("../../../assets/wave.png")}
                    style={styles.imageBackground}
                    resizeMode="cover"
                >
                    <View style={styles.contentContainer}>
                        <Text style={styles.text}>
                            Bem-vindo: Usuário
                        </Text>

                        <View style={styles.mainViewButton}>
                            {/* Card 1 */}
                            <View style={styles.viewButton}>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={()=> router.push('/MonitoringScreen')}>
                                    <MaterialCommunityIcons
                                        name="weather-windy"
                                        size={width * 0.14}
                                        color="#07C3C3"
                                    />
                
                                    <Text style={styles.buttonText}>Monitoramento</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                                    <MaterialCommunityIcons
                                        name="power"
                                        size={width * 0.14}
                                        color="#07C3C3"
                                    />
                                    <Text style={styles.buttonText}>Ligar/Desligar</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Card 2 */}
                            <View style={styles.viewButton}>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                                    <MaterialCommunityIcons
                                        name="phone"
                                        size={width * 0.16}
                                        color="#07C3C3"
                                    />
                                    <Text style={styles.buttonText}>Contate-nos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                                    <MaterialCommunityIcons
                                        name="cog"
                                        size={width * 0.14}
                                        color="#07C3C3"
                                    />
                                    <Text style={styles.buttonText}>Configurações</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#13D8B0",
    },
    firstPierce: {
        flex: 0.23, 
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: width * 0.4, 
        height: height * 0.1, 
    },
    secondPierce: {
        flex: 0.77, 
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
        width: "90%", 
    },
    text: {
        color: "#13C1CA",
        fontWeight: "bold",
        fontSize: width * 0.05, 
        marginBottom: height * 0.02,
    },
    mainViewButton: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    viewButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: height * 0.02, 
    },
    button: {
        width: "48%", 
        aspectRatio: 1, 
        borderRadius: 12,
        borderColor: "#07C3C3",
        borderWidth: 2,
        elevation: 5, // Sombra
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    buttonText: {
        fontSize: width * 0.035, 
        color: "#07C3C3",
        marginTop: height * 0.01, 
        textAlign: "center",
        fontWeight: "bold",
    },
});