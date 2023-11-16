import { View, Image } from 'react-native'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getDNGBillByFeeType, payBill } from '@/api/bill'
import SharedLayout from '@/components/SharedLayout'
import DescriptionRowItem from '@/components/DescriptionRowItem'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { successResponseStatus } from '@/utils/helper'
import { Modal } from '@/components/Modal'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

export default function PaymentBillScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const { data: bill } = useQuery({
    queryKey: ['bill'],
    queryFn: () => getDNGBillByFeeType('ktx')
  })

  const billForm = [
    {
      label: 'Mã hóa đơn',
      description: bill.data[0].id
    },
    {
      label: 'Loại hóa đơn',
      description: bill.data[0].type_desc
    },
    {
      label: 'Số tiền',
      description: bill.data[0].amount
    },
    {
      label: 'Nội dung',
      description: bill.data[0].item_name
    },
    {
      label: 'Mã giao dịch',
      description: bill.data[0].transaction_id
    }
  ]

  const payBillMutation = useMutation({
    mutationKey: ['bill'],
    mutationFn: payBill,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        setIsVisible(true)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      }
    }
  })

  const handlePayBill = () => {
    payBillMutation.mutate({
      fee_type: bill.data[0].type,
      trans_id: bill.data[0].transaction_id
    })
  }
  return (
    <>
      <SharedLayout title="Hóa đơn">
        <NormalText className="mt-4">
          Vui lòng kiểm tra lại chi tiết hoá đơn trước khi thanh toán
        </NormalText>
        <View className="mt-8">
          {billForm.map((item: any) => (
            <DescriptionRowItem
              key={item.label}
              label={item.label}
              description={item.description}
            />
          ))}
        </View>

        <View className="mt-auto mb-4">
          <TextButton
            onPress={handlePayBill}
            text="Thanh toán"
            type="primary"
          />
        </View>
      </SharedLayout>

      <Modal isVisible={isVisible}>
        <Modal.Container>
          <View className="flex items-center">
            <Image
              source={require('@/assets/images/tick-circle.png')}
              className="w-36 h-36 mx-auto mb-4"
            />
            <Modal.Header title="Hoàn thành" />
          </View>
          <Modal.Body>
            <MediumText className="text-secondary text-center mb-2">
              Đăng ký ký túc xá thành công
            </MediumText>

            <View className="mt-6 w-full">
              <TextButton
                text="Hoàn tất"
                type="primary"
                onPress={() => router.push('/account/home')}
                loading={payBillMutation.isLoading}
                disable={payBillMutation.isLoading}
              />
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </>
  )
}
