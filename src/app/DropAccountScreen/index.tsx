import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { auth } from '../../../firebaseConfig';
import { deleteUser } from 'firebase/auth';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';

const { width, height } = Dimensions.get("window");

export default function ConfigScreen() {
    const onPressButton = async()=>{
    
    const user = auth.currentUser;
    if(user){
        Alert.alert(
            "Tem certeza?",
            "Essa ação é irreversivel. Sua conta será excluida permanentemente.",
            [
                {
                    text:"Cancelar",
                    style:"cancel"
                },
                {
                    text:"Sim, excluir",
                    style:"destructive",
                    onPress: async()=>{
                        try{
                           {/*Função de deletar o usuario do auth , Lembrar*/} await deleteUser(user);
                            alert("Conta excluida");

                        }catch(error){
                            if (error === "auth/requires-recent-login") {
                                Alert.alert(
                                  "Erro",
                                  "Por segurança, faça login novamente e tente excluir sua conta."
                                );
                              } else {
                                Alert.alert("Erro", "Não foi possível excluir sua conta.");
                              }
                        }
                    }
                }
            ]
        );
    }
}
    
  return (
    <View style={styles.container}>
        <IconButton
          icon="arrow-left"
          size={30}
          onPress={() => router.back()}
          iconColor="white"
          style={{ position: "absolute", top: 20, left: 20, zIndex: 10, backgroundColor: "#428F77" }}
        />
      <View style={styles.header}>
        <Image
          source={require("../../../assets/LogoAzul.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Configurações de Usuário</Text>

        <Image
          source={require('../../../assets/reciclyByn.png')}
          style={styles.image}
        />

        <Text style={styles.subtitle}>Deseja realmente sair da conta?</Text>

        <Text style={styles.description}>
          A saída acarretará na desconexão com a Máquina.
        </Text>

        <TouchableOpacity style={styles.button} onPress={onPressButton}>
          <Text style={styles.buttonText}>Sim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.05,
  },
  logo: {
    width: RFValue(110),
    resizeMode: "contain",
  },
  content: {
    flex: 0.75,
    backgroundColor: "#13D8B0",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    padding: width * 0.08,
  },
  title: {
    fontSize: width * 0.05,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: height * 0.03,
    textAlign: "center",
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: height * 0.04,
  },
  subtitle: {
    fontSize: width * 0.045,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: height * 0.01,
  },
  description: {
    fontSize: width * 0.035,
    color: "#fff",
    textAlign: "center",
    opacity: 0.9,
    marginBottom: height * 0.04,
  },
  button: {
    backgroundColor: "#0E9693",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.2,
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
    textAlign: "center",
  },
});
