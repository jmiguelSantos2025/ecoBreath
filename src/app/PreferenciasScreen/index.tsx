import { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, Switch, Alert, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import * as Notifications from 'expo-notifications';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { CustomConfirmModal } from '../../Components/CustomModal';

const { width, height } = Dimensions.get("window");
                      
export default function PreferenciasScreen() {
  const [isEnable, setIsEnable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const touchSwitch = async () => {
    const newValue = !isEnable;
    setIsEnable(newValue);

    if (newValue) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Você precisa permitir notificações nas configurações do sistema.'
        );
        setIsEnable(false);
      } else {
        console.log('Permissão concedida para notificações.');
      }
    } else {
      Alert.alert(
        'Notificações desativadas',
        'O app não pode remover permissões já concedidas. Para revogar totalmente, vá até as configurações do sistema.'
      );
      setIsEnable(true);
    }
  };

  const handleDeleteAccount = () => {
    setModalVisible(true);
  };

  const confirmDelete = () => {
    setModalVisible(false);
    router.replace('/LoginScreen'); 
  };

  return (
    <View style={style.container}>
      <IconButton
        icon="arrow-left"
        size={RFValue(26)}
        onPress={() => router.back()}
        iconColor="white"
        style={style.backButton} 
      />
      <View style={style.firstPierce}>
        <Image
          source={require("../../../assets/LogoAzul.png")}
          style={style.logo}
        />
      </View>

      <View style={style.secondPierce}>
        <View style={style.viewTitle}>
          <Text style={style.title}>Preferências de Usuário </Text>
        </View>

        <View style={style.viewImage}>
          <Image source={require('../../../assets/CogIcon.png')} style={style.image} />
        </View>

        <View style={style.ViewButton}>
         
          <View style={style.button}>
            <View style={style.viewIconButton}>
              <MaterialCommunityIcons name='bell' size={RFValue(20)} color='#fff' />
            </View>
            <View style={style.viewTitleButton}>
              <Text style={style.titleButton}>Ativar notificações</Text>
              <Text style={style.textButton}>Receba atualizações e alertas importantes</Text>
            </View>
            <Switch
              trackColor={{ false: '#84857E', true: '#13D8B0' }}
              thumbColor={isEnable ? "white" : "white"}
              onValueChange={touchSwitch}
              value={isEnable}
            />
          </View>

         
          <TouchableOpacity 
            style={[style.button]}
            onPress={handleDeleteAccount}
          >
            <View style={style.viewIconButton}>
              <MaterialCommunityIcons name='trash-can' size={RFValue(20)} color='#fff' />
            </View>
            <View style={style.viewTitleButton}>
              <Text style={style.titleButton}>Deslogar da conta</Text>
              <Text style={style.textButton}>Sua conexão com a maquina será perdida</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={RFValue(20)} color='#fff' />
          </TouchableOpacity>
        </View>
      </View>
      <CustomConfirmModal
              visible={modalVisible}
              title="Tem certeza?"
              message="Essa ação causará saida uma saida do aplicativo."
              onClose={() => setModalVisible(false)}
              onConfirm={confirmDelete}
              icon="alert-circle"
              color="#E53935"
            />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    position: 'absolute',
    top: RFPercentage(3),
    left: RFPercentage(2),
    zIndex: 10,
    backgroundColor: '#428F77',
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
    marginBottom: height * 0.1,
  },
  image: {
    width: RFValue(100),
    height: RFValue(100),
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: RFValue(15),
    padding: RFValue(20),
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: RFValue(15),
  },
  modalTitle: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: RFValue(10),
    textAlign: 'center',
  },
  modalText: {
    fontSize: RFValue(14),
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: RFValue(20),
    lineHeight: RFValue(20),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: RFValue(12),
    borderRadius: RFValue(8),
    alignItems: 'center',
    marginHorizontal: RFValue(5),
  },
  modalButtonText: {
    fontSize: RFValue(16),
    fontWeight: '600',
  },
});