import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export default function Layout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfFirstTime = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (!hasLaunched) {
          await AsyncStorage.setItem("hasLaunched", "true");
          router.replace("/TutorialScreen"); // ajuste para o caminho correto
        } else {
          router.replace("/TransitionScreenOne"); // caminho normal após login/tutorial
        }
      } catch (err) {
        console.error("Erro ao checar o primeiro acesso:", err);
        router.replace("/TransitionScreenOne"); // fallback seguro
      } finally {
        setLoading(false);
      }
    };

    checkIfFirstTime();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TransitionScreenOne/index" />
      <Stack.Screen name="TransitionScreenThird/index" />
      <Stack.Screen name="LoginScreen/index" />
      <Stack.Screen name="NewUserScreen/index" />
      <Stack.Screen name="RescuePasswordSetEmail/index" />
      <Stack.Screen name="PasswordRescueScreen/index" />
      <Stack.Screen name="TutorialScreen/index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
