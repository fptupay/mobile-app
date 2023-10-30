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
      <Stack.Screen name="register-pin" />
      <Stack.Screen name="smart-otp-confirmation" />
    </Stack>
  )
}
