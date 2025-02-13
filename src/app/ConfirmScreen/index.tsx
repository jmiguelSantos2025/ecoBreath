import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("screen");

export default function ConfirmScreen() {
    return (
        <View style={style.container}>

            <View style={style.firstPierce}>
                <Image source={require("../../../assets/LogoBranca.png")} />
            </View>


            <View style={style.secondPierce}>
                <ImageBackground source={require("../../../assets/wave.png")}
                    style={style.imageBackground}
                >
                    <View style={{ justifyContent: "center", alignItems: "center", }}>
                        <Image source={require('../../../assets/checkRadius.png')}style={style.imageCheck} resizeMode={'contain'}/>
                        <Text style={style.text}>
                            Senha nova definida!
                        </Text>
                        <View style={style.viewSubTitle}>
                            <Text style={style.subtitle}>
                            Volte para o menu para entrar em sua conta usando a nova senha
                            </Text>
                        </View>

                        
                        <View style={style.viewButton}>


                            <Button mode="contained"
                                disabled={false}
                                style={style.layoutButton}

                                labelStyle={style.buttonText}
                                theme={{
                                    colors: {
                                        
                                        primary: '#07C3C3',
                                    },

                                }}
                            >Enviar</Button>

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
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow:"hidden"


    },
    text: {
        color: "#13C1CA",
        fontWeight: "bold",
        fontSize: height * 0.02,

    },
    layoutButton: {
        width: width * 0.7,
        height: height * 0.08,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 20,
        fontWeight:"bold",
        
    },

    viewButton: {
        flex: 0.7,
        justifyContent: "center"
    },
    subtitle: {
        color: "#0E9693",
        textAlign:"center"

    },
    viewSubTitle:{
        flexDirection:"row",     
        margin:20,


    },
    imageCheck:{
        marginBottom:20,
        width:width*0.3,
        height:height*0.2
    }
    
});