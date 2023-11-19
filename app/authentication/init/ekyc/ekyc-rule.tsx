import { MediumText, NormalText, SafeAreaView } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { ImageSourcePropType, View, Image } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

interface StepCardProps {
  imageSource: ImageSourcePropType
  title: string
  stepNumber: number
}
const StepCard: React.FC<StepCardProps> = ({
  imageSource,
  title,
  stepNumber
}) => (
  <View className="w-[30%]  h-full relative text-center">
    <View className="w-[45px] h-[40px] items-center">
      <Image source={imageSource} className="left-8 top-2" />
    </View>
    <NormalText className="text-center mt-4 wd:w-[30%] text-secondary">
      {title}
    </NormalText>
    <View className="bg-orange-500 rounded-full absolute w-5 h-5 left-7 top-0 justify-center">
      <NormalText className="text-center">{stepNumber}</NormalText>
    </View>
  </View>
)
export default function EkycRuleScreen() {
  const [isAgree, setAgree] = useState(false)

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <StatusBar style="auto" />
      <View className="mt-10 mb-8">
        <View>
          <MediumText className="text-3xl text-secondary">
            Xác minh danh tính
          </MediumText>
          <MediumText className="mt-2 text-justify text-tertiary">
            Bắt đầu xác minh danh tính sau khi hiểu rõ các quy định khi xác minh
            qua các bước dưới đây
          </MediumText>
        </View>
        <View className="mt-8 w-full p-3 border border-gray-300 border-opacity-50 rounded-md flex-row items-center justify-between">
          <StepCard
            imageSource={require('@/assets/images/ekyc.png')}
            title="Chụp ảnh giấy tờ tùy thân"
            stepNumber={1}
          />
          <StepCard
            imageSource={require('@/assets/images/accpet.png')}
            title="Xác nhận thông tin"
            stepNumber={2}
          />
          <StepCard
            imageSource={require('@/assets/images/take.png')}
            title="Xác nhận khuôn mặt"
            stepNumber={3}
          />
        </View>
        <View className="mt-8 relative w-full mb-8 flex-row items-center justify-between">
          <View>
            <BouncyCheckbox
              onPress={(isChecked: boolean) => setAgree(isChecked)}
            />
          </View>
          <View className="w-[322px] absolute top-0 left-7">
            <NormalText className=" text-gray-500 text-sm font-normal leading-18">
              Tôi đồng ý với{' '}
              <NormalText className="text-orange-500 font-medium">
                Chính sách bảo mật
              </NormalText>
              <NormalText className="text-gray-500"> và </NormalText>
              <NormalText className="text-orange-500 font-medium">
                Điều khoản sử dụng
              </NormalText>
              <NormalText className="text-gray-500">
                {' '}
                của FPTU Pay khi tiến hành xác minh danh tính
              </NormalText>
            </NormalText>
          </View>
        </View>
        <View className="mt-10">
          <TextButton
            onPress={() =>
              router.push({
                pathname: 'authentication/init/ekyc/[card]',
                params: { card: 'front' }
              } as any)
            }
            disable={!isAgree}
            text="Quét thẻ"
            type={TextButtonType.PRIMARY}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
