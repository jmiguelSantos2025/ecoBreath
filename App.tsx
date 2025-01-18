import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import TransitionScreenOne from './src/pages/TransitionScreenOne';
// import TransitionScreenSecond from './src/pages/TransitionScreenSecond';
// import TransitionScreenThird from './src/pages/TransitionScreenThird';
// import LoginScreen from './src/pages/LoginScreen';
// import NewUserScreen from './src/pages/NewUserScreen'
// import EmailRescueScreen from './src/pages/EmailRescueScreen';
import PasswordRescueScreen from './src/pages/PasswordRescueScreen' 
import ForgotPassword from './src/pages/ForgotPassword'
import ConfirmScreen from './src/pages/ConfirmScreen'
import MainScreen from './src/pages/MainScreen'
export default function App() {
  return (
    <View style = {styles.container}>
      <StatusBar/>
      <MainScreen/> 
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
