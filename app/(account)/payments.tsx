import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { IconProps } from '@/types/Icon.type'
import React from 'react'
import { ScrollView, View } from 'react-native'

interface PaymentItemProps {
  title?: string
  icon: IconProps['name']
}

const PaymentItem = ({ title, icon }: PaymentItemProps) => {
  return (
    <View className="p-4 mb-4 border flex-row justify-between items-center border-gray-800 rounded-lg">
      <View className="flex-row">
        <CustomIcon name={icon} size={24} color="#000" />
        <MediumText className="text-secondary ml-2">{title}</MediumText>
      </View>
      <View>
        {title === 'Học phí kỳ tiếp' ? (
          <MediumText className="text-primary">1.000.000đ</MediumText>
        ) : (
          <CustomIcon name="ChevronDown" size={24} color="#000" />
        )}
      </View>
    </View>
  )
}

export default function PaymentsScreen() {
  return (
    <SharedLayout href="/index" title="Thanh toán">
      <SemiText className="mt-4">Lựa chọn các khoản nộp</SemiText>
      <ScrollView className="mt-4">
        <PaymentItem title="Học phí kỳ tiếp" icon="GraduationCap" />
        <PaymentItem title="Đăng ký học" icon="Book" />
        <PaymentItem title="Ký túc xá" icon="Home" />
        <PaymentItem title="Các khoản phí khác" icon="MoreHorizontal" />
      </ScrollView>
      <View className="mt-auto mb-4">
        <TextButton href="/payment-checkout" text="Tiếp tục" type="primary" />
      </View>
    </SharedLayout>
  )
}
