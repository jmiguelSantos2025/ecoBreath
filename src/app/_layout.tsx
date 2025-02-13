import { Stack, router } from "expo-router";
import { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    router.replace("/TransitionScreenThird");
  }, []);

  return <Stack screenOptions={{headerShown:false}}/>;
}
