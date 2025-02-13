import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '@mui/material';

const { width, height } = Dimensions.get("screen");

export default function EmailRescueScreen() {
    return (
        <View style={style.container}>
            {/* Precisa ajeitar a logo */}
            <View style={style.firstPierce}>
                <Image source={require("../../../assets/LogoBranca.png")} />
            </View>


            <View style={style.secondPierce}>
                <ImageBackground source={require("../../../assets/wave.png")}
                    style={style.imageBackground}
                >
                    <Image resizeMode={'contain'} style={style.image} source={require('../../../assets/EmailImage.png')}>

                    </Image>
                    <View style={style.containerSecond}>
                        <Text style={style.title}>Email Enviado!</Text>
                        <View style={{ flexDirection: "row", marginBottom:10 }}>
                            <Text style={style.text}>Enviamos um e-mail para que você confirme a finalização do cadastro</Text>
                        </View>


                        <Button mode='contained' style={style.button} labelStyle={{ fontWeight: "bold", fontSize: 20 }} theme={{
                            colors: {
                                primary: "#08C5C1",
                            },
                            roundness: 4,

                        }}>
                            Ok
                        </Button >

                        <View style={{ flexDirection: "row", margin: 10 }}>
                            <Text style={style.text}>Caso não receba nosso email em alguns minutos, tente reenviar</Text>
                        </View>
                        <Button mode='outlined' style={style.button} labelStyle={{ fontWeight: "bold", fontSize: 20 }} theme={{
                            colors: {
                                primary: "#08C5C1",

                            }
                        }}
                        >Reenviar</Button>
                    </View>

                </ImageBackground >
            </View >
        </View >
    );
}

const style = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: "#13D8B0",




    },
    firstPierce: {
        width: width,
        height: "28%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: height * 0.05,


    },
    secondPierce: {

        width: "100%",
        height: "75%",


    },
    imageBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",


    },
    image: {
        width: "60%",
        height: "15%",

    },
    containerSecond: {
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",


    },
    title: {
        color: "#13D8B0",
        fontWeight: "bold",
        fontSize: width * 0.05,
        marginTop: 40,
        marginBottom: 20

    },
    text: {
        color: "#006765",
        fontSize: width * 0.03,
        textAlign:"center"
    },
    button: {
        width: width * 0.7,
        height: height * 0.08,
        justifyContent: "center",
        overflow: "hidden",
        margin: 30,
        borderColor: "#08C5C1",
        borderWidth: 2,


    },
});