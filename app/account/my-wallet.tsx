import { logoutUser } from '@/api/authentication'
import CustomIcon from '@/components/Icon'
import { NormalText, SemiText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import List from '@/components/list'
import { ListItemProps } from '@/components/list/ListItem'
import Colors from '@/constants/Colors'
import { useAccountStore } from '@/stores/accountStore'
import { deleteToken, formatMoney, successResponseStatus } from '@/utils/helper'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Eye, EyeOff } from 'lucide-react-native'
import { useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native'
import { Image } from 'expo-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'
import { AxiosError } from 'axios'
import Toast from 'react-native-toast-message'
import { uploadUserAvatar } from '@/api/profile'
import { blurHash } from '@/constants/Hash'
import * as ImageManipulator from 'expo-image-manipulator';

const walletFunctions: ListItemProps[] = [
  {
    leftIcon: 'Plus',
    color: '#000000',
    title: 'Nạp tiền',
    description: 'Từ ngân hàng vào ví FPTUPay',
    href: '/main-features/deposit/load-money',
    rightIcon: 'ChevronRight'
  },
  {
    leftIcon: 'ArrowRight',
    title: 'Rút tiền',
    color: '#000000',
    description: 'Về ngân hàng đã liên kết',
    href: '/main-features/withdraw/withdrawal',
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
  },
  {
    leftIcon: 'BarChart3',
    color: '#4ade80',
    href: '/statistics/',
    title: 'Thống kê giao dịch'
  }
]

const otherFunctions: ListItemProps[] = [
  {
    leftIcon: 'Shield',
    color: '#f43f5e',
    href: '/smart-otp',
    title: 'Cài đặt Smart OTP'
  },
  {
    leftIcon: 'Lock',
    color: '#A983FC',
    href: '/settings/change-password',
    title: 'Đổi mật khẩu'
  },
  {
    leftIcon: 'MessageSquare',
    color: '#35CC9F',
    href: '/settings/change-phone',
    title: 'Đổi số điện thoại'
  }
]

export default function MyWalletScreen() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [showBalance, setShowBalance] = useState(false)
  const { balance, details, avatar, setDetails, clearCredentials } =
    useAccountStore()

  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      setDetails({})
      clearCredentials()
      deleteToken('access_token')
        .then(() => router.push('/'))
        .catch((err) => console.log(err))
    },
    onError: (error: AxiosError) => {
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: error.message
      })
    }
  })

  const avatarMutation = useMutation({
    mutationFn: (data: string) => uploadUserAvatar(data),
    onSuccess: async (data) => {
      if (successResponseStatus(data)) {
        Toast.show({
          type: 'success',
          text1: 'Cập nhật ảnh đại diện thành công'
        })
        await queryClient.invalidateQueries(['user-avatar'])
      } else {
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

  const pickImage = async () => {
    let aspectRatio = [3, 4];
  
    if (Platform.OS === 'ios') {
      aspectRatio = [4, 5];
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: aspectRatio,
      quality: 0.5
    });
  
    if (result?.assets) {
      avatarMutation.mutate(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="h-[215px] bg-white rounded-bl-[30px] rounded-br-[30px] relative flex justify-center items-center">
        <LinearGradient
          className="w-full h-full rounded-bl-[30px] rounded-br-[30px]"
          colors={['#fdc83080', '#f97316bf']}
        />
        <View className="absolute bg-transparent pt-8 flex items-center">
          <View className="w-[72px] h-[72px] rounded-full relative">
            {avatarMutation.isLoading ? (
              <View className="w-[72px] h-[72px] rounded-full flex items-center justify-center">
                <ActivityIndicator color={Colors.tertiary} />
              </View>
            ) : (
              <Image
                source={{
                  uri: avatar
                }}
                transition={200}
                placeholder={blurHash}
                className="w-[72px] h-[72px] rounded-full"
              />
            )}
            <View className="bg-white border border-secondary/20 w-6 h-6 rounded-full flex items-center justify-center absolute bottom-0 right-0">
              <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
                <CustomIcon name="Pencil" color="#666" size={16} />
              </TouchableOpacity>
            </View>
          </View>
          <SemiText className="text-center text-secondary mt-5">
            {details.full_name}
          </SemiText>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View>
          <View
            className="rounded-lg mx-4 mt-4 p-4 flex flex-row justify-between items-center bg-[#FAFAFA]"
            style={{
              shadowOffset: { width: 2, height: 4 },
              shadowOpacity: 0.4,
              shadowColor: '#808080',
              shadowRadius: 5
            }}
          >
            <View className="flex-1 items-start">
              <View className="flex flex-row justify-center items-center">
                <NormalText className="text-base text-secondary">
                  Số dư của bạn
                </NormalText>
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
                  {formatMoney(balance)}đ
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
              source={require('@/assets/images/account-mascot.png')}
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

          <View className="mx-4 mt-8">
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
