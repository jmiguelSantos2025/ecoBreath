import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, database, firestore } from '../../../firebaseConfig';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router/build/imperative-api';
import { get } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';

const { height } = Dimensions.get("window");

export default function ConfigScreen() {
    const [userPhoto,setUserPhoto] = useState<string|null>(null);
    useEffect(()=>{

        const pegarImage= async () =>{
        const currentUser = auth.currentUser;
        
        if(currentUser){
            const docRef = doc(firestore,'usuarios', currentUser.uid);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                const data = docSnap.data();
                if(data.photoURL){
                    setUserPhoto(data.photoURL);
                }else{
                    console.log("Foto de perfil não encontrada");
                }
            }
        }else{
            console.log("Nada chegando");
        }
    }
pegarImage();
    },[]);
    return (
        <View style={style.container}>
            <IconButton
                      icon="arrow-left"
                      size={30}
                      onPress={() => router.back()}
                      iconColor="white"
                      style={{ position: "absolute", top: 20, left: 20, zIndex: 10, backgroundColor: "#428F77" }}
                    />
            <View style={style.firstPierce}>
                
                <Image
                    source={require("../../../assets/LogoAzul.png")}
                    style={style.logo}
                />
            </View>

            <View style={style.secondPierce}>
                <View style={style.viewTitle}>
                    <Text style={style.title}>Configurações de Usuário</Text>
                </View>

                <View style={style.viewImage}>
                    <Image
                        source={userPhoto && userPhoto!=="" ? { uri: userPhoto } : require('../../../assets/UserProfileIcon.png')}
                        style={style.image}
                    />
                </View>

                <View style={style.ViewButton}>
                    <TouchableOpacity style={style.button} onPress={()=>router.push('EditarUserScreen')}>
                        <View style={style.viewIconButton}>
                            <MaterialCommunityIcons name='information' size={RFValue(20)} color='#fff' />
                        </View>
                        <View style={style.viewTitleButton}>
                            <Text style={style.titleButton}>Informações da Conta</Text>
                            <Text style={style.textButton}>Alterar senha, mudar nome</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.button} onPress={()=>router.push('PreferenciasScreen')}>
                        <View style={style.viewIconButton}>
                            <MaterialCommunityIcons name='bell' size={RFValue(20)} color='#fff' />
                        </View>
                        <View style={style.viewTitleButton}>
                            <Text style={style.titleButton}>Preferências</Text>
                            <Text style={style.textButton}>Notificações, armazenamento</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.button} onPress={()=>router.push('DropAccountScreen')}>
                        <View style={style.viewIconButton}>
                            <MaterialCommunityIcons name='logout' size={RFValue(20)} color='#fff' />
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
        flex: 1,
        backgroundColor: "white",
    },
    firstPierce: {
        flex: 0.23,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: RFValue(110),
        resizeMode: "contain",
    },
    secondPierce: {
        flex: 0.77,
        backgroundColor: "#13D8B0",
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: RFValue(20),
    },
    viewTitle: {
        marginBottom: height * 0.03,
    },
    title: {
        fontSize: RFValue(18),
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    viewImage: {
        marginBottom: height * 0.04,
    },
    image: {
        width: RFValue(100),
        height: RFValue(100),
        borderRadius: RFValue(50),
        borderWidth: 2,
        borderColor: "#fff",
    },
    ViewButton: {
        width: "100%",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0E9693",
        padding: RFValue(15),
        borderRadius: RFValue(10),
        marginBottom: RFValue(15),
    },
    viewIconButton: {
        marginRight: RFValue(15),
    },
    viewTitleButton: {
        flex: 1,
    },
    titleButton: {
        fontSize: RFValue(16),
        color: "#fff",
        fontWeight: "bold",
    },
    textButton: {
        fontSize: RFValue(14),
        color: "#fff",
        opacity: 0.8,
    },
});
