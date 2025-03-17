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
                    source={require("../../../../assets/LogoBranca.png")} 
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.secondPierce}>
                <ImageBackground 
                    source={require("../../../../assets/wave.png")}
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
        width: "100%",
        height: "100%",
        backgroundColor: "#13D8B0",
    },
    firstPierce: {
        width: "100%",
        height: "23%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "5%",
    },
    secondPierce: {
        width: "100%",
        height: "90%",
        overflow: 'hidden',
    },
    logo: {
        width: width * 0.3, 
        height: height * 0.2, 
        resizeMode: "contain",
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover", 
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20, 
    },
    text: {
        color: "#13C1CA",
        fontWeight: "bold",
        fontSize: 25, 
        marginBottom: height * 0.02,
    },
    mainViewButton: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop:20,
    },
    viewButton: {
        flexDirection: "row",
        justifyContent: "center",
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
        maxWidth: 150,
        maxHeight: 150, 
        margin:10,
        
    },
    buttonText: {
        fontSize: 15, 
        color: "#07C3C3",
        marginTop: height * 0.01, 
        textAlign: "center",
        fontWeight: "bold",
        maxWidth: "100%", 
    },
});