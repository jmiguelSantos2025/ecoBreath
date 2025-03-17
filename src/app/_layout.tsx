import { Stack, useRouter } from "expo-router"; 
import { useEffect } from "react"; 

export default function Layout() { 
  const router = useRouter(); 

  useEffect(() => { 
    
    if (router) { 
      router.replace("/TransitionScreenOne"); 
    }
  }, [router]); 

  return (
    <Stack screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="TransitionScreenOne/index" /> 
      <Stack.Screen name="TransitionScreenThird/index" />
      <Stack.Screen name="LoginScreen/index" />
      <Stack.Screen name="NewUserScreen/index" />
      <Stack.Screen name="RescuePasswordSetEmail/index"/>
      <Stack.Screen name="PasswordRescueScreen/index"/>
      <Stack.Screen name="(tabs)"/>
    </Stack>
  );
}