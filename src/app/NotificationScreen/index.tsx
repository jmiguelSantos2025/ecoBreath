import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Path } from 'react-native-svg';
const { width, height } = Dimensions.get("window");

export default function MonitoringScreen() {
    return (
        <View style={style.container}>
            <View style={style.firstPierce}>
                <Image source={require("../../../assets/LogoAzul.png")} style={{ marginBottom: 10, }} />
            </View>

            <View style={style.secondPierce}>
                <ImageBackground source={require('../../../assets/blueWave.png')}
                    style={style.imageBackground}
                >
                    <View style={style.viewNotification}>
                        <View style={style.viewIcon}>
                            <Image source={require('../../../assets/NoticeDanger.png')} style={style.image}/>
                        </View>
                        <View style={style.viewTextTitle}>
                            <Text style={style.title}>Perigo: Gases Tóxicos</Text>
                        </View>
                        <View style={style.viewText}>
                            <Text style={style.text}>Os níveis de gases tóxicos estão perigosamente altos.</Text>
                               <Text style={style.text} >Evite a área.</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: "white",
        overflow: "hidden",
    },
    firstPierce: {
        width: width,
        height: "23%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: height * 0.03,
    },
    secondPierce: {
        width: "100%",
        height: "100%",
        justifyContent:"center",
        alignItems:"center"
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    viewNotification:{
        width:width*0.7,
        height:height*0.3,
        backgroundColor:"white",
        borderRadius:"10%",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:height*0.2,
        shadowColor:"black",

        shadowOpacity:0.8,
        elevation:6

    },
    viewIcon:{
        marginBottom:10,

    },
    image:{
        width:width*0.2,
        height:height*0.1,
        resizeMode:"contain",

    },
    viewTextTitle:{
        marginBottom:10,

    },
    title:{
        color:"black",
        fontWeight:"bold",
        fontSize: width*0.04,
    },
    viewText:{
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        textAlign:"center",
        fontSize:width*0.03
    }

    

    

});
