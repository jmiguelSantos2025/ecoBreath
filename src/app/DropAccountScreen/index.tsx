import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");

export default function ConfigScreen() {
    return (
        <View style={style.container}>
            <View style={style.firstPierce}>
                <Image source={require("../../../assets/LogoAzul.png")} style={{ marginBottom: 10 }} />
            </View>

            <View style={style.secondPierce}>
                <View style={style.viewTitle}>
                    <Text style={style.title}>Configurações de Usuário</Text>
                </View>
                <View style={style.viewImage}>
                    <Image source={require('../../../assets/reciclyByn.png')} style={style.image} />
                </View>
                <View style={style.viewTitleSecond}>
                    <Text style={style.titleSecond}>Deseja realmente sair da conta?</Text>
                </View>
                <View style={style.ViewTextSubtitle}>
                    <Text style={style.TextSubtitle}>
                        A saída acarretará na desconexão com a Máquina.
                    </Text>
                </View>

                <View style={style.ViewButton}>
                    <TouchableOpacity style={style.button}>
                        <View style={style.viewTitleButton}>
                            <Text style={style.textButton}>Sim</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        height: "27%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: height * 0.03,
    },
    secondPierce: {
        backgroundColor: "#13D8B0",
        width: "100%",
        height: "73%",
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    viewTitle: {
        marginBottom: height * 0.03,
    },
    title: {
        fontSize: width * 0.05,
        color: "#fff",
        fontWeight: "bold",
    },
    viewImage: {
        marginBottom: height * 0.04,
    },
    image: {
        width: width * 0.3,
        height: width * 0.3,
    },
    viewTitleSecond: {
        marginBottom: height * 0.01,
        alignItems: "center",
        paddingHorizontal: width * 0.1,
    },
    titleSecond: {
        fontSize: width * 0.045,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    ViewTextSubtitle: {
        marginBottom: height * 0.04,
        alignItems: "center",
        paddingHorizontal: width * 0.2,
    },
    TextSubtitle: {
        fontSize: width * 0.035,
        color: "#fff",
        textAlign: "center",
        opacity: 0.9,
    },
    ViewButton: {
        width: "100%",
        paddingHorizontal: width * 0.08,
    },
    button: {
        height:height*0.1,
        alignItems: "center",
        backgroundColor: "#0E9693",        
        borderRadius: 10,
        marginBottom: height * 0.02,
        shadowColor: "#000",
        elevation: 5,
    },
    viewTitleButton: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        
    },
    
    textButton: {
        fontSize: width * 0.045,
        color: "#fff",
        fontWeight:"bold",
    },
});
