import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="ekyc-rule" options={{ headerShown: false }} />
        <Stack.Screen name="[type]" options={{ headerShown: false }} />
        <Stack.Screen
          name="face-authenticator"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="phone-confirmation"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="forget-password" options={{ headerShown: false }} />
        <Stack.Screen name="reset-password" options={{ headerShown: false }} />
        <Stack.Screen name="otp" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
