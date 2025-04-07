import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAuth, updatePassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../../../../firebaseConfig'; 

const { width, height } = Dimensions.get('window');

export default function EditarUserScreen() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            const user = auth.currentUser;  
            if (user) {
                try {
                    const userRef = doc(firestore, 'usuarios', user.uid); 
                    const docSnap = await getDoc(userRef);

                    if (docSnap.exists()) {
                        setUserData({
                            username: docSnap.data().username || '',
                            email: docSnap.data().email || '',
                            password: '',  
                        });
                    } else {
                        console.log('Usuário não encontrado no Firestore!');
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados do usuário:', error);
                }
            }
            setLoading(false);
        };

        loadUserData();
    }, []);

    const handleSave = async () => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(firestore, 'usuarios', user.uid);  

            try {
                
                await updateDoc(userRef, {
                    username: userData.username,
                    email: userData.email,
                });

                
                if (userData.password) {
                    await updatePassword(user, userData.password);
                    console.log('Senha atualizada com sucesso!');
                }

                console.log('Perfil atualizado com sucesso!');
            } catch (error) {
                console.error('Erro ao atualizar perfil:', error);
            }
        }
    };

    const handleCancel = () => {
        
        setUserData({
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <View style={style.container}>
            <View style={style.firstPierce}>
                <Text style={style.title}>Editar Perfil</Text>
                <View style={style.viewIcon}>
                    <MaterialCommunityIcons
                        name="account-circle-outline"
                        size={height * 0.04} 
                        color="#006765"
                    />
                </View>
            </View>

            <View style={style.secondPierce}>
                <View style={style.photoSection}>
                    <Image
                        source={require("../../../../assets/UserProfileIcon.png")}
                        style={style.profileImage}
                    />
                    <Text style={style.editPhotoText}>Editar foto de usuário</Text>
                </View>

                {loading ? (
                    <Text>Carregando...</Text>
                ) : (
                    <>
                        <TextInput
                            style={style.inputText}
                            label="Usuário"
                            mode="outlined"
                            value={userData.username}  
                            onChangeText={(text) => setUserData({ ...userData, username: text })}
                            right={
                                <TextInput.Icon
                                    icon={({ size }) => (
                                        <MaterialCommunityIcons
                                            name="close-circle-outline"
                                            size={size}
                                            color="#006765"
                                        />
                                    )}
                                />
                            }
                            theme={{
                                colors: {
                                    outline: '#D3D3D3',
                                    background: 'white',
                                    primary: '#006765',
                                },
                                roundness: 10,
                            }}
                        />
                        <TextInput
                            style={style.inputText}
                            label="E-mail"
                            mode="outlined"
                            value={userData.email}  
                            onChangeText={(text) => setUserData({ ...userData, email: text })}
                            right={
                                <TextInput.Icon
                                    icon={({ size }) => (
                                        <MaterialCommunityIcons
                                            name="close-circle-outline"
                                            size={size}
                                            color="#006765"
                                        />
                                    )}
                                />
                            }
                            theme={{
                                colors: {
                                    outline: '#D3D3D3',
                                    background: 'white',
                                    primary: '#006765',
                                },
                                roundness: 10,
                            }}
                        />
                        <TextInput
                            style={style.inputText}
                            label="Senha"
                            mode="outlined"
                            secureTextEntry={true}
                            value={userData.password}
                            onChangeText={(text) => setUserData({ ...userData, password: text })}
                            right={
                                <TextInput.Icon
                                    icon={({ size }) => (
                                        <MaterialCommunityIcons
                                            name="close-circle-outline"
                                            size={size}
                                            color="#006765"
                                        />
                                    )}
                                />
                            }
                            theme={{
                                colors: {
                                    outline: '#D3D3D3',
                                    background: 'white',
                                    primary: '#006765',
                                },
                                roundness: 10,
                            }}
                        />
                        <TextInput
                            style={style.inputText}
                            label="Confirme sua senha"
                            mode="outlined"
                            secureTextEntry={true}
                            value={userData.password}
                            onChangeText={(text) => setUserData({ ...userData, password: text })}
                            right={
                                <TextInput.Icon
                                    icon={({ size }) => (
                                        <MaterialCommunityIcons
                                            name="close-circle-outline"
                                            size={size}
                                            color="#006765"
                                        />
                                    )}
                                />
                            }
                            theme={{
                                colors: {
                                    outline: '#D3D3D3',
                                    background: 'white',
                                    primary: '#006765',
                                },
                                roundness: 10,
                            }}
                        />
                    </>
                )}
            </View>

            <View style={style.thirdPierce}>
                <View style={style.buttonContainer}>
                    <TouchableOpacity style={style.saveButton} /*onPress={handleSave}*/ onPress={()=>alert("Ainda em desenvolvimento")}>
                        <Text style={style.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.cancelButton} /*onPress={handleCancel}*/ onPress={()=>alert("Ainda em Desenvolvimento")}>
                        <Text style={style.cancelButtonText}>Cancelar</Text>
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
        backgroundColor: '#13D8B0',
    },
    firstPierce: {
        width: '100%',
        height: height * 0.08,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        elevation: 5,
    },
    title: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        color: '#006765',
    },
    viewIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondPierce: {
        marginTop: height * 0.2,
        paddingHorizontal: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoSection: {
        alignItems: 'center',
        marginBottom: height * 0.03,
    },
    profileImage: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: (width * 0.3) / 2,
        backgroundColor: '#D3D3D3', 
    },
    editPhotoText: {
        fontSize: height * 0.02,
        color: 'white',
        fontWeight: 'bold',
        marginTop: height * 0.01,
    },
    inputText: {
        width: '100%',
        marginBottom: height * 0.02,
    },
    thirdPierce: {
        width: '100%',
        height: height * 0.15, 
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: width * 0.1,
        paddingBottom: height * 0.03, 
        elevation: 5,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        alignItems: 'center',
        width: '100%',
        marginBottom:20,
    },
    saveButton: {
        backgroundColor: '#13D8B0',
        width: '45%',
        paddingVertical: height * 0.015,
        borderRadius: height * 0.02,
        alignItems: 'center',
        marginRight: width * 0.05, 
    },
    saveButtonText: {
        fontSize: height * 0.02,
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#13D8B0',
        backgroundColor: 'white',
        width: '45%',
        paddingVertical: height * 0.015,
        borderRadius: height * 0.02,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: height * 0.02,
        color: '#13D8B0',
        fontWeight: 'bold',
    },
});
