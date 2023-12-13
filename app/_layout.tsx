import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import React, { useEffect } from 'react'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'
export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#22c55e', backgroundColor: '#f0fdf4' }}
      text1Style={{ fontSize: 16, fontWeight: 'semibold' }}
      text2Style={{ fontSize: 14 }}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#ef4444', backgroundColor: '#fef2f2' }}
      text1Style={{ fontSize: 16, fontWeight: 'semibold' }}
      text2Style={{ fontSize: 14 }}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
    />
  )
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf')
  })
  const queryClient = new QueryClient()

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <Toast config={toastConfig} />
    </QueryClientProvider>
  )
}
