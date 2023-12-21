import { getDNGBillByFeeType } from '@/api/bill'
import CustomIcon from '@/components/Icon'
import LoadingSpin from '@/components/LoadingSpin'
import { Modal } from '@/components/Modal'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { usePaymentStore } from '@/stores/paymentStore'
import { IconProps } from '@/types/Icon.type'
import { useQueries } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'

interface PaymentItemProps {
  title?: string
  icon: IconProps['name']
  href?: any
  amount?: number
  type?: string
}

const PaymentItem = ({ title, icon, href, amount, type }: PaymentItemProps) => {
  const { pendingBill } = usePaymentStore()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModal2Visible, setIsModal2Visible] = useState(false)

  const handlePaymentItemPress = (href: any) => {
    if (pendingBill !== null && title == 'Ký túc xá') {
      setIsModalVisible(true)
    }
    if (
      (title === 'Học phí kỳ tiếp' && amount === 0) ||
      (title === 'Phí đơn từ' && amount === 0)
    ) {
      setIsModal2Visible(true)
    } else if (title === 'Ký túc xá') {
      router.push(href)
    } else {
      router.push({
        pathname: '/payments/payment-bill',
        params: { type: type }
      } as any)
    }
  }

  return (
    <>
      <TouchableOpacity
        className="p-4 mb-4 border flex-row justify-between items-center border-gray-300 rounded-lg"
        onPress={() => handlePaymentItemPress(href)}
        activeOpacity={0.8}
      >
        <View className="flex-row">
          <CustomIcon name={icon} size={24} color="#374151" />
          <MediumText className="text-secondary ml-2">{title}</MediumText>
        </View>
        <View>
          <CustomIcon name="ChevronRight" size={24} color="#374151" />
        </View>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title="Lưu ý" />
          <Modal.Body>
            <NormalText className="text-tertiary">
              Hệ thống ghi nhận bạn vẫn còn giao dịch chưa thanh toán. Hãy hoàn
              thành nó trước khi thực hiện giao dịch mới nhé.
            </NormalText>

            <View className="mt-6 w-full">
              <TextButton
                text="Đi đến giao dịch"
                type="primary"
                onPress={() => router.push('/payments/payment-bill')}
              />
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>

      <Modal isVisible={isModal2Visible}>
        <Modal.Container>
          <Modal.Header title="Lưu ý" />
          <Modal.Body>
            <NormalText className="text-tertiary">
              Bạn đang không có khoản{' '}
              {title === 'Học phí kỳ tiếp' ? 'học phí' : 'phí đơn từ'} nào cần
              thanh toán.
            </NormalText>

            <View className="mt-6 w-full">
              <TextButton
                text="Đóng"
                type="primary"
                onPress={() => setIsModal2Visible(false)}
              />
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </>
  )
}

export default function PaymentsScreen() {
  const [tuitionData, otherFeeData] = useQueries({
    queries: [
      {
        queryKey: ['tuition'],
        queryFn: () => getDNGBillByFeeType('hp')
      },
      {
        queryKey: ['otherFee'],
        queryFn: () => getDNGBillByFeeType('khac')
      }
    ]
  })
  console.log(
    '🚀 ~ file: payments.tsx:121 ~ PaymentsScreen ~ otherFeeData:',
    otherFeeData.data
  )
  console.log(
    '🚀 ~ file: payments.tsx:121 ~ PaymentsScreen ~ tuitionData:',
    tuitionData.data
  )

  return (
    <SharedLayout
      backHref="/account/home"
      questionHref="/instruction/payment-instruction"
      title="Thanh toán"
      hasInstruction
    >
      <SemiText className="mt-4 text-secondary">
        Lựa chọn các khoản nộp
      </SemiText>

      {otherFeeData && tuitionData ? (
        <ScrollView className="mt-4">
          <PaymentItem
            title="Học phí kỳ tiếp"
            icon="GraduationCap"
            href="payment-bill"
            amount={
              tuitionData &&
              tuitionData.data &&
              tuitionData.data.success &&
              tuitionData.data.data &&
              tuitionData.data.data[0]
                ? tuitionData.data.data[0].amount
                : 0
            }
            type="hp"
          />
          <PaymentItem
            title="Ký túc xá"
            icon="Home"
            href="/payments/dormitory-fee"
            amount={0}
            type="ktx"
          />
          <PaymentItem
            title="Phí đơn từ"
            icon="MoreHorizontal"
            href="payment-bill"
            amount={
              otherFeeData &&
              otherFeeData.data &&
              otherFeeData.data.success &&
              otherFeeData.data.data &&
              otherFeeData.data.data[0]
                ? otherFeeData.data.data[0].amount
                : 0
            }
            type="khac"
          />
        </ScrollView>
      ) : (
        <LoadingSpin />
      )}
    </SharedLayout>
  )
}
