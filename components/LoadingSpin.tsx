import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import Colors from '@/constants/Colors'
import { NormalText } from './Themed'

export default function LoadingSpin() {
  return (
    <View className="flex flex-col mt-8 space-y-2 items-center">
      <ActivityIndicator color={Colors.tertiary} />
      <NormalText className="text-tertiary">Đang tải dữ liệu</NormalText>
    </View>
  )
}
