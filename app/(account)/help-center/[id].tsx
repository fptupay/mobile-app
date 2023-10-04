import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>RequestDetailScreen: {id}</Text>
    </View>
  )
}
