import { useState } from 'react';
import { View, Image, Touchable, StyleSheet, Dimensions, Text, TouchableOpacity, Switch } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const { width, height } = Dimensions.get("window");

export default function PreferenciasScreen() {
    const [isEnable, setIsEnable] = useState(false);//isEnable é falso
    const touchSwitch = () => setIsEnable(previousState => !previousState);
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
                    <Image source={require('../../../assets/CogIcon.png')} style={style.image} />
                </View>
                <View style={style.ViewButton}>

                    <View style={style.button}>
                        <View style={style.viewIconButton}>
                            <MaterialCommunityIcons name='information' size={24} color='#fff' />
                        </View>
                        <View style={style.viewTitleButton}>
                            <Text style={style.titleButton}>Ativar notificações</Text>
                            <Text style={style.textButton}>Receba atualizações e alertas importantes</Text>
                        </View>
                        <View>
                            <Switch
                                trackColor={{ false: '#84857E', true: '#13D8B0' }}
                                thumbColor={isEnable ? "white" : "#595A55"}
                                onValueChange={touchSwitch}
                                value={isEnable}


                            />
                        </View>
                    </View>

                    <View style={style.button}>
                        <View style={style.viewIconButton}>
                            <MaterialCommunityIcons name='bell' size={24} color='#fff' />
                        </View>
                        <View style={style.viewTitleButton}>
                            <Text style={style.titleButton}>Limpar Armazenamento </Text>
                            <Text style={style.textButton}>Libere espaço removendo dados desnecessários</Text>
                        </View>
                        <TouchableOpacity>
                            <View style={style.iconContainer}>
                                <MaterialCommunityIcons name='trash-can' size={width * 0.07} color='#13D8B0' />
                            </View>
                        </TouchableOpacity>
                    </View>

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
    iconContainer: {
        backgroundColor: "#ECE6F0",
        borderRadius: 5,
        padding: 5,
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.8,
        shadowRadius: 20,


    },

});
