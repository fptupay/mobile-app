import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { ChevronRight, PlusSquare } from 'lucide-react-native'
import React from 'react'
import { Pressable, TextInput, TouchableOpacity, View } from 'react-native'
import { NormalText, SemiText } from '../Themed'

interface IconButtonProps extends React.ComponentProps<typeof TextInput> {
  label: string
  href?: any
  description?: string | null
  previousRoute?: string
  onPress?: () => void
}

export default function IconButton(props: IconButtonProps) {
  const {
    label,
    description,
    href,
    style,
    onPress,
    previousRoute,
    ...otherProps
  } = props
  const route = useRouter()

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        {...otherProps}
        style={style}
        className="p-4 rounded-lg flex flex-row items-center justify-between border border-gray-300"
      >
        <View className="flex flex-row gap-3 items-center w-full pr-10">
          <PlusSquare size={24} color={Colors.secondary} />
          <View>
            <SemiText className="text-secondary capitalize">{label}</SemiText>
            <NormalText className="text-tertiary mt-1">
              {description}
            </NormalText>
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
    </TouchableOpacity>
  )
}
