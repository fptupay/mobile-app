import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import CustomIcon from '../Icon'

export default function BackButton({ href }: { href?: any }) {
  const router = useRouter()
  return (
    <Pressable
      onPress={() => (href ? router.push(href) : router.back())}
      className="z-10"
      testID="link"
    >
      <CustomIcon name="ChevronLeft" color="gray" size={30} />
    </Pressable>
  )
}
