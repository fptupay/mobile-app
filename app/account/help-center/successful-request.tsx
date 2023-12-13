import { MediumText, NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import Colors from '@/constants/Colors'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SuccessfulRequestScreen() {
  const { id } = useLocalSearchParams()
  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="flex-1 items-center justify-center">
        <View className="bg-green-100 rounded-full w-28 h-28 justify-center items-center mb-4">
          <Image
            source={require('../../../assets/images/icon-success.png')}
            style={{
              width: 100,
              height: 100,
              tintColor: Colors.label.approved.text
            }}
          />
        </View>

        <SemiText className="text-center text-primary text-2xl">
          Gửi yêu cầu thành công!{' '}
        </SemiText>
        <MediumText className="text-center mb-6 text-secondary">
          Mã yêu cầu: {id}
        </MediumText>
        <View>
          <NormalText className="text-tertiary mb-2">
            Yêu cầu của bạn đã được tiếp nhận và dự kiến được xử lý trong tối đa
            48h làm việc.
          </NormalText>
          <NormalText className="text-tertiary">
            Trong trường hợp cần thiết, đội ngũ admin sẽ liên hệ với bạn qua số
            điện thoại đã đăng ký.
          </NormalText>
        </View>
      </View>

      <View className="mt-auto mb-4 w-full">
        <TextButton
          onPress={() => router.push(`/account/help-center/${id as string}`)}
          text="Xem chi tiết"
          type="primary"
        />
        <View className="mt-2">
          <TextButton
            onPress={() => router.push('/account/home')}
            text="Về trang chủ"
            type="outline"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
