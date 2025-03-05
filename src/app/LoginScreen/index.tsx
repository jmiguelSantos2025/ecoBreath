import { View, Image, StyleSheet, Dimensions, Text, ImageBackground, } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import { logOut, signIn, signUp } from '../../Components/authenticator';
import { router } from 'expo-router';



const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const handleSignIn = async()=>{
        const result = await signIn(email,password);
        if(result.message){
            setEmail('');
            setPassword('');
            router.push('/MainScreen');
            
            
            
        }
        else{
            alert(result.message);
        }
    }
    const Database = async()=>{
        if(!email || !password){

            alert("Preencha os campos antes de prosseguir");
            return;
            
        }else{
        
           await handleSignIn();
        }
    }
    return (
        <View style={style.container}>
            {/* Precisa ajeitar a logo */}
            <View style={style.firstPierce}>
                <Image source={require("../../../assets/LogoBranca.png")} style={{justifyContent:"center",alignItems:"center"}} />
            </View>

            <View style={style.secondPierce}>
                <ImageBackground source={require("../../../assets/wave.png")}
                    style={style.imageBackground}
                >
                    <View style={{ justifyContent: "center", alignItems: "center", }}>
                        <Text style={style.text}>
                            Entre em sua conta
                        </Text>
                        
                        <View>
                            <TextInput
                                style={style.inputText}
                                label={'E-mail'}
                                value={email}
                                mode='outlined'
                                
                                onChangeText={(Text)=>setEmail(Text)}
                                right={
                                    <TextInput.Icon
                                        icon={({ size, color }) => (
                                            <MaterialCommunityIcons
                                                name="email-outline"
                                                size={size}
                                                color="#006765"  
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
                                value={password}
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
                                onChangeText={(Text)=>setPassword(Text)}
                                secureTextEntry={true} 
                                theme={{
                                    colors: {
                                        outline: '#D3D3D3',
                                        background: "white",
                                        primary: "#006765",
                                    },
                                    roundness: 10,
                                }

                                }


                            />
                        </View>
                        <View style={style.viewText} >
                            <Text onPress={()=>router.push('/NewUserScreen')} style={{
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
                                onPress={Database}
                                
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

                            <View style={style.viewContainerIcon}>

                                <View style={style.containerIconButton}>

                                    <IconButton
                                        icon='google'
                                        size={24}
                                        style={style.iconButton}
                                        iconColor="white"

                                    />

                                </View>
                                <View style={style.containerIconButton}>

                                    <IconButton
                                        icon='facebook'
                                        size={24}
                                        style={style.iconButton}
                                        iconColor="white"

                                    />

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
        height: "77%",

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
        fontSize: height * 0.023,
        

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
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    containerIconButton: {
        backgroundColor: "#006765",
        borderRadius: 50,
        padding: 5,

    },
    viewContainerIcon: {
        flexDirection:"row",
        gap:10,


    }

});