import { View, Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

export default function ConectScreen() {
    const { width, height } = useWindowDimensions();
    
    return (
        <View style={style.container}>
            <View style={style.firstPierce}>
                <Image source={require("../../../../assets/LogoBranca.png")} style={style.logo} />
            </View>
            <View style={style.secondPierce}>
                <View style={[style.viewIcon, { width: width * 0.25, height: width * 0.25, borderRadius: width * 0.05 }]}> 
                    <MaterialCommunityIcons name='wifi' color={'white'} size={width * 0.21} />
                </View>
                <Text style={style.titleText}>Configurações de Conexão</Text>
                <View style={style.stepsContainer}>
                    {["Ligue a máquina", "Aceite as permissões na tela do produto e do aplicativo", "Ative o Wifi da máquina e do aparelho"].map((text, index) => (
                        <View key={index} style={style.stepItem}>
                            <View style={style.viewIconRight}>
                                <Text style={style.iconRight}>{index + 1}</Text>
                            </View>
                            <Text style={style.text}>{text}</Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity activeOpacity={0.6} style={style.layoutButton1} onPress={()=>router.push("PowerScreen")}>
                    <Text style={style.buttonText1}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
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
        resizeMode: "contain",
        width: 110,
    },
    secondPierce: {
        flex: 0.77,
        backgroundColor: "white",
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    viewIcon: {
        backgroundColor: "#13D8B0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },
    titleText: {
        fontSize: 18,
        color: "#13C1CA",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    stepsContainer: {
        width: "100%",
    },
    stepItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    text: {
        fontSize: 14,
        color: "#0E9693",
        flexShrink: 1,
    },
    viewIconRight: {
        marginRight: 10,
        backgroundColor: "#13C1CA",
        borderRadius: 50,
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    iconRight: {
        color: "#fff",
        fontWeight: "bold",
    },
    layoutButton1: {
        width: "80%",
        height: 70,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#07C3C3",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 20,
    },
    buttonText1: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
});