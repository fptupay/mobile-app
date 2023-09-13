import { useBankStore } from '@/stores/bankStore'
import React from 'react'
import { Image, TextInput, View } from 'react-native'
import { NormalText, SemiText } from './Themed'

interface SelectFieldProps extends React.ComponentProps<typeof TextInput> {
  label: string
  description?: string | null
}

export default function SelectField(props: SelectFieldProps) {
  const { label, description, style, ...otherProps } = props
  const selectedBank = useBankStore((state) => state.selectedBank)

  return (
    <View
      {...otherProps}
      style={style}
      className={`p-4 rounded-lg flex flex-row items-center justify-between border ${
        selectedBank == label ? 'border-primary' : 'border-gray-300'
      }`}
    >
      <View className="flex flex-row gap-3 items-center">
        <Image source={require('../assets/images/techcombank.png')} />
        <View>
          <SemiText className="text-secondary capitalize">{label}</SemiText>
          <NormalText className="text-tertiary">{description}</NormalText>
        </View>
      </View>
      <View>
        <View
          className={`w-6 h-6 rounded-full items-center justify-center ${
            selectedBank == label ? 'bg-primary' : 'bg-tertiary'
          }`}
        >
          <View className="w-3 h-3 rounded-full bg-white" />
        </View>
      </View>
    </View>
  )
}
