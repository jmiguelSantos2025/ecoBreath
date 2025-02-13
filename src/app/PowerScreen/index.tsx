import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");

export default function PowerScreen() {
    return (
        <View style={style.container}>
            <View style={style.firstPierce}>
                <Image source={require("../../../assets/LogoBranca.png")} />
            </View>
            <View style={style.secondPierce}>
                <View style={style.viewIcon}>
                    <MaterialCommunityIcons name='power' color={"white"} size={width*0.25}
                    />
                </View>
                <View style={style.viewTitleText}>
                    <Text style={style.titleText}>Deseja Desligar/Ligar?</Text>
                </View>
                <View style={style.viewText}>
                    <Text style={style.text}>Clique em <Text style={{fontWeight:"bold"}}>SIM </Text> caso deseje desligar/ligar a máquina.</Text>
                </View>
                <View style={style.viewButton}>
                    <TouchableOpacity style={style.button} >
                        <Text style={{fontWeight:"bold", fontSize:width*0.05, color:"white"}}>Sim</Text>
                    </TouchableOpacity>
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
        height: "27%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: height * 0.03,
    },
    secondPierce: {
        width: "100%",
        height: "80%",
        backgroundColor: "white",
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        justifyContent:"center",
        alignItems:"center",
        overflow:"hidden"


    },
    viewIcon:{
        backgroundColor: "#13D8B0",
        borderRadius: width * 0.2,
        width: width * 0.3, 
        height: width * 0.3, 
        justifyContent: "center", 
        alignItems: "center", 
        marginBottom: height * 0.06, 



        
    },
    viewTitleText:{
        marginBottom:height*0.03,

    },
    titleText:{
        fontSize: width*0.05,
        color:"#13C1CA",
        fontWeight:"bold",


    },
    viewText:{
        marginBottom:40,
        flexDirection:"row",
        textAlign:"center"
    },
    text:{
        fontSize:width*0.032,
        color:"#0E9693",

    },
    viewButton:{
        overflow:"hidden",
        marginBottom:height*0.1,

        

    },
    button:{
        borderWidth:2,
        borderColor:"#08C5C1",
        paddingVertical: height*0.028,
        paddingHorizontal: width*0.32,
        borderRadius: width*0.05,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#08C5C1"


    }


});
