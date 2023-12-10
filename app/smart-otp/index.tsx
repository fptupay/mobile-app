import { View, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import SharedLayout from '@/components/SharedLayout'
import { useMutation } from '@tanstack/react-query'
import { checkStatusSmartOTP } from '@/api/otp'
import { useAccountStore } from '@/stores/accountStore'
import { getDeviceId, successResponseStatus } from '@/utils/helper'
import { MediumText, NormalText } from '@/components/Themed'
import LoadingSpin from '@/components/LoadingSpin'
import { ChevronRight, Lock, RotateCcw } from 'lucide-react-native'
import { router } from 'expo-router'

export default function SmartOTPSetupScreen() {
  const { username } = useAccountStore((state) => state.details)
  const [hasRegisteredOTP, setHasRegisteredOTP] = useState(null)

  const { mutateAsync } = useMutation({
    mutationFn: checkStatusSmartOTP,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setHasRegisteredOTP(data.data?.status)
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const smartOTPTransactionId = await SecureStore.getItemAsync(
          `${username}_transId`
        )
        const deviceId = await getDeviceId()

        await mutateAsync({
          device_id: deviceId,
          version: Platform.Version.toString(),
          trans_id: smartOTPTransactionId
        })
      } catch (error) {
        console.error(error)
      }
    }

    void fetchData()
  }, [])

  return (
    <SharedLayout title="Thiết lập Smart OTP">
      <View className="mt-6">
        {hasRegisteredOTP === null ? (
          <LoadingSpin />
        ) : (
          <>
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
          </>
        )}
      </View>
    </SharedLayout>
  )
}
