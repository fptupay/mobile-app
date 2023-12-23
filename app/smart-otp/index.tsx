import { View, TouchableOpacity } from 'react-native'
import SharedLayout from '@/components/SharedLayout'
import { useAccountStore } from '@/stores/accountStore'
import { MediumText, NormalText } from '@/components/Themed'
import { ChevronRight, Lock, RotateCcw } from 'lucide-react-native'
import { router } from 'expo-router'

export default function SmartOTPSetupScreen() {
  const { hasRegisteredOTP } = useAccountStore()
  return (
    <SharedLayout title="Thiết lập Smart OTP">
      <View className="mt-6">
        <View className="flex flex-row justify-between items-baseline">
          <NormalText className="text-secondary">
            Trạng thái Smart OTP
          </NormalText>
          <View
            className={`rounded-full px-2 py-0.5 mr-2 border ${
              hasRegisteredOTP ? 'border-primary' : 'border-gray-300'
            }`}
          >
            <NormalText
              className={` ${
                hasRegisteredOTP ? 'text-primary' : 'text-tertiary'
              }`}
            >
              {hasRegisteredOTP ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
            </NormalText>
          </View>
        </View>

        {!hasRegisteredOTP ? (
          <TouchableOpacity
            className="px-4 py-2 mt-6 rounded-lg flex flex-row items-center justify-between border border-gray-300"
            activeOpacity={0.8}
            onPress={() => router.push('/smart-otp/introduction')}
          >
            <View className="flex flex-row gap-3 items-center w-3/4">
              <Lock size={24} color="#666" />
              <View>
                <MediumText className="text-secondary">
                  Đăng ký Smart OTP
                </MediumText>
                <NormalText className="text-tertiary text-xs">
                  Đăng ký Smart OTP để xác thực các giao dịch
                </NormalText>
              </View>
            </View>

            <ChevronRight name="ArrowRight" size={24} color="#666" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="px-4 py-2 mt-4 rounded-lg flex flex-row items-center justify-between border border-gray-300"
            activeOpacity={0.8}
            onPress={() => router.push('/smart-otp/old-pin')}
          >
            <View className="flex flex-row gap-3 items-center w-3/4">
              <RotateCcw size={24} color="#666" />
              <View>
                <MediumText className="text-secondary">
                  Đổi PIN Smart OTP
                </MediumText>
                <NormalText className="text-tertiary text-xs">
                  Dùng để thay đổi mã PIN OTP hiện tại
                </NormalText>
              </View>
            </View>

            <ChevronRight name="ArrowRight" size={24} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </SharedLayout>
  )
}
