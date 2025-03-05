import { useRouter } from 'expo-router';

import { View, StyleSheet, Image, Text, Dimensions, ImageBackground } from 'react-native';


const { width, height } = Dimensions.get("window");
export default function TransitionScreenThird() {
  const router = useRouter();
  return (
    <View style={style.conteiner}>

      <View style={style.firstpierce}>

        <Image source={require('../../../assets/LogoAzul.png')} />
        <Text style={[{ color: "#08c4c2", fontWeight: "bold", fontSize: width * 0.05 }]}>
          Bem Vindo!
        </Text>
        <Text style={style.letter}>
          Se prepare para explorar o ar mais puro.
        </Text>
      </View>


      <View style={style.secondPierce}>
        <ImageBackground source={require("../../../assets/blueWave.png")}
          style={style.ImageBackground}
          resizeMode='cover'>
          <View style = {style.conteinerText}>
            <Text style={style.text} onPress={()=> router.push("/LoginScreen")}>
              Vamos lá
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const style = StyleSheet.create({

  conteiner: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",


  },
  firstpierce: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop:"5%",
  },
  secondPierce: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    resizeMode:"contain"


  },
  letter: {
    color: "#60c7ed",
    fontSize: width * 0.035,
    padding:10,


  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    
    
  },
  text:{
   color: "#fff",
   fontSize: width * 0.05,
   fontWeight: "bold",
},
conteinerText:{
  height:"50%",
  justifyContent:"flex-start",
  alignItems:"center"

}
  
});