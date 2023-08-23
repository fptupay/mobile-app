import { StyleSheet, Text, View, Image, Platform, TouchableNativeFeedback, ImageSourcePropType } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router' 
import { SafeAreaView } from 'react-native-safe-area-context'
import { MediumText, NormalText } from '../components/Themed'
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface StepCardProps{
  imageSource:ImageSourcePropType;
  title: string;
  stepNumber: number;
}
const StepCard: React.FC<StepCardProps> = ({ imageSource, title, stepNumber }) => (
  <View className='w-[100px] h-[85px] relative text-center'>
    <View className='w-[40px] h-[40px] items-center'>
      <Image source={imageSource} className='left-7 top-2' />
    </View>
    <NormalText className='text-center mt-4'>{title}</NormalText>
    <View className='bg-orange-500 rounded-full absolute w-5 h-5 left-5 top-0 justify-center'>
      <Text className='text-center text-white'>{stepNumber}</Text>
    </View>
  </View>
);
export default function EkycRule() {
  return (
    <SafeAreaView className="flex-1 px-4">
        <StatusBar style="auto" />
        <View className='relative p-5'>
          <View>
              <MediumText className="text-3xl">Xác minh danh tính</MediumText>
              <NormalText className='w-[256px] mt-2'>Bắt đầu xác minh danh tính sau khi hiểu rõ các quy 
              định khi xác minh qua các bước dưới đây</NormalText>
          </View>
          <View className='mt-8 w-full p-3 border border-gray-300 border-opacity-50 rounded-md  flex-row items-center justify-between'>
              <StepCard imageSource={require('../assets/images/ekyc.png')} title="Chụp ảnh giấy tờ tùy thân" stepNumber={1} />
              <StepCard imageSource={require('../assets/images/accpet.png')} title="Xác nhận thông tin" stepNumber={2} />
              <StepCard imageSource={require('../assets/images/take.png')} title="Xác nhận khuôn mặt" stepNumber={3} />
          </View>
          <View className='mt-8 relative w-full mb-8 flex-row items-center justify-between'>
              <View>
                <BouncyCheckbox onPress={(isChecked: boolean) => {}} />
              </View>
              <View className='w-[322px] absolute top-0 left-7'>
                  <NormalText className=' text-gray-500 text-sm font-normal leading-18'>
                  Tôi đồng ý với{' '}
                    <NormalText className='text-orange-500 font-medium'>Chính sách bảo mật</NormalText>
                    <NormalText className='text-gray-500'> và </NormalText>
                    <NormalText className='text-orange-500 font-medium'>Điều khoản sử dụng</NormalText>
                    <NormalText className='text-gray-500'> của FPTU Pay khi tiến hành xác minh danh tính</NormalText>
                  </NormalText>
              </View>
          </View>
          <View className=" mt-10 bg-primary rounded-lg">
                <Link
                  href="/+html"
                  className=" py-3 text-center "
                >
                  <MediumText className="text-white">Quét thẻ</MediumText>
                </Link>
          </View>
        </View>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
})
