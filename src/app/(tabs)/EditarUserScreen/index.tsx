import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../../../../firebaseConfig';
import CustomModal, { CustomConfirmModal } from '../../../Components/CustomModal';
import { router } from 'expo-router';
const { width, height } = Dimensions.get('window');

export default function EditarUserScreen() {
  const [userData, setUserData] = useState({ username: '', email: '', password: '', photoURL: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modal2IsVisible, setModal2IsVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(firestore, 'usuarios', user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              username: data.username || '',
              email: data.email || '',
              password: '',
              photoURL: data.photoURL || '',
            });
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
      setLoading(false);
    };
    loadUserData();
  }, []);

  const pickAndUploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Precisamos de permissão para acessar suas fotos.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      quality: 0.7,
    });
  
    if (result.canceled || !result.assets || !result.assets[0]?.uri) {
      return;
    }
  
    const uri = result.assets[0].uri;
    const user = auth.currentUser;
    if (!user) return;
  
    try {
      setUploading(true);
      const userRef = doc(firestore, 'usuarios', user.uid);
      await updateDoc(userRef, { photoURL: uri });
      setUserData(prev => ({ ...prev, photoURL: uri }));
    } catch (error) {
      console.error('Erro ao salvar imagem:', error);
      alert('Não foi possível salvar a imagem.');
    } finally {
      setUploading(false);
    }
  };
  
  const handleSave = async () => {
  const user = auth.currentUser;
  if (!user) return;


  const isChangingPassword = userData.password || confirmPassword || currentPassword;

  if (isChangingPassword) {
    
    if (!userData.password || !confirmPassword || !currentPassword) {
      alert('Para alterar a senha, preencha todos os campos de senha.');
      return;
    }

    if (userData.password !== confirmPassword) {
      alert('As novas senhas não coincidem!');
      return;
    }
  }

  try {
    setModalLoading(true);
    
    if (isChangingPassword) {
      const credential = EmailAuthProvider.credential(
        user.email || '',
        currentPassword
      );
      
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, userData.password);
    }

    const userRef = doc(firestore, 'usuarios', user.uid);
    await updateDoc(userRef, {
      username: userData.username,
      email: userData.email,
    });

    setModalIsVisible(true);
    setTimeout(() => {
      router.push('MainScreen');
    }, 1500);
  } catch (error: any) {
    console.error('Erro ao salvar dados:', error);
    if (error.code === 'auth/wrong-password') {
      alert('Senha atual incorreta. Por favor, tente novamente.');
    } else if (error.code === 'auth/requires-recent-login') {
      alert('Por segurança, faça login novamente para alterar sua senha.');
    } else {
      alert('Erro ao salvar dados. Tente novamente.');
    }
  } finally {
    setModalLoading(false);
  }
};

  const handleCancel = () => {
    setModal2IsVisible(true);
  };

  if (loading) {
    return (
      <View style={[style.container, { justifyContent: 'center', alignItems: 'center' }]}>  
        <ActivityIndicator size="large" color="#006765" />
      </View>
    );
  }

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: height * 0.15 }}>
        <View style={style.firstPierce}>
          <Text style={style.title}>Editar Perfil</Text>
          <View style={style.viewIcon}>
            {userData.photoURL ? (
              <Image
                source={{ uri: userData.photoURL }}
                style={{
                  width: height * 0.04,
                  height: height * 0.04,
                  borderRadius: (height * 0.04) / 2,
                }}
              />
            ) : (
              <Image
                source={require("../../../../assets/UserProfileIcon.png")}
                style={{
                  width: height * 0.04,
                  height: height * 0.04,
                  borderRadius: (height * 0.04) / 2,
                }}
              />
            )}
          </View>
        </View>

        <View style={style.secondPierce}>
          <TouchableOpacity style={style.photoSection} onPress={pickAndUploadImage} activeOpacity={0.7}>
            {uploading ? (
              <ActivityIndicator size="large" color="#006765" />
            ) : userData.photoURL ? (
              <Image source={{ uri: userData.photoURL }} style={style.profileImage} />
            ) : (
              <Image source={require("../../../../assets/UserProfileIcon.png")} style={style.profileImage} />
            )}
            <Text style={style.editPhotoText}>Editar foto de usuário</Text>
          </TouchableOpacity>

          <TextInput
            style={style.inputText}
            label="Usuário"
            mode="outlined"
            value={userData.username}
            onChangeText={text => setUserData(prev => ({ ...prev, username: text }))}
            right={userData.username.length > 0 && (
              <TextInput.Icon
                icon="close-circle-outline"
                onPress={() => setUserData(prev => ({ ...prev, username: '' }))}
                color="#006765"
              />
            )}
            theme={inputTheme}
          />

          <TextInput
            style={style.inputText}
            label="E-mail"
            mode="outlined"
            value={userData.email}
            onChangeText={text => setUserData(prev => ({ ...prev, email: text }))}
            right={userData.email.length > 0 && (
              <TextInput.Icon
                icon="close-circle-outline"
                onPress={() => setUserData(prev => ({ ...prev, email: '' }))}
                color="#006765"
              />
            )}
            theme={inputTheme}
          />

          <TextInput
            style={style.inputText}
            label="Senha atual (para alterar senha)"
            mode="outlined"
            secureTextEntry={!currentPasswordVisible}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            right={
              <TextInput.Icon
                icon={currentPasswordVisible ? 'eye-off' : 'eye'}
                onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}
                color="#006765"
              />
            }
            theme={inputTheme}
          />

          <TextInput
            style={style.inputText}
            label="Nova senha"
            mode="outlined"
            secureTextEntry={!passwordVisible}
            value={userData.password}
            onChangeText={text => setUserData(prev => ({ ...prev, password: text }))}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye-off' : 'eye'}
                onPress={() => setPasswordVisible(!passwordVisible)}
                color="#006765"
              />
            }
            theme={inputTheme}
          />

          <TextInput
            style={style.inputText}
            label="Confirme nova senha"
            mode="outlined"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            right={
              <TextInput.Icon
                icon={confirmPasswordVisible ? 'eye-off' : 'eye'}
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                color="#006765"
              />
            }
            theme={inputTheme}
          />
        </View>
      </ScrollView>

      <View style={style.buttonContainer}>
        <TouchableOpacity style={style.saveButton} onPress={handleSave} disabled={modalLoading}>
          {modalLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={style.saveButtonText}>Salvar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={style.cancelButton} onPress={handleCancel} disabled={modalLoading}>
          <Text style={style.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        visible={modalIsVisible}
        title="Informações Editadas"
        message="Suas informações foram editadas com sucesso!"
        onClose={() => setModalIsVisible(false)}
        icon={"bookmark-check"}
        color={"#006462"}
      />
      <CustomConfirmModal
        visible={modal2IsVisible}
        title="Deseja Cancelar?"
        message="Suas alterações serão descartadas!"
        onClose={() => setModal2IsVisible(!modal2IsVisible)}
        icon={"bookmark-check"}
        color={"#006462"}
        onConfirm={() => {
          setModal2IsVisible(!modal2IsVisible)
          router.push('MainScreen')}}
      />
    </View>
  );
}

const inputTheme = {
  colors: {
    outline: '#D3D3D3',
    background: 'white',
    primary: '#006765',
  },
  roundness: 10,
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13D8B0',
  },
  firstPierce: {
    width: '100%',
    height: height * 0.08,
    backgroundColor: 'white',
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
    marginTop: height * 0.02,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.02,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#13D8B0',
    width: '45%',
    paddingVertical: height * 0.015,
    borderRadius: height * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: height * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: height * 0.02,
    color: '#13D8B0',
    fontWeight: 'bold',
  },
});