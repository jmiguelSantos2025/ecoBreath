import TransitionScreenOne from '../pages/TransitionScreenOne';
import TransitionScreenSecond from '../pages/TransitionScreenSecond';
import TransitionScreenThird from '../pages/TransitionScreenThird';
import LoginScreen from '../pages/LoginScreen/index';
import NewUserScreen from '../pages/NewUserScreen'
import EmailRescueScreen from '../pages/EmailRescueScreen';
import PasswordRescueScreen from '../pages/PasswordRescueScreen'
import ForgotPassword from '../pages/ForgotPassword'
import ConfirmScreen from '../pages/ConfirmScreen'
import MainScreen from '../pages/MainScreen'
import MonitoringScreen from '../pages/MonitoringScreen'
import PowerScreen from '../pages/PowerScreen'
import CallUsScreen from '../pages/CallUsScreen'
import ConfigScreen from '../pages/ConfigScreen';
import DropAccountScreen from '../pages/DropAccountScreen'
import PreferenciasScreen from '../pages/PreferenciasScreen';
import EditarUserScreen from '../pages/EditarUserScreen';
import ConectScreen from '../pages/ConectScreen';
import LoadingScreen from '../pages/LoadingScreen/index'
import OptionScreen from '../pages/OptionScreen';
import ErrorScreen from '../pages/ErrorScreen'
import ManutencionScreen from '../pages/ManutencionScreen';
import GraphicsScreenAirQuality from '../pages/GraphicsScreenAirQuality';
import NotificationScreen from '../pages/NotificationScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import FirstScreenToUseScreen from '../pages/FirstScreenToUseScreen';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='FirstScreenToUseScreen'>
                <Stack.Screen name='FirstScreenToUseScreen' component={FirstScreenToUseScreen} options={{headerShown:false}}/>
                <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false}}/>


            </Stack.Navigator>

        </NavigationContainer>
    );
}