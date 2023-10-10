import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import {
  Animated,
  Easing,
  Pressable,
  TouchableOpacity,
  View
} from 'react-native'
import { MediumText } from '../Themed'
import { Loader2Icon } from 'lucide-react-native'

export const TextButtonType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline'
}

type TextButtonProps = {
  href?: any
  text: string
  type: string
  onPress?: () => void
  disable?: boolean
  loading?: boolean
  previousRoute?: string
}

function TextComponent({
  text,
  type,
  loading
}: {
  text: string
  type: string
  loading?: boolean
}) {
  const spinValue = new Animated.Value(0)

  useEffect(() => {
    spin()
  }, [loading])

  const spin = () => {
    spinValue.setValue(0)
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => spin())
  }

  const spinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View className="flex flex-row justify-center items-center">
      {loading && (
        <Animated.View
          className="mr-2"
          style={{ transform: [{ rotate: spinAnimation }] }}
        >
          <Loader2Icon className="h-4 w-4 text-white" />
        </Animated.View>
      )}
      <MediumText
        className={`${
          type == TextButtonType.PRIMARY
            ? 'text-white'
            : type == TextButtonType.SECONDARY
              ? 'text-tertiary'
              : 'text-primary'
        } py-2`}
      >
        {text}
      </MediumText>
    </View>
  )
}

export default function TextButton({
  href,
  text,
  type,
  onPress,
  disable,
  previousRoute,
  loading
}: TextButtonProps) {
  const route = useRouter()

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disable}>
      <View
        className={`${
          disable
            ? 'bg-gray-300'
            : type == TextButtonType.PRIMARY
              ? 'bg-primary'
              : type == TextButtonType.SECONDARY
                ? 'bg-white border border-tertiary'
                : 'bg-white border border-primary'
        } rounded-lg px-1 py-2`}
      >
        {href ? (
          <Pressable
            disabled={disable}
            onPress={() =>
              !previousRoute
                ? route.push(href)
                : route.push({
                  pathname: href,
                  params: { previousRoute: previousRoute }
                })
            }
            className="flex items-center w-full"
          >
            <TextComponent text={text} type={type} loading={loading} />
          </Pressable>
        ) : (
          <TextComponent text={text} type={type} loading={loading} />
        )}
      </View>
    </TouchableOpacity>
  )
}
