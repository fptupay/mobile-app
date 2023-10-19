import { Stack } from 'expo-router'

export default function AuthenLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        contentStyle: { backgroundColor: 'transparent' }
      }}
    >
      <Stack.Screen name="common/otp" />
      <Stack.Screen name="common/phone-confirmation" />
      <Stack.Screen name="forget-password/forget-password" />
      <Stack.Screen name="forget-password/reset-password" />
      <Stack.Screen name="init/change-password" />
      <Stack.Screen name="init/ekyc/ekyc-rule" />
      <Stack.Screen name="init/ekyc/card-capture" />
      <Stack.Screen name="init/ekyc/face-authenticator" />
    </Stack>
  )
}
