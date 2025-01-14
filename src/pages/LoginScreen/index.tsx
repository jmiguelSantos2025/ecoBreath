import { Source } from '@mui/icons-material';
import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const { width, height } = Dimensions.get("screen");

export default function LoginScreen() {
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
                    <View style={{ justifyContent: "center", alignItems: "center", }}>
                        <Text style={style.text}>
                            Entre em sua conta
                        </Text>
                        {/* View Input text */}
                        <View>
                            <TextInput
                                style={style.inputText}
                                label={'E-mail'}
                                mode='outlined'
                                right={
                                    <TextInput.Icon
                                        icon={({ size, color }) => (
                                            <MaterialCommunityIcons
                                                name="email-outline"  // ícone com contorno
                                                size={size}
                                                color="#006765"  // cor do contorno (verde)
                                            />
                                        )}
                                    />
                                }
                                theme={{
                                    colors: {
                                        outline: '#D3D3D3',
                                        background: "white",
                                        primary: "#006765",
                                    },
                                    roundness: 10,

                                }}
                            />
                            <TextInput style={style.inputText}
                                label={'Senha'}
                                mode='outlined'
                                right={
                                    <TextInput.Icon
                                        icon={({ size, color }) => (
                                            <MaterialCommunityIcons
                                                name="lock-outline"
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
                        <View style={style.viewText}>
                            <Text style={{
                                color: "#006765",
                                fontWeight: "bold",
                                textDecorationLine: "underline",
                                alignSelf: "flex-end"

                            }}>Esqueci minha senha</Text>
                        </View>

                        <View style={style.viewButton}>
                            <Button
                                mode="contained"
                                disabled={false}
                                style={style.layoutButton}
                                labelStyle={style.buttonText}
                                theme={{
                                    colors: {
                                        primary: "#07C3C3",
                                        text: "white",
                                    },

                                }}
                            >Entrar</Button>
                            <Button mode="outlined"
                                disabled={false}
                                style={style.layoutButton}

                                labelStyle={style.buttonText}
                                theme={{
                                    colors: {
                                        outline: '#07C3C3',
                                        primary: '#07C3C3',
                                    },

                                }}
                            >Cadastrar</Button>

                        </View>

                        {/* Conexão */}
                        <View style={style.container2}>

                            <View style={style.dividerContainer}>
                                <View style={style.line} />
                                <Text style={style.dividerText}>Conectar usando</Text>
                                <View style={style.line} />
                            </View>
                            <View style={style.ButtonConectView}>
                                <Button
                                    icon={({ size, color }) => (
                                        <MaterialCommunityIcons
                                            name="google"  // Ou o nome de outro ícone
                                            size={size}
                                            color={"white"}
                                            
                                        />
                                    )}
                                    mode="contained" // Modo para evitar o espaço vazio
                                    style={style.iconButton}
                                    contentStyle={style.iconButtonContent}
                                    theme={{
                                        colors: {
                                            primary: "#006765", // Cor de fundo
                                        },
                                    }}
                                />


                                {/* <Button icon={'facebook'} mode='text' style={style.ExternoButtonConect} contentStyle={style.InteriorButtonConect} /> */}
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
        marginTop: 20
    },
    layoutButton: {
        width: "100%",
        height: "40%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 20,
    },

    viewButton: {
        width: width * 0.7,
        height: height * 0.18,
        justifyContent: "space-between"
    },
    viewText: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: width * 0.65,
        margin: 40,

    },
    container2: {
        paddingHorizontal: 20,
        alignItems: "center",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    line: {
        flex: 0.32,
        height: 1,
        backgroundColor: "#20524E",
    },
    dividerText: {
        marginHorizontal: 10,
        color: "#006765",
        fontWeight: "bold",
    },



    iconButton: {
        borderRadius: 25,
        width: 50,
        height: 50,
        margin: 5,
        padding: 0,
        justifyContent: "center",
        
    },
    iconButtonContent: {
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
    },




    ButtonConectView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 1



    },gi

});