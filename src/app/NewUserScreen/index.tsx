import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { signUp } from "../../Components/authenticator";
import { router } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import CustomModal from "../../Components/CustomModal";
const { width, height } = Dimensions.get("window");

export default function NewUserScreen() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modal2IsVisible, setModal2IsVisible] = useState(false);
  const [modal3IsVisible, setModal3IsVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalPasswordSmall, setModalPasswordSmall] = useState(false);
  const [modalEmailIncorrect, setModalEmailIncorrect] = useState(false);
  const [modalError, setModalError] = useState(false);
  const PressIcon = () => {
    setPasswordVisible(!passwordVisible);
  };
  const PressIconConfirm = () => {
    setConfirmPassword(!confirmPassword);
  };

  const handleSignUp = async () => {
    if (password == confirm) {
      setModalLoading(true);

      const result = await signUp(email, password, user);
      setModalLoading(false);
      const error = result.error;
      if (result.sucess) {
        setEmail("");
        setConfirm("");
        setPassword("");
        setUser("");
        setModal3IsVisible(!modal3IsVisible);
      } else {
        setEmail("");
        setConfirm("");
        setPassword("");
        setUser("");
        setModalLoading(false);
        console.log(error);
        if (error === "auth/invalid-email") {
          setModalEmailIncorrect(true);
        } else {
          console.log("Error: " + error);
          setModalError(true);
        }
      }

      setModalLoading(false);
    } else {
      setModal2IsVisible(!modal2IsVisible);
    }
  };

  const Database = async () => {
    if (!email || !password || !user || !confirm) {
      setModalIsVisible(!modalIsVisible);
      return;
    } else {
      if (password.length >= 6) {
        await handleSignUp();
      } else {
        setModalPasswordSmall(true);
      }
    }
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
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
          <ScrollView
            contentContainerStyle={style.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={style.container}>
              <IconButton
                icon="arrow-left"
                size={30}
                onPress={() => router.back()}
                iconColor="white"
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  zIndex: 10,
                  backgroundColor: "#428F77",
                }}
              />
              <View style={style.firstPierce}>
                <Image
                  source={require("../../../assets/LogoBranca.png")}
                  style={style.logo}
                />
              </View>

              <View style={style.secondPierce}>
                <View style={style.contentContainer}>
                  <Text style={style.text}>Cadastre uma conta</Text>

                  <View>
                    <TextInput
                      style={style.inputText}
                      onChangeText={(Text) => setUser(Text)}
                      label={"Usuário"}
                      mode="outlined"
                      underlineColorAndroid="transparent"
                      right={
                        <TextInput.Icon
                          icon={({ size, color }) => (
                            <MaterialCommunityIcons
                              name={"account-circle"}
                              size={size}
                              color="#006765"
                            />
                          )}
                        />
                      }
                      value={user}
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
                      onChangeText={(Text) => setEmail(Text)}
                      value={email}
                      label={"E-mail"}
                      mode="outlined"
                      underlineColorAndroid="transparent"
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
                      onChangeText={(Text) => setPassword(Text)}
                      mode="outlined"
                      underlineColorAndroid="transparent"
                      right={
                        <TextInput.Icon
                          icon={({ size, color }) => (
                            <MaterialCommunityIcons
                              name={passwordVisible ? "eye-off" : "eye"}
                              size={size}
                              color="#006765"
                              onPress={PressIcon}
                            />
                          )}
                        />
                      }
                      value={password}
                      secureTextEntry={passwordVisible}
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
                      label={"Confirme sua senha"}
                      onChangeText={(Text) => setConfirm(Text)}
                      mode="outlined"
                      underlineColorAndroid="transparent"
                      right={
                        <TextInput.Icon
                          icon={({ size, color }) => (
                            <MaterialCommunityIcons
                              name={
                                confirmPassword
                                  ? "check-circle"
                                  : "check-circle-outline"
                              }
                              onPress={PressIconConfirm}
                              size={size}
                              color="#006765"
                            />
                          )}
                        />
                      }
                      value={confirm}
                      secureTextEntry={confirmPassword}
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

                  <View style={style.viewButton2}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={style.layoutButton2}
                      onPress={Database}
                    >
                      <Text style={style.buttonText2}>Cadastrar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
                visible={modal2IsVisible}
                title="Senhas Diferentes"
                message="Você deve colocar senhas iguais!"
                onClose={() => setModal2IsVisible(false)}
                icon={"lock-off"}
                color={"#006462"}
              />
              <CustomModal
                visible={modal3IsVisible}
                title="Cadastro Realizado com Sucesso!"
                message="Você realizou o cadastro com sucesso!"
                onClose={() => {
                  setModal3IsVisible(false);
                  router.push("LoginScreen");
                }}
                icon={"account-circle"}
                color={"#006462"}
              />
              <CustomModal
                visible={modalLoading}
                title="Carregando....."
                message="Por favor, aguarde enquanto criamos seu usuário"
                onClose={() => null}
                icon={"loading"}
                color={"#006462"}
              />
              <CustomModal
                visible={modalPasswordSmall}
                title="Senha menor que 6 digitos"
                message="Por favor, digite sua senha com mais de 6 digitos"
                onClose={() => setModalPasswordSmall(false)}
                icon={"close-thick"}
                color={"#006462"}
              />
              <CustomModal
                visible={modalEmailIncorrect}
                title="Digite um Email Válido"
                message="Por favor, digite um email válido"
                onClose={() => setModalEmailIncorrect(false)}
                icon={"comment-account-outline"}
                color={"#006462"}
              />
              <CustomModal
                visible={modalError}
                title="Error"
                message="Por favor, Estamos com problemas no momento , tente novamente!"
                onClose={() => setModalError(false)}
                icon={"cloud-alert"}
                color={"#006462"}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </ScrollView>
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
    height: "77%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: width * 0.3,
    height: height * 0.3,
    resizeMode: "contain",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: width * 0.05,
  },
  text: {
    color: "#13C1CA",
    fontWeight: "bold",
    fontSize: Platform.OS == "web" ? height * 0.023 : RFValue(20),
  },
  inputText: {
    width: width * 0.65,
    height: height * 0.059,
    marginTop: 10,
  },
  layoutButton2: {
    width: width * 0.65,
    height: height * 0.07,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#07C3C3",
  },
  buttonText2: {
    fontSize: RFValue(16),
    color: "white",
    fontWeight: "bold",
  },
  viewButton2: {
    marginTop: height * 0.03,
    width: "100%",
    alignItems: "center",
  },
  container2: {
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: height * 0.03,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
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
  viewContainerIcon: {
    flexDirection: "row",
    gap: 10,
  },
  containerIconButton: {
    backgroundColor: "#006765",
    borderRadius: 50,
    padding: 5,
  },
  iconButton: {
    borderRadius: 25,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: height * 0.02,
  },
});
