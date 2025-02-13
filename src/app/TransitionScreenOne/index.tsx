import { View,Image, StyleSheet,Dimensions  } from 'react-native';
import react from "react";

const { width, height } = Dimensions.get("window");
export default function TransitionScreenOne() {
    return (
        <View style = {style.fullScreen}>
            <View style = {style.conteiner}>
                <Image source={require("../../../assets/LogoBranca.png")} style={style.image} />
                
            </View>
        </View>
    );
}
const style = StyleSheet.create({
    image:{
        width: width*0.4,
        height: width*0.3,

    },
    conteiner:{
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:"#13D8B0",
        padding: width*0.15,
        borderRadius: width*0.3,

    },
    fullScreen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    }


});