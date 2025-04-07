import { View, Image, StyleSheet, Dimensions, Text, ImageBackground, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../../../firebaseConfig"; 
import CustomModal from '../../Components/CustomModal'
import { set } from "firebase/database";
const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [modalIsVisible,setModalIsVisible] = useState(false);
  const [modal2lIsVisible,setModal2IsVisible] = useState(false);
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      router.push("/MainScreen");
    } catch (error) {
      setModal2IsVisible(!modal2lIsVisible);
    }
  };

  const Database = async () => {
    if (!email || !password) {
      setModalIsVisible(!modalIsVisible);
      return;
    } else {
      await handleSignIn();
    }
  };

  const PressIconAction = () => {
    setIsVisible(!isVisible);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : -200}
    >
      <ImageBackground
        source={require("../../../assets/TelaFundoTipo1Novo.png")}
        style={style.imageBackground}
        resizeMode="cover"
      >
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
              source={require("../../../assets/LogoBranca.png")}
              style={style.logo}
            />
          </View>

          <View style={style.secondPierce}>
            <ScrollView contentContainerStyle={style.scrollViewContent}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={style.text}>Entre em sua conta</Text>

                <View>
                  <TextInput
                    style={style.inputText}
                    label={"E-mail"}
                    value={email}
                    mode="outlined"
                    underlineColorAndroid="transparent"
                    onChangeText={(Text) => setEmail(Text)}
                    right={
                      <TextInput.Icon
                        icon={({ size, color }) => (
                          <MaterialCommunityIcons
                            name={"email"}
                            size={size}
                            color="#006765"
                          />
                        )}
                      />
                    }
                    theme={{
                      colors: {
                        outline: "#D3D3D3",
                        background: "white",
                        primary: "#006765",
                      },
                      roundness: 10,
                    }}
                  />
                  <TextInput
                    style={style.inputText}
                    label={"Senha"}
                    mode="outlined"
                    value={password}
                    underlineColorAndroid="transparent"
                    right={
                      <TextInput.Icon
                        icon={({ size, color }) => (
                          <MaterialCommunityIcons
                            name={isVisible ? "eye-off" : "eye"}
                            size={size}
                            color="#006765"
                            onPress={PressIconAction}
                          />
                        )}
                      />
                    }
                    onChangeText={(Text) => setPassword(Text)}
                    secureTextEntry={isVisible}
                    theme={{
                      colors: {
                        outline: "#D3D3D3",
                        background: "white",
                        primary: "#006765",
                      },
                      roundness: 10,
                    }}
                  />
                </View>
                <View style={style.viewText}>
                  <Text
                    onPress={() => router.push("/RescuePasswordSetEmail")}
                    style={{
                      color: "#006765",
                      fontWeight: "bold",
                      textDecorationLine: "underline",
                      alignSelf: "flex-end",
                    }}
                  >
                    Esqueci minha senha
                  </Text>
                </View>

                <View style={style.viewButton}>
                  <TouchableOpacity
                  delayPressIn={0}
                    activeOpacity={0.6}
                    style={style.layoutButton1}
                    onPress={Database}
                  >
                    <Text style={style.buttonText1}>Entrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={style.layoutButton2}
                    onPress={() => router.push("/NewUserScreen")}
                  >
                    <Text style={style.buttonText2}>Cadastrar</Text>
                  </TouchableOpacity>
                </View>

                <View style={style.container2}>
                  <View style={style.dividerContainer}>
                    <View style={style.line} />
                    <Text style={style.dividerText}>Conectar usando</Text>
                    <View style={style.line} />
                  </View>

                  <View style={style.viewContainerIcon}>
                    <View style={style.containerIconButton}>
                      <IconButton
                        onPress={() => alert('Ainda em processo de desenvolvimento')}
                        icon="google"
                        size={24}
                        style={style.iconButton}
                        iconColor="white"
                      />
                    </View>
                    <View style={style.containerIconButton}>
                      <IconButton
                        icon="facebook"
                        size={24}
                        style={style.iconButton}
                        iconColor="white"
                        onPress={()=>alert("Ainda em processo de desenvolvimento ")}
                      />
                    </View>
      
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          <CustomModal
          visible={modalIsVisible}
          title="Campos obrigatórios"
          message="Por favor, preencha todos os campos para continuar."
          onClose={() => setModalIsVisible(false)}
          icon={"alert-outline"}
          color={"#006462"}
        />
        <CustomModal
          visible={modal2lIsVisible}
          title="Login ou usuário incorreto"
          message="Por favor, preencha os campos de acordo com o usuário cadastrado!"
          onClose={() => setModal2IsVisible(false)}
          icon={"alert-outline"}
          color={"#006462"}
        />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
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
    height: "85%",
    overflow: "hidden",
  },
  logo: {
    width: width * 0.3,
    height: height * 0.3,
    resizeMode: "contain",
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
    fontSize: Platform.OS == "web" ? height * 0.023 : RFValue(20),
  },
  inputText: {
    width: width * 0.65,
    height: height * 0.059,
    marginTop: 20,
  },
  layoutButton1: {
    width: "100%",
    height: "40%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#07C3C3",
  },
  layoutButton2: {
    width: "100%",
    height: "40%",
    borderRadius: 10,
    borderColor: "#07C3C3",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonText1: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  buttonText2: {
    fontSize: 20,
    color: "#07C3C3",
    fontWeight: "bold",
  },
  viewButton: {
    width: width * 0.7,
    height: height * 0.18,
    justifyContent: "space-between",
  },
  viewText: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: width * 0.65,
    margin: 25,
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
    flexDirection: "row",
    gap: 10,
    marginBottom: height * 0.01,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
});