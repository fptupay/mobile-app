import { Stack } from 'expo-router'

export default function ForgotPasswordLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        contentStyle: { backgroundColor: 'transparent' }
      }}
    >
      <Stack.Screen name="initial-verification" />
      <Stack.Screen name="otp-confirmation" />
      <Stack.Screen name="info-confirmation" />
      <Stack.Screen name="front-card-confirmation" />
      <Stack.Screen name="back-card-confirmation" />
      <Stack.Screen name="face-confirmation" />
      <Stack.Screen name="reset-password" />
    </Stack>
  )
}
