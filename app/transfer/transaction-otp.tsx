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
import { useBankStore } from '@/stores/bankStore'
import { useTransactionStore } from '@/stores/transactionStore'
import Toast from 'react-native-toast-message'
import * as Clipboard from 'expo-clipboard'
import useCountdown from '@/hooks/useCountdown'
import { router } from 'expo-router'
import { useAccountStore } from '@/stores/accountStore'
import { withdrawConfirm } from '@/api/bank'
import { MoneyConfirmSchema } from '@/schemas/bank-schema'
import { isAxiosError } from 'axios'
import { useTransferStore } from '@/stores/transferStore'
import { payBill } from '@/api/bill'
import { usePaymentStore } from '@/stores/paymentStore'
import { TRANSACTION_TYPE } from '@/constants/payment'

export default function TransactionOTPScreen() {
  const [smartOTP, setSmartOTP] = useState('')
  const [copiedSmartOTP, setCopiedSmartOTP] = useState('')
  const { clearPendingBill } = usePaymentStore()

  const { fundTransferId, setTransactionDetails } = useTransactionStore()
  const { username } = useAccountStore((state) => state.details)
  const { transactionId, transactionType, feeType } = useTransferStore()

  const selectedBank = useBankStore((state) => state.selectedBank)
  const { secondsLeft, start } = useCountdown()

  const fetchData = async () => {
    const savedPin = (await SecureStore.getItemAsync(username)) as string
    const deviceId = await getDeviceId()
    const sharedKey = await generateSharedKey(savedPin, deviceId)

    const generatedSmartOTP = await generateOTPPin(sharedKey)
    setSmartOTP(generatedSmartOTP)
  }

  useEffect(() => {
    const fetchAndStartTimer = async () => {
      await fetchData()
      start(30)
    }

    fetchAndStartTimer().catch((error) => {
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: error.message
      })
    })

    const intervalId = setInterval(async () => {
      await fetchAndStartTimer()
    }, 30000)

    return () => clearInterval(intervalId)
  }, [username])

  const confirmTransferMutation = useMutation({
    mutationFn: async (data: TransferConfirmSchema) => {
      const smartOTPTransactionId = await SecureStore.getItemAsync(
        `${username}_transId`
      )
      return confirmTransfer(data, smartOTPTransactionId as string)
    },
    onSuccess: (data) => {
      console.log('transfer called')
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

  const withdrawMutation = useMutation({
    mutationFn: async (data: MoneyConfirmSchema) => {
      const smartOTPTransactionId = await SecureStore.getItemAsync(
        `${username}_transId`
      )
      return withdrawConfirm(data, smartOTPTransactionId as string)
    },
    onSuccess: (data) => {
      console.log('transfer called')
      if (!successResponseStatus(data)) {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      } else {
        router.push({
          pathname: '/main-features/withdraw/withdraw-confirmation',
          params: { transId: data.data.trans_id }
        })
      }
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: error.response?.data?.message
        })
      }
    }
  })

  const payBillMutation = useMutation({
    mutationFn: async (data: any) => {
      const smartOTPTransactionId = await SecureStore.getItemAsync(
        `${username}_transId`
      )
      return payBill(data, smartOTPTransactionId as string)
    },
    onSuccess: (data) => {
      console.log('transfer called')
      if (successResponseStatus(data)) {
        clearPendingBill()
        router.push({
          pathname: '/payments/payment-success',
          params: { transId: data?.data?.transaction_id }
        })
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
    if (transactionType === TRANSACTION_TYPE.P2P) {
      confirmTransferMutation.mutate({
        fund_transfer_id: fundTransferId,
        otp: copiedSmartOTP
      })
    } else if (transactionType === TRANSACTION_TYPE.PAYMENT) {
      payBillMutation.mutate({
        otp: copiedSmartOTP,
        fee_type: feeType,
        trans_id: transactionId
      })
    } else if (transactionType === TRANSACTION_TYPE.WITHDRAW) {
      withdrawMutation.mutate({
        link_account_id: selectedBank,
        trans_id: transactionId,
        otp: copiedSmartOTP
      })
    } else {
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: 'Không xác định được loại giao dịch'
      })
    }
  }

  const handleCopyOTP = async () => {
    await Clipboard.setStringAsync(smartOTP)
    const text = await Clipboard.getStringAsync()
    setCopiedSmartOTP(text)
  }

  return (
    <SharedLayout backHref="/account/home" title="Nhập mã OTP">
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
          disable={
            confirmTransferMutation.isLoading ||
            withdrawMutation.isLoading ||
            payBillMutation.isLoading ||
            !copiedSmartOTP
          }
          loading={
            confirmTransferMutation.isLoading ||
            withdrawMutation.isLoading ||
            payBillMutation.isLoading
          }
        />
      </View>
    </SharedLayout>
  )
}
