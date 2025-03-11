import { Slot, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Linking from 'expo-linking';
import { useEffect } from "react";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const subscription = Linking.addEventListener('url', (event) => {
      const { path } = Linking.parse(event.url);
      if (path === '/reset-password') {
        router.navigate('/PasswordRescueScreen');
      }
    });

   
    Linking.getInitialURL().then((url) => {
      if (url) {
        const { path } = Linking.parse(url);
        if (path === '/reset-password') {
          router.navigate('/PasswordRescueScreen');
        }
      }
    });

   
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}