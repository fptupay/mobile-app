import CustomIcon from '@/components/Icon'
import { Modal } from '@/components/Modal'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { usePaymentStore } from '@/stores/paymentStore'
import { IconProps } from '@/types/Icon.type'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'

interface PaymentItemProps {
  title?: string
  icon: IconProps['name']
  href?: any
}

const PaymentItem = ({ title, icon, href }: PaymentItemProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { pendingBill } = usePaymentStore()

  const handlePaymentItemPress = (href: any) => {
    if (pendingBill && title === 'Ký túc xá') {
      setIsModalVisible(true)
    } else {
      router.push(href)
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
                onPress={() => router.push('/payments/dormitory-checkout')}
              />
            </View>
            <View className="mt-2 w-full">
              <TextButton
                text="Đóng"
                type="secondary"
                onPress={() => setIsModalVisible(false)}
              />
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </>
  )
}

export default function PaymentsScreen() {
  return (
    <SharedLayout
      backHref="/account/home"
      questionHref="/instruction/payment-instruction"
      title="Thanh toán"
      hasInstruction
      isTabItem
    >
      <SemiText className="mt-4 text-secondary">
        Lựa chọn các khoản nộp
      </SemiText>

      <ScrollView className="mt-4">
        <PaymentItem
          title="Học phí"
          icon="GraduationCap"
          href="/payments/tuition-list"
        />
        <PaymentItem
          title="Ký túc xá"
          icon="Home"
          href="/payments/dormitory-fee"
        />
        <PaymentItem
          title="Phí đơn từ"
          icon="MoreHorizontal"
          href="/payments/other-fee-list"
        />
      </ScrollView>
    </SharedLayout>
  )
}
