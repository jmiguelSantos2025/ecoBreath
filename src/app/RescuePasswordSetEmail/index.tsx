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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import CustomModal from "../../Components/CustomModal";

const { width, height } = Dimensions.get("window");
const auth = getAuth();

export default function RescuePasswordSetEmail() {
  const [email, setEmail] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modal2IsVisible, setModal2IsVisible] = useState(false);
  const [modal3IsVisible, setModal3IsVisible] = useState(false);

  const PressRescueEmail = async (email: string) => {
    if (email) {
      const resetLink =
        "https://ecobreathdatabase.firebaseapp.com/reset-password";
      try {
        await sendPasswordResetEmail(auth, email, {
          url: resetLink,
        });
        setModalIsVisible(!modalIsVisible);
        setEmail("");
      } catch (error) {
        setModal2IsVisible(!modal2IsVisible);
        const Error = error;
      }
    } else {
      setModal3IsVisible(!modal3IsVisible);
    }
  };

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { url } = event;
      if (url.includes("reset-password")) {
        router.push("ForgotPassword");
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => {
      subscription.remove();
    };
  }, [router]);

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
                <Text style={style.text}>Esqueceu a senha?</Text>

                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    width: "90%",
                  }}
                >
                  <Text style={style.text2}>
                    Enviamos um e-mail para que você confirme a recuperação de
                    senha
                  </Text>
                </View>

                <View>
                  <TextInput
                    style={style.inputText}
                    label={"E-mail"}
                    value={email}
                    mode="outlined"
                    onChangeText={(Text) => setEmail(Text)}
                    right={
                      <TextInput.Icon
                        icon={({ size, color }) => (
                          <MaterialCommunityIcons
                            name={email == "" ? "email-outline" : "email"}
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
                </View>

                <View style={style.viewButton2}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={style.layoutButton2}
                    onPress={() => PressRescueEmail(email)}
                  >
                    <Text style={style.buttonText2}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <CustomModal
              visible={modalIsVisible}
              title="Email Enviando!"
              message="Por favor, verifique seu email para recuperar sua senha."
              onClose={() => setModalIsVisible(false)}
              icon={"email-check"}
              color={"#006462"}
            />
            <CustomModal
              visible={modal2IsVisible}
              title="Algo deu errado :("
              message={
                "Tente novamente mais tarde!"
              }
              onClose={() => setModal2IsVisible(false)}
              icon={"error"}
              color={"#006462"}
            />
            <CustomModal
              visible={modal3IsVisible}
              title="Campos obrigatórios"
              message={
                "Por favor, preencha todos os campos para continuar."
              }
              onClose={() => setModal3IsVisible(false)}
              icon={"alert-outline"}
              color={"#006462"}
            />
          </View>
        </ScrollView>
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
  text2: {
    color: "#148886",
    fontSize: width * 0.035,
    textAlign: "center",
    marginTop: 25,
  },
  inputText: {
    width: width * 0.65,
    height: height * 0.059,
    marginTop: 10,
  },
  layoutButton2: {
    width: "100%",
    height: "40%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#07C3C3",
  },
  buttonText2: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  viewButton2: {
    marginTop: 40,
    width: width * 0.7,
    height: height * 0.18,
    justifyContent: "space-between",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
});
