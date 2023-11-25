import { verifyTransfer } from '@/api/transfer'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { TransferVerifySchema } from '@/schemas/transfer-schema'
import { useAccountStore } from '@/stores/accountStore'
import { useTransactionStore } from '@/stores/bankStore'
import {
  convertNumberToVietnameseWords,
  formatMoney,
  successResponseStatus
} from '@/utils/helper'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { router, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import { Image } from 'expo-image'
import Toast from 'react-native-toast-message'
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'
import { Modal } from '@/components/Modal'

export default function TransferConfirmationScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const { full_name, username } = useAccountStore((state) => state.details)
  const { amount, message, studentCode, owner } = useLocalSearchParams()
  const setTransactionId = useTransactionStore(
    (state) => state.setTransactionId
  )

  const verifyTransferMutation = useMutation({
    mutationFn: (data: TransferVerifySchema) => verifyTransfer(data),
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setTransactionId(data.data.fund_transfer_id)
        router.push('/transfer/otp')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
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

  const handleVerifyTransfer = async () => {
    const existingPIN = await SecureStore.getItemAsync(username)
    if (!existingPIN) {
      setIsVisible(true)
    } else {
      verifyTransferMutation.mutate({
        data: studentCode as string,
        amount: amount as string,
        content: message as string
      })
    }
  }

  return (
    <>
      <SharedLayout title="Xác nhận thông tin" backHref="/account/payments">
        {/* Header */}
        <View className="mt-4 flex items-center">
          <NormalText className="text-tertiary">Số tiền chuyển</NormalText>
          <SemiText className="text-4xl mt-2">
            {formatMoney(amount as string)}đ
          </SemiText>
        </View>

        <View className="bg-zinc-50 rounded-lg mt-4 p-2 space-y-4 shadow-md shadow-zinc-500">
          {/* Origin */}
          <View>
            <NormalText className="text-tertiary">Từ tài khoản</NormalText>
            <View className="flex flex-row gap-x-2 mt-2 items-center">
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/FPTUCT.png'
                }}
                className="w-12 h-12 rounded-full"
              />
              <View>
                <MediumText className="text-base">{full_name}</MediumText>
                <NormalText className="text-tertiary">{username}</NormalText>
              </View>
            </View>
          </View>

          {/* Destination */}
          <View>
            <NormalText className="text-tertiary">Đến tài khoản</NormalText>
            <View className="flex flex-row gap-x-2 mt-2 items-center">
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/FPTUCT.png'
                }}
                className="w-12 h-12 rounded-full"
              />
              <View>
                <MediumText className="text-base">{owner}</MediumText>
                <NormalText className="text-tertiary">{studentCode}</NormalText>
              </View>
            </View>
          </View>
        </View>

        {/* Details */}
        <View className="my-4">
          <View className="mt-2 flex space-y-4">
            <View className="flex-row justify-between">
              <NormalText className="text-tertiary">Loại thanh toán</NormalText>
              <NormalText>Chuyển tiền nhanh</NormalText>
            </View>
            <View className="flex-row justify-between w-full">
              <NormalText className="text-tertiary flex-1">
                Số tiền bằng chữ
              </NormalText>
              <NormalText className="text-right flex-1 flex flex-wrap">
                {convertNumberToVietnameseWords(amount as string)}
              </NormalText>
            </View>
            <View className="flex-row justify-between w-full">
              <NormalText className="text-tertiary flex-1">Nội dung</NormalText>
              <NormalText className="text-right flex-1 flex flex-wrap">
                {message}
              </NormalText>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View className="mt-auto mb-4">
          <TextButton
            text="Xác nhận"
            type="primary"
            onPress={handleVerifyTransfer}
            loading={verifyTransferMutation.isLoading}
            disable={verifyTransferMutation.isLoading}
          />
        </View>
      </SharedLayout>

      <Modal isVisible={isVisible}>
        <Modal.Container>
          <Modal.Header title="Thông báo" />
          <Modal.Body>
            <NormalText className="text-tertiary">
              Vui lòng đăng ký phương thức xác thực Smart OTP trước khi thực
              diện giao dịch nhé!
            </NormalText>

            <View className="mt-6 flex flex-row gap-x-3">
              <View className="flex-1">
                <TextButton
                  text="Đăng ký"
                  type="primary"
                  onPress={() => router.push('/smart-otp/introduction')}
                />
              </View>
              <View className="flex-1">
                <TextButton
                  text="Không"
                  type="secondary"
                  onPress={() => setIsVisible(false)}
                />
              </View>
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </>
  )
}
