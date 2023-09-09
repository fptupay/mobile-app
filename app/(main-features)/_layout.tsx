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
        <Stack.Screen name="load-money" options={{ headerShown: false }} />
        <Stack.Screen name="add-bank-item" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
