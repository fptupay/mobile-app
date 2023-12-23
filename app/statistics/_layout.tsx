import React from 'react'
import { Stack } from 'expo-router'

export default function StatisticsRoot() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        contentStyle: { backgroundColor: 'transparent' }
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[cash]" />
    </Stack>
  )
}
