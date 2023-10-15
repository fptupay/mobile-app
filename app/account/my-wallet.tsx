import { logoutUser } from '@/api/authentication'
import CustomIcon from '@/components/Icon'
import { NormalText, SemiText, View } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import List from '@/components/list'
import { ListItemProps } from '@/components/list/ListItem'

import Colors from '@/constants/Colors'
import { deleteToken } from '@/utils/helper'
import {
  QueryClient,
  QueryClientProvider,
  useMutation
} from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Eye, EyeOff } from 'lucide-react-native'
import React, { useRef, useState } from 'react'
import { Animated, Image, Pressable, ScrollView } from 'react-native'

const walletFunctions: ListItemProps[] = [
  {
    leftIcon: 'Plus',
    color: '#000000',
    title: 'Nạp tiền',
    description: 'Từ ngân hàng vào FPTU Pay',
    href: '/main-features/(deposit)/load-money',
    rightIcon: 'ChevronRight'
  },
  {
    leftIcon: 'ArrowRight',
    title: 'Chuyển tiền',
    color: '#000000',
    description: 'Từ FPTU Pay tới FPT Academy',
    href: '/transfer/transfer-list',
    rightIcon: 'ChevronRight'
  }
]

const accountDetail: ListItemProps[] = [
  {
    leftIcon: 'User',
    color: '#F97316',
    href: '/personal-info',
    title: 'Thông tin cá nhân'
  },
  {
    leftIcon: 'Landmark',
    color: '#3074E3',
    href: '/bank/bank-list',
    title: 'Ngân hàng đã liên kết'
  }
]

const otherFunctions: ListItemProps[] = [
  {
    leftIcon: 'Lock',
    color: '#A983FC',
    href: '/authentication/reset-password',
    title: 'Đổi mật khẩu'
  },
  {
    leftIcon: 'MessageSquare',
    color: '#35CC9F',
    href: '/account/help-center',
    title: 'Hỗ trợ'
  },
  {
    leftIcon: 'Settings',
    color: '#CCA967',
    href: '/main-features/(deposit)/load-money',
    title: 'Cài đặt'
  }
]

const Header_Max = 215
const Header_Min = 120
const Scroll_Distance = Header_Max - Header_Min

const DynamicHeader = ({ value }: any) => {
  const heightAnimation = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max, Header_Min],
    extrapolate: 'clamp'
  })

  const opacityAnimation = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const sizeAnimation = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [72, 0],
    extrapolate: 'clamp'
  })

  return (
    <Animated.View
      style={{ height: heightAnimation }}
      className="h-[215px] bg-white rounded-bl-[30px] rounded-br-[30px] relative flex justify-center items-center"
    >
      <LinearGradient
        className="w-full h-full rounded-bl-[30px] rounded-br-[30px]"
        colors={['#fdc83080', '#f97316bf']}
      />
      <View className="absolute bg-transparent pt-8 flex items-center">
        <Animated.View
          style={{
            opacity: opacityAnimation,
            width: sizeAnimation,
            height: sizeAnimation
          }}
          className="w-[72px] h-[72px] rounded-full relative"
        >
          <Image
            className="rounded-full w-[72px] h-[72px] bg-black"
            source={require('@/assets/images/account-mascot.png')}
          />
          <View className="bg-white w-7 h-7 rounded-full flex items-center justify-center absolute -bottom-2 -right-1">
            <CustomIcon name="Pencil" color="black" size={16} />
          </View>
        </Animated.View>
        <SemiText className="text-center text-secondary mt-5">
          Cao Quynh Anh
        </SemiText>
      </View>
    </Animated.View>
  )
}

export default function MyWalletScreen() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MyWalletComponent />
    </QueryClientProvider>
  )
}

function MyWalletComponent() {
  const router = useRouter()

  const scrollOffsetY = useRef(new Animated.Value(0)).current
  const [showBalance, setShowBalance] = useState(false)

  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: (data) => {
      console.log(data)
      deleteToken('access_token')
        .then(() => router.push('/'))
        .catch((err) => console.log(err))
    },
    onError: (error: any) => {
      console.log(error)
    }
  })

  return (
    <View className="flex-1">
      <DynamicHeader value={scrollOffsetY} />
      <ScrollView
        scrollEventThrottle={5}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          {
            useNativeDriver: false
          }
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View>
          <View
            className="rounded-lg mx-4 mt-4 p-4 flex flex-row justify-between items-center"
            style={{
              shadowOffset: { width: 2, height: 4 },
              shadowOpacity: 0.4,
              shadowColor: '#808080',
              shadowRadius: 5
            }}
          >
            <View className="flex-1 items-start">
              <View className="flex flex-row justify-center items-center">
                <NormalText className="text-base">Số dư của bạn</NormalText>
                {showBalance ? (
                  <Pressable onPress={() => setShowBalance(!showBalance)}>
                    <Eye size={24} color={Colors.tertiary} className="ml-2" />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => setShowBalance(!showBalance)}>
                    <EyeOff
                      size={24}
                      color={Colors.tertiary}
                      className="ml-2"
                    />
                  </Pressable>
                )}
              </View>
              <View className="relative flex justify-center">
                <SemiText
                  className={`text-primary text-2xl mt-2 absolute ${
                    showBalance ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  20.567.000
                  <SemiText className="underline text-xl text-primary">
                    đ
                  </SemiText>
                </SemiText>
                <SemiText
                  className={`text-primary text-2xl mt-2 ${
                    showBalance ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  *******
                </SemiText>
              </View>
            </View>
            <Image
              source={require('../../assets/images/account-mascot.png')}
              className="w-[100px] h-[90px]"
            />
          </View>

          <View className="mt-5">
            <List data={walletFunctions} />
          </View>

          <View className="mt-5">
            <List data={accountDetail} title="Tài khoản" />
          </View>

          <View className="mt-5">
            <List data={otherFunctions} title="Khác" />
          </View>

          <View className="mx-4 my-4">
            <TextButton
              onPress={logoutMutation.mutate}
              disable={logoutMutation.isLoading}
              loading={logoutMutation.isLoading}
              text="Đăng xuất"
              type={TextButtonType.PRIMARY}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
