import { confirmSelfie } from '@/api/forgot-password'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SemiText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useForgotPasswordStore } from '@/stores/accountStore'
import { successResponseStatus } from '@/utils/helper'

export default function FaceAuthenticatorScreen() {
  let camera: Camera | null
  const { credentials } = useForgotPasswordStore()
  console.log(credentials)

  const [capturedImage, setCapturedImage] = useState<any>()

  const takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync({ quality: 0.1 })
    setCapturedImage(photo)
  }

  const retakePicture = () => {
    setCapturedImage(null)
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: CameraCapturedPicture) => {
      return confirmSelfie(credentials, data)
    },
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        router.push('/authentication/forget-password/reset-password')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Lỗi xác thực',
          text2: data.message
        })
      }
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi xác thực',
          text2: error.response?.data?.message
        })
      }
    }
  })

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <StatusBar style="auto" />
      <View className="mt-10 mb-8">
        <SemiText className="text-3xl tracking-tighter text-secondary">
          Xác thực khuôn mặt
        </SemiText>
      </View>

      <View className="w-[250px] h-[250px] mx-auto bg-red-300 my-8 rounded-full overflow-hidden">
        {capturedImage ? (
          <ImageBackground
            source={{ uri: capturedImage.uri }}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Camera
            className="flex-1 items-center justify-center"
            ref={(r) => (camera = r)}
            type={CameraType.front}
          />
        )}
      </View>

      {capturedImage ? (
        <>
          <View className="mt-8">
            <TextButton
              onPress={() => mutate(capturedImage)}
              text="Dùng ảnh này"
              type={TextButtonType.PRIMARY}
              loading={isLoading}
              disable={isLoading}
            />
          </View>
          <TouchableOpacity className="mt-4">
            <TextButton
              text="Hủy bỏ"
              onPress={retakePicture}
              type={TextButtonType.SECONDARY}
            />
          </TouchableOpacity>
        </>
      ) : (
        <View className="w-[64px] h-[64px] p-[2px] rounded-full border-2 border-tertiary mx-auto mt-8">
          <TouchableOpacity
            onPress={takePicture}
            className="bg-tertiary w-full h-full rounded-full"
          />
        </View>
      )}
    </SafeAreaView>
  )
}
