import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { auth } from '../../../firebaseConfig';

const { width, height } = Dimensions.get("window");

export default function TransitionScreenThird() {
  const router = useRouter();
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const userLogado = onAuthStateChanged(auth,(user)=>{
      if(user){
        router.replace("MainScreen")
      }
      setLoading(false);
    });
    return userLogado;
  },[]);
  if(loading){
    return null;
  }
  



  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../../../assets/TelaTipo3New.png')}
        style={style.imageBackground}
        resizeMode="cover"
      >
        <View style={style.firstPierce}>
          <Image
            source={require('../../../assets/LogoAzul.png')}
            style={style.logo}
          />
          <Text style={style.welcomeText}>
            Bem Vindo!
          </Text>
          <Text style={style.subText}>
            Se prepare para explorar o ar mais puro.
          </Text>
        </View>

        <View style={style.secondPierce}>
          <TouchableOpacity
            style={style.button}
            onPress={() => router.push("/LoginScreen")}
          >
            <Text style={style.buttonText}>
              Vamos lá
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  firstPierce: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "5%",
  },
  logo: {
    width: width * 0.3,
    height: height * 0.2,
    resizeMode: "contain",
  },
  welcomeText: {
    color: "#08c4c2",
    fontWeight: "bold",
    fontSize: width * 0.05,
    marginTop: 10,
  },
  subText: {
    color: "#60c7ed",
    fontSize: width * 0.04,
    marginTop:10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  secondPierce: {
    width: "100%",
    height: "50%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.1, 
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
});