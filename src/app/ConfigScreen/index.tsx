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
                    <Image source={require('../../../assets/UserProfileIcon.png')} style={style.image} />
                </View>
                <View style={style.ViewButton}>

                    <TouchableOpacity style={style.button}>
                        <View style={style.viewIconButton}>
                            <MaterialCommunityIcons name='information' size={24} color='#fff' />
                        </View>
                        <View style={style.viewTitleButton}>
                            <Text style={style.titleButton}>Informações da Conta</Text>
                            <Text style={style.textButton}>Alterar senha, mudar nome</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.button}>
                        <View style={style.viewIconButton}>
                            <MaterialCommunityIcons name='bell' size={24} color='#fff' />
                        </View>
                        <View style={style.viewTitleButton}>
                            <Text style={style.titleButton}>Preferências</Text>
                            <Text style={style.textButton}>Notificações, armazenamento</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.button}>
                        <View style={style.viewIconButton}>
                            <MaterialCommunityIcons name='logout' size={24} color='#fff' />
                        </View>
                        <View style={style.viewTitleButton}>
                            <Text style={style.titleButton}>Sair da Conta</Text>
                            <Text style={style.textButton}>Deslogar da Conta</Text>
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
        borderRadius: width * 0.15,
        borderWidth: 2,
        borderColor: "#fff",
    },
    ViewButton: {
        width: "100%",
        paddingHorizontal: width * 0.06,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0E9693",
        padding: width * 0.04,
        borderRadius: 10,
        marginBottom: height * 0.02,
    },
    viewIconButton: {
        marginRight: width * 0.06,
    },
    viewTitleButton: {
        flex: 1,
    },
    titleButton: {
        fontSize: width * 0.045,
        color: "#fff",
        fontWeight: "bold",
    },
    textButton: {
        fontSize: width * 0.035,
        color: "#fff",
        opacity: 0.8,
    },
});
