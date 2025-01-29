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
import NewUserScreen from './src/pages/NewUserScreen'
import MonitoringScreen from './src/pages/MonitoringScreen'
// import ExemploScreen from './src/pages/ExemploScreen'
import PowerScreen from '././src/pages/PowerScreen'
import CallUsScreen from '././src/pages/CallUsScreen'
import ConfigScreen from './src/pages/ConfigScreen';
import DropAccountScreen from './src/pages/DropAccountScreen'
import PreferenciasScreen from './src/pages/PreferenciasScreen';
import EditarUserScreen from './src/pages/EditarUserScreen';
import ConectScreen from './src/pages/ConectScreen';
import LoadingScreen from './src/pages/LoadingScreen'
import OptionScreen from './src/pages/OptionScreen';
import ErrorScreen from './src/pages/ErrorScreen'
import ManutencionScreen from './src/pages/ManutencionScreen';
import GraphicsScreenAirQuality from './src/pages/GraphicsScreenAirQuality';
import NotificationScreen from './src/pages/NotificationScreen';
export default function App() {
  return (
    <View style = {styles.container}>
      <StatusBar/>
      <NotificationScreen/> 
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:"flex-start"
  },
});
