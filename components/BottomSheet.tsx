import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MediumText, NormalText } from './Themed'

export default function BottomSheet({
  onPick
}: {
  onPick: (value: string) => void
}) {
  const timestamps = [
    'Tháng này',
    'Tháng trước',
    '3 tháng gần nhất',
    'Tùy chọn'
  ]
  return (
    <>
      <NormalText className="text-tertiary uppercase">
        Lọc theo khoảng
      </NormalText>
      {timestamps.map((timestamp, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPick(timestamp)}
          className="py-3 border-b border-gray-200"
          activeOpacity={0.8}
        >
          <MediumText>{timestamp}</MediumText>
        </TouchableOpacity>
      ))}
    </>
  )
}
