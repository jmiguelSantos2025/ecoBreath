import { View, Image, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");

export default function ManutencionScreen() {
    return (
        <View style={style.container}>
            <View style={style.firstPierce}>
                
            </View>
            <View style={style.secondPierce}>
                <View>
                    <Image source={require('../../../assets/iconManutencionScreen2.png')} style={style.image}/>
                </View>
                <View style={style.viewText}>
                    <Text style={style.text}>Estamos realizando uma manutenção!</Text>
                    <Text style={style.text}>Por favor, volte mais tarde</Text>
                </View>
                
            </View>

        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: "#13D8B0",
        overflow: "hidden",

    },
    firstPierce: {
        width: width,
        height:height*0.14,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: height * 0.03,
    },
    secondPierce: {
        flex: 1,
        backgroundColor: "white",
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"


    },
    image:{
        width:width*0.4,
        height:height*0.2,
        resizeMode:"contain",

    },
    viewText:{
        justifyContent:"center",
        alignItems:"center",
        margin:width*0.1,
    },
    text:{
        color:"#0E9693",
        textAlign:"center",
        fontWeight:"bold",
        fontSize:width*0.04,
        
    }
    

    


});
