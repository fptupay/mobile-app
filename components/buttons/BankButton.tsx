import React from 'react'
import { TextInput, View, Image, ImageSourcePropType } from 'react-native'
import { NormalText, SemiText } from '../Themed'

interface BankButtonProps extends React.ComponentProps<typeof TextInput> {
  image: ImageSourcePropType
  label: string
  description?: string | null
}

export default function BankButton(props: BankButtonProps) {
  const { image, label, description, style, ...otherProps } = props

  return (
    <View
      {...otherProps}
      style={style}
      className="p-4 rounded-lg flex flex-row items-center justify-between border border-gray-300 mt-4"
    >
      <View className="flex flex-row gap-3 items-center">
        <Image source={image} className="w-[40px] h-[32px]" />
        <View className="pl-3">
          <SemiText className="text-secondary">{label}</SemiText>
          <NormalText className="text-tertiary">{description}</NormalText>
        </View>
      </View>
    </View>
  )
}
