import { getAccountBalance } from '@/api/bank'
import { getUserAvatar, getUserDetails } from '@/api/profile'
import { getTransactionsByAccountNumber } from '@/api/transaction'
import GradientBackground from '@/components/GradientBackground'
import CustomIcon from '@/components/Icon'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { useAccountStore } from '@/stores/accountStore'
import { IconProps } from '@/types/Icon.type'
import {
  extractDateStringFromCurrentDate,
  getCurrentYearTime
} from '@/utils/datetime'
import {
  WINDOW_HEIGHT,
  formatDateTime,
  formatMoney,
  getDeviceId,
  successResponseStatus
} from '@/utils/helper'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { router, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
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
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { blurHash } from '@/constants/Hash'
import { useTransactionStore } from '@/stores/transactionStore'
import { checkStatusSmartOTP } from '@/api/otp'
import * as SecureStore from 'expo-secure-store'

interface MainActionProps {
  image: IconProps['name']
  title: string
  route: any
}

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

  const { setHasRegisteredOTP } = useAccountStore()
  /* todo */
  const { username } = useAccountStore((state) => state.credentials)
  const { setBalance, setDetails, setAvatar } = useAccountStore()
  const { accountNumber, setAccountNumber } = useTransactionStore()

  const { mutate } = useMutation({
    mutationFn: checkStatusSmartOTP,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setHasRegisteredOTP(data.data?.status)
      } else {
        setHasRegisteredOTP(false)
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        let smartOTPTransactionId = await SecureStore.getItemAsync(
          `${username.toLowerCase()}_transId`
        )

        if (smartOTPTransactionId === null) {
          smartOTPTransactionId = ''
        }

        console.log(
          '🚀 ~ file: home.tsx:105 ~ fetchData ~ smartOTPTransactionId:',
          smartOTPTransactionId
        )
        const deviceId = await getDeviceId()

        if (smartOTPTransactionId !== null) {
          mutate({
            device_id: deviceId,
            version: Platform.Version.toString(),
            trans_id: smartOTPTransactionId
          })
        }
      } catch (error) {
        console.error(error)
      }
    }

    void fetchData()
  }, [])

  const accountBalanceQuery = useQuery({
    queryKey: ['account-balance'],
    queryFn: getAccountBalance,
    notifyOnChangeProps: ['data'],
    onSuccess: (data) => {
      setBalance(data.data.balance)
      setAccountNumber(data.data.account_no)
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

  const { data: avatar } = useQuery({
    queryKey: ['user-avatar'],
    queryFn: getUserAvatar,
    onSuccess: (data) => {
      setAvatar(data.data.avatar)
    }
  })

  const getTransactionsQuery = useQuery({
    queryKey: ['transactions', accountNumber],
    queryFn: () =>
      getTransactionsByAccountNumber(
        accountNumber,
        getCurrentYearTime(),
        extractDateStringFromCurrentDate(new Date())
      ),
    notifyOnChangeProps: ['data']
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

    const [searchText, setSearchText] = useState('')
    const handleSearchTransaction = (text: string) => {
      setSearchText(text)
    }

    const filteredData = getTransactionsQuery.data?.data.filter((item: any) => {
      return (
        searchText === '' ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
      )
    })

    return (
      <View className="flex-1 bg-black">
        <Animated.View
          className="absolute flex-1 left-0 right-0 -top-8 bg-white px-4 rounded-t-[30px]"
          style={[{ height: WINDOW_HEIGHT }, bottomSheetAnimation]}
        >
          <View
            className="w-48 h-10 pt-2 justify-start items-center mx-auto"
            {...panResponder.panHandlers}
          >
            <View className="w-28 h-1 rounded-xl bg-tertiary"></View>
          </View>

          {/* toggle search input */}
          {!isSearching ? (
            <View className="mt-1 flex-row items-center justify-between">
              <NormalText className="text-tertiary uppercase">
                Lịch sử giao dịch
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
                        onChangeText={(text) => handleSearchTransaction(text)}
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

          {/* display transactions list */}
          {getTransactionsQuery.isLoading ? (
            <View className="flex flex-col mt-8 space-y-2 items-center">
              <ActivityIndicator color={Colors.tertiary} />
              <NormalText className="text-tertiary">
                Đang tải dữ liệu
              </NormalText>
            </View>
          ) : (
            <View>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: (400 * (WINDOW_HEIGHT - 350)) / scrollY
                }}
                data={filteredData}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="flex flex-row py-3 items-center"
                    onPress={() =>
                      router.push({
                        pathname: '/transactions/[id]',
                        params: { id: item.transaction_id }
                      } as any)
                    }
                  >
                    <View className="flex flex-row items-center space-x-4 w-3/5">
                      <View className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center">
                        <CustomIcon
                          name={
                            +item.amount < 0 ? 'ArrowUpRight' : 'ArrowDownLeft'
                          }
                          size={24}
                          color={+item.amount < 0 ? '#ef4444' : '#22c55e'}
                        />
                      </View>

                      <View>
                        <MediumText className="text-secondary">
                          {item.description}
                        </MediumText>
                        <NormalText className="text-ellipsis text-xs text-tertiary">
                          {formatDateTime(item.created_at)}
                        </NormalText>
                      </View>
                    </View>
                    <View className="w-2/5">
                      <NormalText
                        className={`text-right ${
                          +item.amount < 0 ? 'text-red-500' : 'text-green-500'
                        }`}
                      >
                        {formatMoney(item.amount)} đ
                      </NormalText>
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <View className="flex flex-1 items-center justify-center mt-16 mx-auto">
                    <CustomIcon name="WalletCards" size={32} color="#666" />
                    <MediumText className="mt-4 text-lg text-secondary">
                      Không có giao dịch
                    </MediumText>
                    <NormalText className="text-center text-tertiary">
                      Hiện tại bạn không có giao dịch nào
                    </NormalText>
                  </View>
                )}
              />
            </View>
          )}
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
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => router.replace('/account/my-wallet')}
            >
              <Image
                source={{
                  uri: avatar?.data.avatar
                }}
                transition={200}
                placeholder={blurHash}
                className="w-9 h-9 rounded-full"
              />
            </TouchableOpacity>
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
                ? `${formatMoney(accountBalanceQuery.data?.data.balance)} đ`
                : '*******'}
            </SemiText>
          </View>

          <View className="mt-6">
            <View className="flex-row justify-between">
              <MainAction
                route="/main-features/deposit/deposit-verification"
                image="Plus"
                title="Nạp tiền"
              />
              <MainAction
                route="/transfer"
                image="ArrowRight"
                title="Chuyển tiền"
              />
              <MainAction
                route="/main-features/withdraw/withdraw-verification"
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
