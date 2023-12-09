import { useBankStore } from '@/stores/bankStore'
import React from 'react'
import { ImageSourcePropType, TextInput, View } from 'react-native'
import { Image } from 'expo-image'
import { NormalText, SemiText } from './Themed'
import { blurHash } from '@/constants/Hash'

interface SelectFieldProps extends React.ComponentProps<typeof TextInput> {
  image: ImageSourcePropType
  id: string
  label: string
  description?: string | null
}

export default function SelectField(props: SelectFieldProps) {
  const { image, id, label, description, style, ...otherProps } = props
  const selectedBank = useBankStore((state) => state.selectedBank)

  return (
    <View
      {...otherProps}
      style={style}
      className={`px-4 py-2 rounded-lg flex flex-row items-center justify-between border ${
        selectedBank == id ? 'border-primary' : 'border-gray-300'
      }`}
    >
      <View className="flex flex-row gap-3 items-center">
        <Image
          contentFit="contain"
          className="w-9 h-9"
          placeholder={blurHash}
          source={image}
        />
        <View>
          <SemiText className="text-secondary capitalize">{label}</SemiText>
          <NormalText className="text-tertiary">{description}</NormalText>
        </View>
      </View>
      <View>
        <View
          className={`w-6 h-6 rounded-full items-center justify-center ${
            selectedBank == id ? 'bg-primary' : 'bg-white'
          }`}
        >
          <View className="w-3 h-3 rounded-full bg-white" />
        </View>
      </View>
    </View>
  )
}
