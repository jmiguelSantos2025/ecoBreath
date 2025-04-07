import React , {useState} from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal, { CustomConfirmModal } from '../../Components/CustomModal';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { ref, set } from 'firebase/database';
import { database } from '../../../firebaseConfig';

const {height, width} = Dimensions.get("window");
export default function PowerScreen() {
    const [modalIsVisible,setModalIsVisible] =useState(false);
    const [isPower,setIsPower] = useState(false);
    function handleButton(){
        setModalIsVisible(!modalIsVisible);
        
    }
    function handleConfirm(){
        const newPowerState = !isPower;
        setIsPower(newPowerState);
        const dbRef = ref(database, "conexão/Ligado");
        set( dbRef, newPowerState).then(()=>{
        console.log("Valor atualizado");}).catch((error)=>{
            console.error("Error", error);
        });


        setModalIsVisible(false);
    }
    function handleCancel(){
        setModalIsVisible(false);
    }
  return (
    <SafeAreaView style={styles.container}>
        <IconButton
                            icon="arrow-left"
                            size={30}
                            onPress={() => router.back()}
                            iconColor="white"
                            style={{ position: "absolute", top: 20, left: 20, zIndex: 10, backgroundColor: "#428F77" }}
                        />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/LogoBranca.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      
      <View style={styles.card}>
        
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons name="power" size={70} color="white" />
        </View>

        <Text style={styles.title}>Deseja Desligar/Ligar?</Text>


        <Text style={styles.description}>
          Clique em <Text style={styles.bold}>SIM</Text> caso deseje desligar/ligar a máquina.
        </Text>

        
        <TouchableOpacity style={styles.button} onPress={handleButton}>
          <Text style={styles.buttonText}>Sim</Text>
        </TouchableOpacity>
        <CustomConfirmModal
          visible={modalIsVisible}
          title="Confirmar ação"
          message="Você tem certeza que deseja desligar/ligar a máquina?"
          icon="alert-outline"
          color="#006462"
          onConfirm={handleConfirm}
          onClose={handleCancel}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13D8B0',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: "12%",
    backgroundColor: '#13D8B0',
  },
  logo: {
    width: '60%',
    height: undefined,
    aspectRatio: 2.5,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 30,
    
  },
  iconWrapper: {
    backgroundColor: '#13D8B0',
    borderRadius: 500,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height*0.1,
  },
  title: {
    fontSize: 20,
    color: '#13C1CA',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#0E9693',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    // backgroundColor: '#08C5C1',
    // paddingVertical: 15,
    // width:"70%",
    // borderRadius: 15,
    // borderWidth: 2,
    // borderColor: '#08C5C1',
    // justifyContent:"center",
    // alignItems:"center"
    width: "80%",
    height: "12%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#07C3C3",
  },
  buttonText: {
    color: 'white',
    fontSize: RFValue(15),
    fontWeight: 'bold',
  },
});
