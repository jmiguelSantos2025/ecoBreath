import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");

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
                    <View style={{overflow:"hidden", flex:1,margin:20}}>
                        <View style={style.textView}>
                            <Text style={style.text}>
                                Bem vindo: Usuário
                            </Text>
                            <View style={style.mainViewButton}>
                                <View style={style.viewButton}>
                                    <Button style={style.button}>a</Button>
                                    <Button style={style.button}>a</Button>
                                </View>
                                <View style={style.viewButton}>
                                    <Button style={style.button}>a</Button>
                                    <Button style={style.button}>a</Button>
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
        height: "100%",


    },
    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"


    },
    text: {
        color: "#13C1CA",
        fontWeight: "bold",
        fontSize: height * 0.02,

    },
    textView: {

    },
    mainViewButton: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"


    },
    viewButton: {
        flexDirection: "row",
        flex: 1,

    },
    button: {

    }



});