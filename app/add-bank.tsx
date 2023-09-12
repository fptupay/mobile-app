import CustomIcon from '@/components/Icon'
import { MediumText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'
import QuestionButton from '@/components/buttons/QuestionButton'
import Colors from '@/constants/Colors'
import { WINDOW_HEIGHT } from '@/utils/helper'

import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ChevronRight } from 'lucide-react-native'
import React, { useRef, useState } from 'react'
import {
  Animated,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export type AddBankRouteParams = {
  setDepositSuccessful?: boolean
}

export default function addBank() {
  const featuresData = [
    {
      id: 1,
      icon: require('../assets/images/tick.png'),
      bank: 'Agribank'
    },
    {
      id: 2,
      icon: require('../assets/images/tick.png'),
      bank: 'Agribank'
    },
    {
      id: 3,
      icon: require('../assets/images/tick.png'),
      bank: 'Agribank'
    },
    {
      id: 4,
      icon: require('../assets/images/tick.png'),
      bank: 'Agribank'
    },
    {
      id: 5,
      icon: require('../assets/images/tick.png'),
      bank: 'Agribank'
    },
    {
      id: 6,
      icon: require('../assets/images/tick.png'),
      bank: 'Agribank'
    },
    {
      id: 7,
      icon: require('../assets/images/tick.png'),
      bank: 'Agribank'
    },
    {
      id: 8,
      icon: require('../assets/images/tick.png'),
      bank: 'Agribank'
    },
    {
      id: 9,
      icon: require('../assets/images/tick.png'),
      bank: 'Agribank'
    },
    {
      id: 10,
      icon: require('../assets/images/tick.png'),
      bank: 'Agribank'
    }
  ]
  const textInputRef = useRef<TextInput | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const toggleSearch = () => {
    setIsSearching(!isSearching)
    if (!isSearching && textInputRef.current) {
      textInputRef.current.focus()
    }
  }

  const renderItem = ({ item }: { item: (typeof featuresData)[0] }) => (
    <KeyboardAvoidingView>
      <View className="flex-row justify-between items-center py-3 h-[75px] w-full border-b border-gray-300">
        <View className="flex-row items-center space-x-4">
          <View className="w-[48px] h-[48px] rounded-full border border-gray-400 border-opacity-40">
            <Image source={item.icon} className="w-full h-full rounded-full" />
          </View>
          <View>
            <Text>{item.bank}</Text>
          </View>
        </View>
        <View className="">
          <Pressable
            onPress={() => router.push('/(main-features)/add-bank-item')}
          >
            <ChevronRight size={24} color={Colors.secondary} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )

  const Content = () => {
    const [scrollY] = useState(WINDOW_HEIGHT - 350)
    const MAX_UPWARD_TRANSLATE_Y = -WINDOW_HEIGHT * 0.25
    const MAX_DOWNWARD_TRANSLATE_Y = 0
    const animatedValue = useRef(new Animated.Value(0)).current

    const contentAnimation = {
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
            outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
            extrapolate: 'clamp'
          })
        }
      ]
    }

    return (
      <View className="flex-1 bg-black">
        <Animated.View
          className="flex-1 px-4 bg-white left-0 right-0 backdrop-blur-[4px] rounded-t-[30px] absolute -top-10"
          style={[{ maxHeight: WINDOW_HEIGHT }, contentAnimation]}
        >
          {!isSearching ? (
            <View className="">
              <View className="my-5 flex-row items-center justify-center">
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  className="flex-1"
                >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1 items-center justify-center">
                      <View className="w-full relative">
                        <TextInput
                          className="h-12 px-10 py-3 bg-[#D9D9D9] rounded-lg focus:border-primary"
                          placeholderTextColor={Colors.tertiary}
                          placeholder="Tìm kiếm ngân hàng"
                          style={{ fontFamily: 'Inter' }}
                          onFocus={toggleSearch}
                        />
                        <View className="absolute top-3 left-2">
                          <CustomIcon
                            name="Search"
                            size={24}
                            color={Colors.tertiary}
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              </View>
              <View>
                <MediumText>Toàn bộ ngân hàng</MediumText>
              </View>
            </View>
          ) : (
            <View className="">
              <View className="my-5 flex-row items-center justify-center">
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  className="flex-1"
                >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1 items-center justify-center">
                      <View className="w-full relative">
                        <TextInput
                          className="h-12 px-10 py-3 bg-[#D9D9D9] rounded-lg focus:border-primary"
                          placeholderTextColor={Colors.tertiary}
                          placeholder="Tìm kiếm ngân hàng"
                          style={{ fontFamily: 'Inter' }}
                        />
                        <View className="absolute top-3 left-2">
                          <CustomIcon
                            name="Search"
                            size={24}
                            color={Colors.tertiary}
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <TouchableOpacity className="ml-3" onPress={toggleSearch}>
                  <NormalText className="text-secondary">Hủy</NormalText>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View className="h-full pt-2 w-full">
            <View className="px-4">
              <FlatList
                contentContainerStyle={{
                  paddingBottom: (400 * (WINDOW_HEIGHT - 350)) / scrollY
                }}
                data={featuresData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <QuestionButton href="index" />
      <BackButton href="/load-money" />
      <View className="h-48">
        <LinearGradient
          colors={['#fdc83080', '#f97316bf']}
          className="absolute top-0 left-0 right-0 h-full"
        />
        <SafeAreaView className="px-4">
          <View className="w-full px-4 mt-10">
            <MediumText className="w-full text-xl">
              Liên kết ngân hàng
            </MediumText>
          </View>
        </SafeAreaView>
      </View>
      <Content />
    </View>
  )
}
