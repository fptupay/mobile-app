import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { ChevronRight, PlusSquare } from 'lucide-react-native'
import React from 'react'
import { Pressable, TextInput, View } from 'react-native'
import { NormalText, SemiText } from '../Themed'

interface IconButtonProps extends React.ComponentProps<typeof TextInput> {
  label: string
  href: any
  description?: string | null
  previousRoute?: string
}

export default function IconButton(props: IconButtonProps) {
  const { label, description, href, style, previousRoute, ...otherProps } = props
  const route = useRouter()

  return (
    <View
      {...otherProps}
      style={style}
      className="p-4 rounded-lg flex flex-row items-center justify-between border border-gray-300"
    >
      <View className="flex flex-row gap-3 items-center">
        <PlusSquare size={24} color={Colors.secondary} />
        <View>
          <SemiText className="text-secondary capitalize">{label}</SemiText>
          <NormalText className="text-tertiary">{description}</NormalText>
        </View>
      </View>
      <Pressable
        onPress={() =>
          previousRoute
            ? route.push({
              pathname: href,
              params: {
                previousRoute: previousRoute
              }
            })
            : route.push(href)
        }
      >
        <ChevronRight size={24} color={Colors.secondary} />
      </Pressable>
    </View>
  )
}
