import React from 'react'
import { Stack } from 'expo-router'

export default function TransferLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        contentStyle: { backgroundColor: 'transparent' }
      }}
    >
      <Stack.Screen name="transfer-list" />
      <Stack.Screen name="transfer-new" />
      <Stack.Screen name="transfer-amount" />
      <Stack.Screen name="transfer-confirmation" />
    </Stack>
  )
}
