import { Stack, router } from "expo-router";
import { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    router.replace("/TransitionScreenOne");
  }, []);

  return <Stack screenOptions={{headerShown:false}}/>;
}
