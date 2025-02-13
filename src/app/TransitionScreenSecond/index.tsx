import { View,Dimensions } from 'react-native';



const { width, height } = Dimensions.get("window");
export default function TransitionScreenSecond() {
 return (
   <View style = {{
    width: width,
    height: height,
    backgroundColor: '#13D8B0'}}>
    
   </View>
  );
}