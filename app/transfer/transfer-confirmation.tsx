import { verifyTransfer } from '@/api/transfer'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { TransferVerifySchema } from '@/schemas/transfer-schema'
import { useAccountStore } from '@/stores/accountStore'
import {
  convertNumberToVietnameseWords,
  formatMoney,
  getDeviceId,
  successResponseStatus
} from '@/utils/helper'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { router, useLocalSearchParams } from 'expo-router'
import { Platform, View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import Toast from 'react-native-toast-message'
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { useTransferStore } from '@/stores/transferStore'
import { checkStatusSmartOTP } from '@/api/otp'
import { TRANSACTION_TYPE } from '@/constants/payment'
import { useTransactionStore } from '@/stores/transactionStore'

export default function TransferConfirmationScreen() {
  const { amount, message, studentCode, receiver } = useLocalSearchParams()

  const [isVisible, setIsVisible] = useState(false)
  const [hasRegisteredOTP, setHasRegisteredOTP] = useState(true)

  const { full_name, username } = useAccountStore((state) => state.details)
  const avatar = useAccountStore((state) => state.avatar)
  const receiverAvatar = useTransferStore((state) => state.receiverAvatar)
  const { setTransactionType } = useTransferStore()
  const { setFundTransferId } = useTransactionStore()

  const verifyTransferMutation = useMutation({
    mutationFn: (data: TransferVerifySchema) => verifyTransfer(data),
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setTransactionType(TRANSACTION_TYPE.P2P)
        setFundTransferId(data.data?.fund_transfer_id)

        router.push('/transfer/pin')
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

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: checkStatusSmartOTP,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        if (data.data?.status === true) {
          setHasRegisteredOTP(true)
        } else {
          setHasRegisteredOTP(false)
        }
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleVerifyTransfer = async () => {
    const existingPIN = await SecureStore.getItemAsync(username)
    const smartOTPTransactionId = await SecureStore.getItemAsync(
      `${username}_transId` || ''
    )
    const deviceId = await getDeviceId()

    await mutateAsync({
      device_id: deviceId,
      version: Platform.Version.toString(),
      trans_id: smartOTPTransactionId
    })

    if (!existingPIN || hasRegisteredOTP === false) {
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
      <SharedLayout title="Xác nhận thông tin">
        {/* Header */}
        <View className="mt-4 flex items-center">
          <NormalText className="text-tertiary">Số tiền chuyển</NormalText>
          <SemiText className="text-4xl mt-2 text-secondary">
            {formatMoney(amount as string)}đ
          </SemiText>
        </View>

        <View
          className="bg-zinc-50 rounded-lg mt-4 p-2 space-y-4"
          style={styles.shadow}
        >
          {/* Origin */}
          <View>
            <NormalText className="text-tertiary">Từ tài khoản</NormalText>
            <View className="flex flex-row gap-x-2 mt-2 items-center">
              <Image
                source={{
                  uri: avatar
                }}
                className="w-12 h-12 rounded-full"
              />
              <View>
                <MediumText className=" text-secondary">{full_name}</MediumText>
                <NormalText className="text-tertiary">
                  {username.toUpperCase()}
                </NormalText>
              </View>
            </View>
          </View>

          {/* Destination */}
          <View>
            <NormalText className="text-tertiary">Đến tài khoản</NormalText>
            <View className="flex flex-row gap-x-2 mt-2 items-center">
              <Image
                source={{
                  uri: receiverAvatar
                }}
                className="w-12 h-12 rounded-full"
              />
              <View>
                <MediumText className=" text-secondary">{receiver}</MediumText>
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
              <NormalText className="text-secondary">
                Chuyển tiền nhanh
              </NormalText>
            </View>
            <View className="flex-row justify-between w-full">
              <NormalText className="text-tertiary flex-1">
                Số tiền bằng chữ
              </NormalText>
              <NormalText className="text-right text-secondary flex-1 flex flex-wrap">
                {convertNumberToVietnameseWords(amount as string)}
              </NormalText>
            </View>
            <View className="flex-row justify-between w-full">
              <NormalText className="text-tertiary flex-1">Nội dung</NormalText>
              <NormalText className="text-right text-secondary flex-1 flex flex-wrap">
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
            loading={verifyTransferMutation.isLoading || isLoading}
            disable={verifyTransferMutation.isLoading || isLoading}
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
                  text="Đóng"
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  }
})
