import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#13D8B0',
        headerShown: false,
        tabBarLabel: () => null,
        tabBarInactiveTintColor: "blue",
      }}
    >
      <Tabs.Screen
        name="MainScreen/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="home" size={48} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ConectScreen/index"
        options={{
          title: "wifi",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="link" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="EditarUserScreen/index"
        options={{
          title: "Graphics",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-bar" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}