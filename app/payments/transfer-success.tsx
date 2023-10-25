import SharedLayout from '@/components/SharedLayout'
import { NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { getImagePath } from '@/utils/helper'
import React from 'react'
import { Image, View } from 'react-native'

export default function TransferSuccessScreen() {
  return (
    <SharedLayout title="" href="/help-center">
      <View className="mt-12 relative">
        <View className="absolute -top-20 left-0 right-0 justify-center items-center">
          <View className="w-16 h-16 rounded-full bg-green-100 p-1">
            <Image
              source={getImagePath('approved')}
              className="w-full h-full"
            />
          </View>
        </View>

        <View className="mb-4">
          <SemiText className="text-center text-xl text-primary">
            Giao dịch thành công
          </SemiText>
          <SemiText className="text-center text-4xl mt-4">-100.000đ</SemiText>
          <View className="h-[1px] mt-4 w-full mx-auto bg-gray-200" />
          <View className="my-4">
            <View className="mt-2 flex space-y-4">
              <View className="flex-row justify-between">
                <NormalText className="text-tertiary">Người nhận</NormalText>
                <NormalText>HA GIA KINH</NormalText>
              </View>
              <View className="flex-row justify-between">
                <NormalText className="text-tertiary">Mã sinh viên</NormalText>
                <NormalText>HE160005</NormalText>
              </View>
              <View className="flex-row justify-between">
                <NormalText className="text-tertiary">Thời gian</NormalText>
                <NormalText>09:10 - 04/10/2023</NormalText>
              </View>
              <View className="flex-row justify-between">
                <NormalText className="text-tertiary">Nội dung</NormalText>
                <NormalText>Cam on nha</NormalText>
              </View>
              <View className="flex-row justify-between">
                <NormalText className="text-tertiary">Mã giao dịch</NormalText>
                <NormalText>1234567</NormalText>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View className="mt-auto">
        <TextButton text="Về trang chủ" type="primary" href="/account/home" />
      </View>
      <View className="mt-2 mb-4">
        <TextButton
          text="Lưu bạn bè"
          type="secondary"
          href="/transfer/transfer-list"
        />
      </View>
    </SharedLayout>
  )
}
