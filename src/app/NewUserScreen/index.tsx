import {View,Image,StyleSheet,Dimensions,Text,ImageBackground,TouchableOpacity,
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { signUp } from "../../Components/authenticator";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function NewUserScreen() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const PressIcon = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async () => {
    if (password == confirm) {
      const result = await signUp(email, password);
      if (result.message) {
        alert(result.message);
        setEmail("");
        setConfirm("");
        setPassword("");
      } else {
        alert(result.message);
      }
    } else {
      alert("Você deve colocar senhas iguais");
    }
  };

  const Database = async () => {
    if (!email || !password) {
      alert("Preencha os campos antes de prosseguir");
      return;
    } else {
      await handleSignUp();
    }
  };

  return (
    <View style={style.container}>
      <View style={style.firstPierce}>
        <Image source={require("../../../assets/LogoBranca.png")} />
      </View>

      <View style={style.secondPierce}>
        <ImageBackground
          source={require("../../../assets/wave.png")}
          style={style.imageBackground}
        >
          <View style={style.contentContainer}>
            <Text style={style.text}>Cadastre uma conta</Text>

            <View>
              <TextInput
                style={style.inputText}
                onChangeText={(Text) => setUser(Text)}
                label={"Usuário"}
                mode="outlined"
                right={
                  <TextInput.Icon
                    icon={({ size, color }) => (
                      <MaterialCommunityIcons
                        name={
                          user == ""
                            ? "account-circle-outline"
                            : "account-circle"
                        }
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
              <TextInput
                style={style.inputText}
                label={"Senha"}
                onChangeText={(Text) => setPassword(Text)}
                mode="outlined"
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
                right={
                  <TextInput.Icon
                    icon={({ size, color }) => (
                      <MaterialCommunityIcons
                        name={
                          confirm == ""
                            ? "check-circle-outline"
                            : "check-circle"
                        }
                        size={size}
                        color="#006765"
                      />
                    )}
                  />
                }
                value={confirm}
                secureTextEntry={true}
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

            <View style={style.container2}>
              <View style={style.dividerContainer}>
                <View style={style.line} />
                <Text style={style.dividerText}>Conectar usando</Text>
                <View style={style.line} />
              </View>
              <View style={style.viewContainerIcon}>
                <View style={style.containerIconButton}>
                  <IconButton
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
                  />
                </View>
              </View>
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
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: width * 0.05,
  },
  text: {
    color: "#13C1CA",
    fontWeight: "bold",
    fontSize: height * 0.02,
  },
  inputText: {
    width: width * 0.65,
    height: height * 0.059,
    marginTop: 10,
  },
  layoutButton2: {
    width: width * 0.7,
    height: height * 0.08,
    borderRadius: 10,
    borderColor: "#07C3C3",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText2: {
    fontSize: 20,
    color: "#07C3C3",
    fontWeight: "bold",
  },
  
  viewButton2: {
    width: width * 0.7,
    height: height * 0.08,
    justifyContent: "center",
    marginTop: 40,
  },
  container2: {
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
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
});
