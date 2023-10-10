import React from 'react'
import SharedLayout from '@/components/SharedLayout'
import { NormalText, SemiText, View } from '@/components/Themed'
import CustomIcon from '@/components/Icon'
import TextButton from '@/components/buttons/TextButton'
import { router } from 'expo-router'

export default function TransactionDetailScreen() {
  return (
    <SharedLayout title="Chi tiết giao dịch" href="/transactions">
      <View className="flex flex-row justify-between mt-4">
        <SemiText>Chuyển tiền nhanh</SemiText>
        <CustomIcon name="Share" size={20} color="#000" />
      </View>

      <SemiText className="text-4xl text-center mt-4"> -50.000 đ</SemiText>
      <View className="h-[1px] mt-4 w-full mx-auto bg-gray-200" />

      <View className="mt-4">
        <View className="mt-2 flex space-y-4">
          <View className="flex-row justify-between">
            <NormalText className="text-tertiary">Người nhận</NormalText>
            <NormalText>Lỗi giao dịch</NormalText>
          </View>
          <View className="flex-row justify-between">
            <NormalText className="text-tertiary">Mã sinh viên</NormalText>
            <NormalText>HE160005</NormalText>
          </View>
          <View className="flex-row flex-wrap justify-between">
            <NormalText className="text-tertiary">
              Nội dung giao dịch
            </NormalText>
            <NormalText>HA GIA KINH chuyen tien sieu nhanh luon</NormalText>
          </View>
          <View className="flex-row justify-between">
            <NormalText className="text-tertiary">Thời gian</NormalText>
            <NormalText>09:10 - 04/10/2023</NormalText>
          </View>
          <View>
            <NormalText className="text-tertiary">Mã giao dịch</NormalText>
            <NormalText>123456789</NormalText>
          </View>
          <View>
            <NormalText className="text-tertiary">Phản hồi</NormalText>
            <NormalText>Em đến Dịch vụ Sinh viên 102L nhé!</NormalText>
          </View>
        </View>
      </View>

      <View className="mt-auto mb-4">
        <TextButton
          text="Trợ giúp"
          type="primary"
          onPress={() => {
            router.push('/help-center/create-request')
          }}
        />
      </View>
    </SharedLayout>
  )
}
