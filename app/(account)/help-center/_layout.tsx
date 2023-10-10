import { Tabs } from 'expo-router'
import React from 'react'

export default function HelpCenterLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display: 'none'
        }
      }}
    >
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="create-request" options={{ headerShown: false }} />
      <Tabs.Screen
        name="[id]"
        options={{
          headerShown: false
        }}
      />
      <Tabs.Screen name="successful-request" options={{ headerShown: false }} />
    </Tabs>
  )
}
