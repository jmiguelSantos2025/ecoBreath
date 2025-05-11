// import { loadPartialConfig } from '@babel/core';
// import { useState } from 'react';
// import { View, Image, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
// import { TouchableOpacity } from 'react-native';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const { width, height } = Dimensions.get("window");

// export default function ConectScreen() {
//     const [loading,setLoading] = useState(false);
//     return (
//         <View style={style.container}>
//             <View style={style.firstPierce}>
//                 <Text style={style.title}>Adicionar Produto</Text>
//             </View>
//             <View style={style.secondPierce}>
//                 {loading?(
//                     <ActivityIndicator size="large" color="#13D8B0" />
//                 ): (
//                     <ScrollView contentContainerStyle={{alignItems:'center'}}>
                        

//                     </ScrollView>
//                 )}
//                 <View style={style.viewTextCard}>
//                     <Text style={style.textCard}>EcoBreath 1.0 version</Text>
//                 </View>
//                 <View style={style.viewIconRight}>
//                     <MaterialCommunityIcons name='information' size={20} color='#08C5C1' style={style.iconRight}/>
//                     <Text style={style.textBottom}>Se o seu produto não estiver sendo exibido, tente recarregar a tela. Se o problema persistir, entre em contato conosco.</Text>
//                 </View>
//             </View>

//         </View>
//     );
// }

// const style = StyleSheet.create({
//     container: {
//         width: width,
//         height: height,
//         backgroundColor: "#13D8B0",
//         overflow: "hidden",

//     },
//     firstPierce: {
//         width: width,
//         justifyContent: "center",
//         alignItems: "center",
//         paddingTop: height * 0.03,
//     },
//     secondPierce: {
//         flex: 1,
//         backgroundColor: "white",
//         borderTopEndRadius: 30,
//         borderTopStartRadius: 30,
//         justifyContent: "flex-start",
//         alignItems: "center",
//         overflow: "hidden"


//     },
//     title: {
//         fontWeight: "bold",
//         color: "white",
//         fontSize: width * 0.05,
//         margin: width * 0.04,
//     },
//     viewTextCard: {
//         width: width * 0.8,
//         height: height * 0.08,
//         backgroundColor: "#13D8B0",
//         borderRadius: 10,
//         marginTop: width * 0.1,
//         justifyContent: "center",
//         alignItems: "center",


//     },
//     textCard: {
//         color: "white",
//         fontWeight: "bold",
//         fontSize: width * 0.04,
//     },
//     viewIconRight:{
//         marginRight:width*0.06,
//         marginLeft:width*0.06,
//         flexDirection:"row",
//         position:"absolute",
//         bottom:0,
        
        
        

//     },
//     textBottom:{
//         color:"#0E9693"

//     },
//     iconRight:{
//         marginRight:width*0.03,
        
//     }


// });
