import { View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getDNGBillByFeeType } from '@/api/bill'
import SharedLayout from '@/components/SharedLayout'
import DescriptionRowItem from '@/components/DescriptionRowItem'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { formatMoney } from '@/utils/helper'
import { router, useLocalSearchParams } from 'expo-router'
import LoadingSpin from '@/components/LoadingSpin'
import { useTransferStore } from '@/stores/transferStore'
import { useState } from 'react'
import { useAccountStore } from '@/stores/accountStore'
import * as SecureStore from 'expo-secure-store'
import { Modal } from '@/components/Modal'
import { TRANSACTION_TYPE } from '@/constants/payment'

export default function PaymentBillScreen() {
  const { type } = useLocalSearchParams()
  const [isVisible, setIsVisible] = useState(false)

  const { hasRegisteredOTP } = useAccountStore()
  const { setTransactionType, setTransactionId, setFeeType } =
    useTransferStore()
  const { username } = useAccountStore((state) => state.details)

  const { data: bill, isLoading } = useQuery({
    queryKey: ['bill'],
    queryFn: () => getDNGBillByFeeType(type as string),
    onSuccess: (data) => {
      setFeeType(data?.data[0].type)
      setTransactionType(TRANSACTION_TYPE.PAYMENT)
      setTransactionId(data?.data[0].transaction_id)
    }
  })

  const handleVerifyBill = async () => {
    const existingPIN = await SecureStore.getItemAsync(username)

    if (!existingPIN && hasRegisteredOTP === false) {
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
