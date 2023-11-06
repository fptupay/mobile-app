import { View } from 'react-native'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText } from '@/components/Themed'
import { useEffect, useState } from 'react'
import {
  generateOTPPin,
  generateSharedKey,
  getDeviceId,
  successResponseStatus
} from '@/utils/helper'
import * as SecureStore from 'expo-secure-store'
import TextButton from '@/components/buttons/TextButton'
import { useMutation } from '@tanstack/react-query'
import { confirmTransfer } from '@/api/transfer'
import { TransferConfirmSchema } from '@/schemas/transfer-schema'
import { useTransactionStore } from '@/stores/bankStore'
import Toast from 'react-native-toast-message'
import * as Clipboard from 'expo-clipboard'
import useCountdown from '@/hooks/useCountdown'
import { router } from 'expo-router'

export default function TransactionOTPScreen() {
  const [smartOTP, setSmartOTP] = useState('')
  const [copiedSmartOTP, setCopiedSmartOTP] = useState('')
  const transactionId = useTransactionStore((state) => state.transactionId)
  const setTransactionId = useTransactionStore(
    (state) => state.setTransactionId
  )
  const smartOTPTransactionId = useTransactionStore(
    (state) => state.smartOTPTransactionId
  )
  const setTransactionDetails = useTransactionStore(
    (state) => state.setTransactionDetails
  )
  const { secondsLeft, start } = useCountdown()

  useEffect(() => {
    const fetchData = async () => {
      const savedPin = (await SecureStore.getItemAsync('pin')) as string
      const deviceId = await getDeviceId()
      const sharedKey = await generateSharedKey(savedPin, deviceId)

      const generatedSmartOTP = await generateOTPPin(sharedKey)
      setSmartOTP(generatedSmartOTP)
    }

    fetchData().catch((error) => {
      console.log(error)
    })
    start(30)
  }, [])

  const confirmTransferMutation = useMutation({
    mutationFn: (data: TransferConfirmSchema) =>
      confirmTransfer(data, smartOTPTransactionId),
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        router.push('/transfer/transfer-successful')
        setTransactionDetails(data.data)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      }
    }
  })

  const handleConfirmTransfer = () => {
    confirmTransferMutation.mutate({
      fund_transfer_id: transactionId,
      otp: copiedSmartOTP
    })
    setTransactionId('')
  }

  const handleCopyOTP = async () => {
    await Clipboard.setStringAsync(smartOTP)
    const text = await Clipboard.getStringAsync()
    setCopiedSmartOTP(text)
  }

  return (
    <SharedLayout href="/account/home" title="Nhập mã OTP">
      <View className="flex-1 pt-8 space-y-8">
        <View>
          <NormalText className="text-tertiary mt-1">
            Mã xác thực giao dịch (OTP) có hiệu lực trong vòng {secondsLeft}{' '}
            giây
          </NormalText>
        </View>

        {/* OTP 6 digits */}
        <View className="bg-zinc-100 rounded-md py-3 mb-4">
          <MediumText className="text-primary text-2xl text-center tracking-[8px]">
            {smartOTP}
          </MediumText>
        </View>
        <TextButton text="Nhập OTP" type="outline" onPress={handleCopyOTP} />

        <View className="bg-zinc-100 rounded-md py-3 mt-2">
          <MediumText className="text-primary text-2xl text-center tracking-[8px]">
            {copiedSmartOTP}
          </MediumText>
        </View>
      </View>
      <View className="mt-auto mb-4">
        <TextButton
          text="Xác nhận"
          type="primary"
          onPress={handleConfirmTransfer}
          disable={confirmTransferMutation.isLoading || !copiedSmartOTP}
          loading={confirmTransferMutation.isLoading}
        />
      </View>
    </SharedLayout>
  )
}
