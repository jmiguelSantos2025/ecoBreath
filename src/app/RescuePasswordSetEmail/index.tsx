import { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions, Text, ImageBackground, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import * as Linking from 'expo-linking';
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");
const auth = getAuth();
// Tela está de standBy
export default function RescuePasswordSetEmail() {
  const [email, setEmail] = useState("");

  const PressRescueEmail = async (email: string) => {
    const resetLink = "https://ecobreathdatabase.firebaseapp.com/reset-password";
    try {
      await sendPasswordResetEmail(auth, email, {
        url: resetLink,
      });
      alert("Um email de redefinição de senha foi enviado para " + email);
      setEmail("");
    } catch (error) {
      alert("Erro na redefinição de senha: " + error);
    }
  };

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { url } = event;
      if (url.includes('reset-password')) {
        router.push('ForgotPassword');
      }
    };

    
    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => {
      subscription.remove();
    };
  }, [router]);

  return (
    <View style={style.container}>
      <View style={style.firstPierce}>
        <Image
          source={require("../../../assets/LogoBranca.png")}
          style={{ justifyContent: "center", alignItems: "center" }}
        />
      </View>

      <View style={style.secondPierce}>
        <ImageBackground
          source={require("../../../assets/wave.png")}
          style={style.imageBackground}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={style.text}>Esqueceu a senha?</Text>

            <View style={{ flexDirection: "row", marginBottom: 10, width: "90%" }}>
              <Text style={style.text2}>
                Enviamos um e-mail para que você confirme a recuperação de senha
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
            <View style={style.viewButton}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={style.layoutButton1}
                onPress={() => PressRescueEmail(email)}
              >
                <Text style={style.buttonText1}>Enviar</Text>
              </TouchableOpacity>
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
    height: "85%",
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
  text2: {
    color: "#148886",
    fontSize: width * 0.035,
    textAlign: "center",
    marginTop: 25,
  },
  inputText: {
    width: width * 0.65,
    height: height * 0.059,
    marginTop: 30,
  },
  layoutButton1: {
    width: width * 0.7,
    height: height * 0.08,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#07C3C3",
    marginTop: 50,
  },
  buttonText1: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  viewButton: {
    width: width * 0.7,
    height: height * 0.18,
    justifyContent: "center",
  },
});