import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, SemiText } from '@/components/Themed'
import { IconProps } from '@/types/Icon.type'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'

interface PaymentItemProps {
  title?: string
  icon: IconProps['name']
  href?: any
}

const PaymentItem = ({ title, icon, href }: PaymentItemProps) => {
  return (
    <TouchableOpacity
      className="p-4 mb-4 border flex-row justify-between items-center border-gray-300 rounded-lg"
      onPress={() =>
        router.push({ pathname: 'payments/[id]', params: { id: href } } as any)
      }
      activeOpacity={0.8}
    >
      <View className="flex-row">
        <CustomIcon name={icon} size={24} color="#374151" />
        <MediumText className="text-secondary ml-2">{title}</MediumText>
      </View>
      <View>
        {title === 'Học phí kỳ tiếp' ? (
          <MediumText className="text-primary">1.000.000đ</MediumText>
        ) : (
          <CustomIcon name="ChevronRight" size={24} color="#374151" />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default function PaymentsScreen() {
  return (
    <SharedLayout href="/index" title="Thanh toán">
      <SemiText className="mt-4">Lựa chọn các khoản nộp</SemiText>
      <ScrollView className="mt-4">
        <PaymentItem
          title="Học phí kỳ tiếp"
          icon="GraduationCap"
          href="semester-fee-confirmation"
        />
        <PaymentItem title="Đăng ký học" icon="Book" href="subject-fee" />
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
