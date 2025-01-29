import { View, Image, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");

export default function ConectScreen() {
    return (
        <View style={style.container}>
            <View style={style.firstPierce}>
                <Text style={style.title}>Configurações de Conexão</Text>
            </View>
            <View style={style.secondPierce}>
                <View style={style.containerLoading}>
                    <Image source={require('../../../assets/LogoAzul.png')} style={style.imageLoading}/>
                    <ActivityIndicator
                    size={width*0.2}
                    color='#13D8B0'
                    style={style.loading}

                    />

                    

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
        justifyContent: "center",
        alignItems: "center",
        paddingTop: height * 0.03,
    },
    secondPierce: {
        flex:1,
        backgroundColor: "white",
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"


    },
    title:{
        fontWeight:"bold",
        color:"white",
        fontSize:width*0.05,
        margin:width*0.04,
    },
    containerLoading:{
        justifyContent:"center",
        alignItems:"center",
        

    },
    imageLoading:{
        width:width*0.1,
        height:width*0.1,
        resizeMode:"contain",
        position:"absolute",
        zIndex:1,

    },
    loading:{
        position:"absolute",
        zIndex:0,

    }

    
});
