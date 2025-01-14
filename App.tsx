import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TransitionScreenOne from './src/pages/TransitionScreenOne';
import TransitionScreenSecond from './src/pages/TransitionScreenSecond';
import TransitionScreenThird from './src/pages/TransitionScreenThird';
import LoginScreen from './src/pages/LoginScreen';

export default function App() {
  return (
    <View style = {styles.container}>
      <StatusBar/>
      <LoginScreen/>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
