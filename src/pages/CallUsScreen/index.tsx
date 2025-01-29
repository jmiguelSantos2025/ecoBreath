import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import { Source } from '@mui/icons-material';
const { width, height } = Dimensions.get("window");
const altura = Dimensions.get("screen");
// -3.1341127922362193, -59.979204845909315


export default function CallUsScreen() {
    const fixedLocation = {
        latitude: -3.1341127922362193, 
        longitude: -59.979204845909315,
        latitudeDelta: 0.01, 
        longitudeDelta: 0.01,
    };

    return (
        <View style={style.container}>
            <View style={style.firstPierce}>
                <Image source={require("../../../assets/LogoBranca.png")} />
            </View>
            <View style={style.secondPierce}>
                <View style={style.viewIcon}>
                    <MaterialCommunityIcons name='phone' color={"white"} size={width * 0.2}
                    />
                </View>
                <View style={style.viewTitleText}>
                    <Text style={style.titleText}>Fale Conosco</Text>
                </View>
                <View style={style.containerData}>

                    <View style={style.iconContainer}>
                        <View style={style.iconData}>
                            <MaterialCommunityIcons name='email' size={width * 0.1} color={'#13D8B0'} />
                        </View>
                        <View style={style.viewData}>
                            <Text style={style.data}>projeto.ecobreath@gmail.com</Text>
                        </View>

                    </View>

                    <View style={style.iconContainer}>
                        <View style={style.iconData}>
                            <MaterialCommunityIcons name='phone' size={width * 0.1} color={'#13D8B0'} />
                        </View>
                        <View style={style.viewData}>
                            <Text style={style.data}>(92) 99508-6720</Text>
                        </View>

                    </View>

                    <View style={style.iconContainer}>
                        <View style={style.iconData}>
                            <MaterialCommunityIcons name='map-marker' size={width * 0.1} color={'#13D8B0'} />
                        </View>
                        <View style={style.viewData}>
                            <Text style={style.data}>Avenida Ministro Mário Andreazza, 916, Manaus, AM, 69075-840 </Text>
                        </View>

                    </View>
                </View>
                <View style={style.viewMap}>
                    <MapView style={style.map} initialRegion={fixedLocation}>
                        <Marker coordinate={fixedLocation} title='EcoBreath' image={require('../../../assets/LogoAzul.png')}style={{width:60,height:60,}} description='Avenida Ministro Mário Andreazza, 916, Manaus, AM, 69075-840' >
                            
                        </Marker>
                    </MapView>
                    

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
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",







    },
    viewIcon: {
        backgroundColor: "#13D8B0",
        borderRadius: width * 0.2,
        width: width * 0.3,
        height: width * 0.3,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: height * 0.025,
        marginTop: height * 0.3




    },
    viewTitleText: {
        marginBottom: height * 0.002,

    },
    titleText: {
        fontSize: width * 0.05,
        color: "#13C1CA",
        fontWeight: "bold",


    },
    containerData: {

        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginLeft: width * 0.06,
        marginRight: width * 0.06,
        paddingHorizontal: width * 0.04,
        padding: 1,



    },
    iconData: {
        marginRight: width * 0.02,
        paddingHorizontal: height * 0.005,


    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 3
    },
    viewData: {
        flexDirection: "row",


    },
    data: {
        textAlign: "left",
        color: "#0E9693",
        fontWeight: "bold",
        fontSize: width * 0.035,

    },

    viewMap: {
        width: width * 0.94,
        height: height * 0.25,
        marginTop: height * 0.02,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: "#006765",
        alignSelf: "center",
        marginBottom: height * 0.3,

    },
    map: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
        overflow: "hidden",

    },

});
