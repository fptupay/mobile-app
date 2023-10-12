import { useRouter } from 'expo-router'
import React from 'react'
import {
  Pressable,
  TextInput,
  View,
  Image,
  ImageSourcePropType
} from 'react-native'
import { NormalText, SemiText } from '../Themed'

interface BankButtonProps extends React.ComponentProps<typeof TextInput> {
  image: ImageSourcePropType
  label: string
  href: any
  description?: string | null
}

export default function BankButton(props: BankButtonProps) {
  const { image, label, description, href, style, ...otherProps } = props
  const router = useRouter()

  return (
    <Pressable onPress={() => router.push(href)}>
      <View
        {...otherProps}
        style={style}
        className="p-4 rounded-lg flex flex-row items-center justify-between border border-gray-300 mt-4"
      >
        <View className="flex flex-row gap-3 items-center">
          <Image source={image} className="w-[40px] h-[32px]" />
          <View className="pl-3">
            <SemiText className="text-secondary capitalize">{label}</SemiText>
            <NormalText className="text-tertiary">{description}</NormalText>
          </View>
        </View>
      </View>
    </Pressable>
  )
}
