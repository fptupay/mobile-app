import { Platform, View } from 'react-native'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getDNGBillByFeeType } from '@/api/bill'
import SharedLayout from '@/components/SharedLayout'
import DescriptionRowItem from '@/components/DescriptionRowItem'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { formatMoney, getDeviceId, successResponseStatus } from '@/utils/helper'
import { router, useLocalSearchParams } from 'expo-router'
import LoadingSpin from '@/components/LoadingSpin'
import { useTransferStore } from '@/stores/transferStore'
import { usePaymentStore } from '@/stores/paymentStore'
import { checkStatusSmartOTP } from '@/api/otp'
import { useState } from 'react'
import { useAccountStore } from '@/stores/accountStore'
import * as SecureStore from 'expo-secure-store'
import { Modal } from '@/components/Modal'

export default function PaymentBillScreen() {
  const { type } = useLocalSearchParams()
  const [hasRegisteredOTP, setHasRegisteredOTP] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { setTransactionType, setTransactionId } = useTransferStore()
  const { setPendingBill } = usePaymentStore()
  const { username } = useAccountStore((state) => state.details)

  const { data: bill, isLoading } = useQuery({
    queryKey: ['bill'],
    queryFn: () => getDNGBillByFeeType(type as string),
    onSuccess: (data) => {
      setTransactionType(data?.data[0].type)
      setTransactionId(data?.data[0].transaction_id)

      if (data?.data[0].type === 'KTX') {
        setPendingBill(data?.data[0])
      }
    }
  })

  const checkSmartOTPStatusMutation = useMutation({
    mutationFn: checkStatusSmartOTP,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        if (data.data?.status === true) {
          setHasRegisteredOTP(true)
        }
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleVerifyBill = async () => {
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

    if (!existingPIN || hasRegisteredOTP === false) {
      setIsVisible(true)
    } else {
      router.replace('/transfer/pin')
    }
  }

  const billForm = [
    {
      label: 'Mã hóa đơn',
      description: bill?.data[0]?.id
    },
    {
      label: 'Loại hóa đơn',
      description: bill?.data[0]?.type_desc
    },
    {
      label: 'Số tiền',
      description: bill?.data[0] && formatMoney(bill?.data[0]?.amount)
    },
    {
      label: 'Nội dung',
      description: bill?.data[0]?.item_name
    },
    {
      label: 'Mã giao dịch',
      description: bill?.data[0]?.transaction_id
    }
  ]

  return (
    <>
      <SharedLayout title="Hóa đơn">
        <MediumText className="mt-6 text-secondary">
          Vui lòng kiểm tra lại chi tiết hoá đơn trước khi thanh toán nhé!
        </MediumText>
        <View className="mt-4">
          {isLoading ? (
            <LoadingSpin />
          ) : (
            <View>
              {billForm.map((item: any) => (
                <DescriptionRowItem
                  key={item.label}
                  label={item.label}
                  description={item.description}
                />
              ))}
            </View>
          )}
        </View>

        <View className="mt-auto mb-4">
          <TextButton
            onPress={handleVerifyBill}
            text="Tiếp tục"
            type="primary"
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
