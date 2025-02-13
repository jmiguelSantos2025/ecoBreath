import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("screen");

export default function PasswordUserScreen() {
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
                        <Text style={style.text}>
                            Recuperação de senha
                        </Text>
                        <View style={style.viewSubTitle}>
                            <Text style={style.subtitle}>
                                Crie sua nova senha e volta a navegar em nossa plataforma :)
                            </Text>
                        </View>

                        <View>
                            {/* Senha*/}
                            <TextInput style={style.inputText}
                                label={'Senha'}
                                mode='outlined'
                                right={
                                    <TextInput.Icon
                                        icon={({ size, color }) => (
                                            <MaterialCommunityIcons
                                                name="eye-outline"
                                                size={size}
                                                color="#006765"
                                            />
                                        )}
                                    />
                                }
                                secureTextEntry={true} theme={{
                                    colors: {
                                        outline: '#D3D3D3',
                                        background: "white",
                                        primary: "#006765",
                                    },
                                    roundness: 10,
                                }}

                            />
                            {/* Confirme sua senha*/}
                            <TextInput style={style.inputText}
                                label={'Confirme sua senha'}
                                mode='outlined'
                                right={
                                    <TextInput.Icon
                                        icon={({ size, color }) => (
                                            <MaterialCommunityIcons
                                                name="eye-off-outline"
                                                size={size}
                                                color="#006765"
                                            />
                                        )}
                                    />
                                }
                                secureTextEntry={true} theme={{
                                    colors: {
                                        outline: '#D3D3D3',
                                        background: "white",
                                        primary: "#006765",
                                    },
                                    roundness: 10,
                                }}

                            />
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
                            >Continuar</Button>

                        </View>

                        {/* Conexão */}

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


    },
    text: {
        color: "#13C1CA",
        fontWeight: "bold",
        fontSize: height * 0.02,

    },
    inputText: {
        width: width * 0.65,
        height: height * 0.059,
        marginTop: 10
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

    },
    viewSubTitle:{
        flexDirection:"row",
        textAlign:"center",
        margin:20,


    },
    
});