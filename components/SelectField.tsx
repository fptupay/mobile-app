import { useBankStore } from '@/stores/bankStore'
import React from 'react'
import { Image, TextInput, View } from 'react-native'
import { NormalText, SemiText } from './Themed'

interface SelectFieldProps extends React.ComponentProps<typeof TextInput> {
  id: string
  label: string
  description?: string | null
}

export default function SelectField(props: SelectFieldProps) {
  const { id, label, description, style, ...otherProps } = props
  const selectedBank = useBankStore((state) => state.selectedBank)

  return (
    <View
      {...otherProps}
      style={style}
      className={`p-4 rounded-lg flex flex-row items-center justify-between border ${
        selectedBank == id ? 'border-primary' : 'border-gray-300'
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
            selectedBank == id ? 'bg-primary' : 'bg-white'
          }`}
        >
          <View className="w-3 h-3 rounded-full bg-white" />
        </View>
      </View>
    </View>
  )
}
