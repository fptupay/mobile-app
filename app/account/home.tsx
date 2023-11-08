import { getAccountBalance } from '@/api/bank'
import { getUserDetails } from '@/api/profile'
import GradientBackground from '@/components/GradientBackground'
import CustomIcon from '@/components/Icon'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { useAccountStore } from '@/stores/accountStore'
import { IconProps } from '@/types/Icon.type'
import {
  WINDOW_HEIGHT,
  formatMoney,
  successResponseStatus
} from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import React, { useRef, useState } from 'react'
import {
  Animated,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

interface MainActionProps {
  image: IconProps['name']
  title: string
  route: any
}

const transactions = [
  {
    id: 1,
    recipient: 'Nguyễn Văn A',
    name: 'Mua sắm',
    amount: 100000,
    type: 'expense',
    message: 'Mua sắm tạp hoá',
    date: '2021-09-01'
  },
  {
    id: 2,
    recipient: 'Nguyễn Văn B',
    name: 'Học phí',
    amount: 100000,
    type: 'expense',
    message: 'Mua sắm tạp hoá',
    date: '2021-09-01'
  },
  {
    id: 3,
    recipient: 'Nguyễn Văn C',
    name: 'Lương tháng 9',
    amount: 100000,
    type: 'income',
    message: 'Công ty X chuyển tiền lương tháng 9',
    date: '2021-09-01'
  },
  {
    id: 4,
    recipient: 'Nguyễn Văn D',
    name: 'Mua sắm',
    amount: 100000,
    type: 'expense',
    message: 'Mua sắm tạp hoá',
    date: '2021-09-01'
  },
  {
    id: 5,
    recipient: 'Nguyễn Văn E',
    name: 'Mua sắm',
    amount: 100000,
    type: 'income',
    message: 'Mua sắm tạp hoá',
    date: '2021-09-01'
  },
  {
    id: 6,
    recipient: 'Nguyễn Văn F',
    name: 'Mua sắm',
    amount: 100000,
    type: 'expense',
    message: 'Mua sắm tạp hoá',
    date: '2021-09-01'
  },
  {
    id: 7,
    recipient: 'Nguyễn Lan Anh',
    name: 'Chuyển tiền ăn',
    amount: 100000,
    type: 'income',
    message: 'Nguyễn Lan Anh chuyển tiền',
    date: '2021-09-01'
  },
  // there are 2 types: income and expense, with varied amount
  {
    id: 8,
    recipient: 'Nguyễn Văn H',
    name: 'Mua sắm',
    amount: 100000,
    type: 'expense',
    message: 'Mua sắm tạp hoá',
    date: '2021-09-01'
  },
  {
    id: 9,
    recipient: 'Nguyễn Văn I',
    name: 'Mua sắm',
    amount: 100000,
    type: 'expense',
    message: 'Mua sắm tạp hoá',
    date: '2021-09-01'
  },
  {
    id: 10,
    recipient: 'Nguyễn Văn K',
    name: 'Mua sắm',
    amount: 100000,
    type: 'income',
    message: 'Mua sắm tạp hoá',
    date: '2021-09-01'
  }
]

const MainAction: React.FC<MainActionProps> = ({ image, title, route }) => {
  const router = useRouter()

  const handleRouting = () => {
    router.push(route)
  }
  return (
    <Pressable
      onPress={handleRouting}
      className="w-[30%] h-full relative text-center items-center"
    >
      <View className="w-[48px] h-[48px] items-center bg-black rounded-full justify-center">
        <CustomIcon name={image} size={24} color="#fff" />
      </View>
      <MediumText className="text-center mt-4 wd:w-[30%] text-secondary">
        {title}
      </MediumText>
    </Pressable>
  )
}

export default function HomeScreen() {
  const [isSearching, setIsSearching] = useState(false)
  const [showBalance, setShowBalance] = useState(false)

  const setBalance = useAccountStore((state) => state.setBalance)
  const setDetails = useAccountStore((state) => state.setDetails)

  const accountBalanceQuery = useQuery({
    queryKey: ['account-balance'],
    queryFn: getAccountBalance,
    onSuccess: (data) => {
      setBalance(data.data.balance)
      if (!successResponseStatus(data)) {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      }
    },
    onError: (error: AxiosError) => {
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: error.message
      })
    }
  })

  const { data: profile } = useQuery({
    queryKey: ['user-details'],
    queryFn: getUserDetails,
    onSuccess: (data) => {
      setDetails(data.data)
    }
  })

  const toggleSearch = () => {
    setIsSearching(!isSearching)
  }

  const BottomSheet = () => {
    const router = useRouter()
    const [scrollY, setScrollY] = useState(WINDOW_HEIGHT - 350)
    const MAX_UPWARD_TRANSLATE_Y = -WINDOW_HEIGHT * 0.25
    const MAX_DOWNWARD_TRANSLATE_Y = 0
    const animatedValue = useRef(new Animated.Value(0)).current
    const lastGestureDy = useRef(0)
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          animatedValue.setOffset(lastGestureDy.current)
        },
        onPanResponderMove: (event, gesture) => {
          animatedValue.setValue(gesture.dy)
        },
        onPanResponderRelease: (event, gesture) => {
          lastGestureDy.current += gesture.dy
          if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
            lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y
          } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
            lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y
          }
          setScrollY(WINDOW_HEIGHT - 350 - lastGestureDy.current)
        }
      })
    ).current

    const bottomSheetAnimation = {
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
          className="absolute flex-1 left-0 right-0 -top-8 bg-white px-4 rounded-t-[30px]"
          style={[{ maxHeight: WINDOW_HEIGHT }, bottomSheetAnimation]}
        >
          <View
            className="w-48 h-10 pt-2 justify-start items-center mx-auto"
            {...panResponder.panHandlers}
          >
            <View className="w-28 h-1 rounded-xl bg-tertiary"></View>
          </View>
          {!isSearching ? (
            <View className="mt-1 flex-row items-center justify-between">
              <NormalText className="text-tertiary uppercase">
                Hôm nay
              </NormalText>
              <View className="flex-row">
                <TouchableOpacity
                  className="mr-4"
                  onPress={() => router.push('/statistics/')}
                >
                  <CustomIcon
                    name="BarChart"
                    size={24}
                    color={Colors.tertiary}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleSearch}>
                  <CustomIcon name="Search" size={24} color={Colors.tertiary} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
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
                        placeholder="Tìm kiếm giao dịch"
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
          )}

          <FlatList
            contentContainerStyle={{
              paddingBottom: (400 * (WINDOW_HEIGHT - 350)) / scrollY
            }}
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-row justify-between items-center py-3"
                onPress={() =>
                  router.push({
                    pathname: '/(transactions)/[id]',
                    params: { id: item.id }
                  } as any)
                }
              >
                <View className="flex-row items-center space-x-4">
                  <View className="w-10 h-10 rounded-full bg-gray-200"></View>
                  <View className="w-[200px]">
                    <MediumText className="text-secondary">
                      {item.name}
                    </MediumText>
                    <NormalText className="text-ellipsis text-tertiary">
                      {item.message}
                    </NormalText>
                  </View>
                </View>
                <View>
                  <NormalText
                    className={
                      item.type === 'income' ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    {item.type === 'income' ? '+' : '-'}
                    {formatMoney(item.amount)}
                  </NormalText>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <View className="h-[350px]">
        <GradientBackground />
        <SafeAreaView className="px-4 pt-4">
          <View className="flex flex-row space-x-2 items-center">
            <View className="w-9 h-9 rounded-full bg-gray-200"></View>
            <View>
              <NormalText className="text-secondary">Xin chào</NormalText>
              <SemiText className="text-secondary">
                {profile?.data.full_name}
              </SemiText>
            </View>
          </View>

          <View className="mt-6">
            <View className="flex flex-row items-center space-x-2">
              <NormalText className="text-base text-secondary">
                Số dư của bạn
              </NormalText>
              {showBalance ? (
                <Pressable onPress={() => setShowBalance(!showBalance)}>
                  <CustomIcon name="Eye" color={Colors.tertiary} size={24} />
                </Pressable>
              ) : (
                <Pressable onPress={() => setShowBalance(!showBalance)}>
                  <CustomIcon name="EyeOff" color={Colors.tertiary} size={24} />
                </Pressable>
              )}
            </View>
            <SemiText className="text-3xl text-secondary mt-1">
              {showBalance
                ? `${formatMoney(accountBalanceQuery.data?.data.balance)}đ`
                : '*******'}
            </SemiText>
          </View>

          <View className="mt-6">
            <View className="flex-row justify-between">
              <MainAction
                route="/main-features/deposit/load-money"
                image="Plus"
                title="Nạp tiền"
              />
              <MainAction
                route="/transfer"
                image="ArrowRight"
                title="Chuyển tiền"
              />
              <MainAction
                route="/main-features/withdraw/withdrawal"
                image="WalletCards"
                title="Rút tiền"
              />
            </View>
          </View>
        </SafeAreaView>
      </View>

      <BottomSheet />
    </View>
  )
}
