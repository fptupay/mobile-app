import { getDNGBillByFeeType } from '@/api/bill'
import CustomIcon from '@/components/Icon'
import { Modal } from '@/components/Modal'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { usePaymentStore } from '@/stores/paymentStore'
import { IconProps } from '@/types/Icon.type'
import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'

interface PaymentItemProps {
  title?: string
  icon: IconProps['name']
  href?: any
  amount?: number
}

const PaymentItem = ({ title, icon, href, amount }: PaymentItemProps) => {
  const { pendingBill } = usePaymentStore()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModal2Visible, setIsModal2Visible] = useState(false)

  const handlePaymentItemPress = (href: any) => {
    if (pendingBill !== null) {
      setIsModalVisible(true)
    }
    if (title === 'Học phí kỳ tiếp' && amount === 0) {
      setIsModal2Visible(true)
      return
    } else {
      router.push({
        pathname: '/payments/[id]',
        params: { id: href }
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
              Bạn đang không có khoản học phí nào cần thanh toán.
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
  const { data } = useQuery({
    queryKey: ['payments'],
    queryFn: () => getDNGBillByFeeType('hp')
  })

  return (
    <SharedLayout
      backHref="/account/home"
      questionHref="/instruction/payment-instruction"
      title="Thanh toán"
    >
      <SemiText className="mt-4 text-secondary">
        Lựa chọn các khoản nộp
      </SemiText>
      <ScrollView className="mt-4">
        <PaymentItem
          title="Học phí kỳ tiếp"
          icon="GraduationCap"
          href="payment-bill"
          amount={data?.data[0]?.amount || 0}
        />
        <PaymentItem title="Ký túc xá" icon="Home" href="dormitory-fee" />
        <PaymentItem
          title="Các khoản phí khác"
          icon="MoreHorizontal"
          href="application-fee"
        />
      </ScrollView>
    </SharedLayout>
  )
}
