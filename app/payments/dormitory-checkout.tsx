import { Platform, View } from 'react-native'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText } from '@/components/Themed'
import { usePaymentStore } from '@/stores/paymentStore'
import DescriptionRowItem from '@/components/DescriptionRowItem'
import { formatMoney, getDeviceId, successResponseStatus } from '@/utils/helper'
import TextButton from '@/components/buttons/TextButton'
import { router } from 'expo-router'
import { TRANSACTION_TYPE } from '@/constants/payment'
import { useTransferStore } from '@/stores/transferStore'
import * as SecureStore from 'expo-secure-store'
import { useAccountStore } from '@/stores/accountStore'
import { useMutation } from '@tanstack/react-query'
import { checkStatusSmartOTP } from '@/api/otp'
import { useState } from 'react'
import { Modal } from '@/components/Modal'

export default function DormitoryCheckoutScreen() {
  const [hasRegisteredOTP, setHasRegisteredOTP] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const { pendingBill } = usePaymentStore()
  const { setTransactionType, setTransactionId, setFeeType } =
    useTransferStore()
  const { username } = useAccountStore((state) => state.details)

  const dormitoryBill = [
    { label: 'DOM', description: pendingBill?.dom.split('_').join(' ') },
    { label: 'Tầng', description: `Tầng ${pendingBill?.floor}` },
    { label: 'Loại phòng', description: pendingBill?.type },
    { label: 'Học kỳ', description: pendingBill?.semester },
    { label: 'Số tiền', description: `${formatMoney(pendingBill?.amount)} đ` },
    { label: 'Mã giao dịch', description: pendingBill?.trans_id },
    { label: 'Ghi chú', description: pendingBill?.note }
  ]

  const checkSmartOTPStatusMutation = useMutation({
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

  const handleVerifyBooking = async () => {
    setFeeType('KTX')
    setTransactionType(TRANSACTION_TYPE.PAYMENT)
    setTransactionId(pendingBill.trans_id)

    const existingPIN = await SecureStore.getItemAsync(username)
    const smartOTPTransactionId = await SecureStore.getItemAsync(
      `${username}_transId` || ''
    )
    const deviceId = await getDeviceId()

    await checkSmartOTPStatusMutation.mutateAsync({
      device_id: deviceId,
      version: Platform.Version.toString(),
      trans_id: smartOTPTransactionId
    })

    if (!existingPIN && hasRegisteredOTP === false) {
      setIsVisible(true)
    } else {
      router.replace('/transfer/pin')
    }
  }

  return (
    <>
      <SharedLayout title="Hoá đơn">
        <MediumText className="mt-6 text-secondary">
          Vui lòng kiểm tra lại chi tiết đặt phòng ký túc xá trước khi thanh
          toán nhé!
        </MediumText>
        <View className="mt-4">
          {dormitoryBill.map((item: any) => (
            <DescriptionRowItem
              key={item.label}
              label={item.label}
              description={item.description}
            />
          ))}
        </View>
        <View className="mt-auto mb-4">
          <TextButton
            text="Tiếp tục"
            type="primary"
            onPress={handleVerifyBooking}
            loading={checkSmartOTPStatusMutation.isLoading}
            disable={checkSmartOTPStatusMutation.isLoading}
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
