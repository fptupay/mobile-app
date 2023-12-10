import { View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import SharedLayout from '@/components/SharedLayout'
import { useMutation } from '@tanstack/react-query'
import { checkStatusSmartOTP } from '@/api/otp'
import { useAccountStore } from '@/stores/accountStore'
import { getDeviceId, successResponseStatus } from '@/utils/helper'
import { NormalText } from '@/components/Themed'

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
          trans_id: smartOTPTransactionId as string
        })
      } catch (error) {
        console.error(error)
      }
    }

    void fetchData()
  }, [])

  return (
    <SharedLayout title="Thiết lập Smart OTP">
      <View>
        {hasRegisteredOTP === null ? (
          <NormalText className="text-secondary">Loading...</NormalText>
        ) : (
          <NormalText className="text-secondary">
            {hasRegisteredOTP
              ? 'Bạn đã đăng ký Smart OTP'
              : 'Bạn chưa đăng ký Smart OTP'}
          </NormalText>
        )}
      </View>
    </SharedLayout>
  )
}
