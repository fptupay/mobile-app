import { Stack } from 'expo-router'

export default function SmartOTPLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        contentStyle: { backgroundColor: 'transparent' }
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="introduction" />
      <Stack.Screen name="old-pin" />
      <Stack.Screen name="new-pin" />
      <Stack.Screen name="change-confirmation" />
      <Stack.Screen name="register-pin" />
      <Stack.Screen name="smart-otp-confirmation" />
    </Stack>
  )
}
