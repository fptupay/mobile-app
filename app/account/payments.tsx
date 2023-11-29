import { getDNGBillByFeeType } from '@/api/bill'
import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, SemiText } from '@/components/Themed'
import { IconProps } from '@/types/Icon.type'
import { formatMoney } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'

interface PaymentItemProps {
  title?: string
  icon: IconProps['name']
  href?: any
  amount?: number
}

const PaymentItem = ({ title, icon, href, amount }: PaymentItemProps) => {
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
          <MediumText className="text-primary">
            {amount && formatMoney(amount)}đ
          </MediumText>
        ) : (
          <CustomIcon name="ChevronRight" size={24} color="#374151" />
        )}
      </View>
    </TouchableOpacity>
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
        {data?.success === true ? (
          <PaymentItem
            title="Học phí kỳ tiếp"
            icon="GraduationCap"
            href="payment-bill"
            amount={data?.data[0]?.amount}
          />
        ) : null}
        <PaymentItem title="Đăng ký môn học" icon="Book" href="subject-fee" />
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
