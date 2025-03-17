import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");

export default function ConectScreen() {
    return (
        <View style={style.container}>
            <View style={style.firstPierce}>
                <Image source={require("../../../../assets/LogoBranca.png")} style={{resizeMode:"contain", width:110,}} />
            </View>
            <View style={style.secondPierce}>
                <View style={style.viewIcon}>
                    <MaterialCommunityIcons name='wifi' color={"white"} size={width * 0.21}
                    />
                </View>
                <View style={style.viewTitleText}>
                    <Text style={style.titleText}>Configurações de Conexão</Text>
                </View>

                <View style={{justifyContent:"center",padding:1
                }}>

                    <View style={style.viewText}>
                        <View style={style.viewIconRight}>
                            <Text style={style.iconRight}>1</Text>
                        </View>
                        <View >
                            <Text style={style.text}><Text style={{ fontWeight: "bold" }}>Ligue a maquina</Text></Text>
                        </View>
                    </View>
                    <View style={style.viewText}>
                        <View style={style.viewIconRight}>
                            <Text style={style.iconRight}>2</Text>
                        </View>
                        <View>
                            <Text style={style.text}>Aceite as permissões na tela do produto e do aplicativo</Text>
                        </View>
                    </View>
                    <View style={style.viewText}>
                        <View style={style.viewIconRight}>
                            <Text style={style.iconRight}>3</Text>
                        </View>
                        <View>
                            <Text style={style.text}>Ative o <Text style={{ fontWeight: "bold" }}>Bluetooth </Text>da máquina e do aparelho</Text>
                        </View>
                    </View>

                </View>

                <View style={style.viewButton}>
                    <TouchableOpacity style={style.button} >
                        <Text style={{ fontWeight: "bold", fontSize: width * 0.05, color: "white" }}>Sim</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#13D8B0",
        overflow: "hidden",

    },
    firstPierce: {
        width: "100%",
        height: "23%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: height * 0.01,
    },
    secondPierce: {
        width: "100%",
        height: "85%",
        backgroundColor: "white",
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"


    },
    viewIcon: {
        backgroundColor: "#13D8B0",
        borderRadius: width * 0.05,
        width: width * 0.3,
        height: width * 0.3,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: height * 0.06,




    },
    viewTitleText: {
        marginBottom: height * 0.03,

    },
    titleText: {
        fontSize: width * 0.05,
        color: "#13C1CA",
        fontWeight: "bold",


    },
    viewText: {
        marginBottom: 30,
        flexDirection: "row",
        textAlign: "center",
        justifyContent:"flex-start",
        alignItems:"center",
        paddingHorizontal:width*0.06,
        

    },
    text: {
        fontSize: width * 0.032,
        color: "#0E9693",
        flexShrink:1,
        
        

    },
    viewIconRight:{
        marginRight:width*0.03,
        marginLeft:width*0.05,
        
        

    },
    iconRight:{
        width:width*0.05,
        backgroundColor:"#13C1CA",
        color:"#fff",
        textAlign:"center",
        borderRadius:width*0.04,
        fontWeight:"bold",
        
    },
    viewButton: {
        overflow: "hidden",
        marginBottom: height * 0.1,



    },
    button: {
        borderWidth: 2,
        borderColor: "#08C5C1",
        paddingVertical: height * 0.025,
        paddingHorizontal: width * 0.32,
        borderRadius: width * 0.05,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#08C5C1"


    }


});
