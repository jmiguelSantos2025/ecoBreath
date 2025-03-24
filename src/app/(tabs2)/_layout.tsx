import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#13D8B0',
        headerShown: false,
        tabBarLabel: () => null,
        tabBarInactiveTintColor: "#c1c1c1",
        tabBarItemStyle:{justifyContent:"center", alignItems:"center"}
      }}
    >
      <Tabs.Screen
        name="MainScreen/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="GraphicsScreenAirQuality/index"
        options={{
          title: "wifi",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wifi" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ConectScreen/index"
        options={{
          title: "wifi",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wifi" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="EditarUserScreen/index"
        options={{
          title: "Graphics",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={30} color={color} />
          ),

        }}
        
      />
    </Tabs>
  );
}