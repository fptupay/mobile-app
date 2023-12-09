import { NormalText, SafeAreaView, SemiText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import Toast from 'react-native-toast-message'

import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Button, ImageBackground, TouchableOpacity, View } from 'react-native'

import { successResponseStatus } from '@/utils/helper'
import { useForgotPasswordStore } from '@/stores/accountStore'
import { confirmBackCard } from '@/api/forgot-password'
import LoadingSpin from '@/components/LoadingSpin'

export default function EkycCameraScreen() {
  const router = useRouter()
  const { card } = useLocalSearchParams()
  const { credentials } = useForgotPasswordStore()

  let camera: Camera | null
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [capturedImage, setCapturedImage] = useState<any>(null)

  useEffect(() => {
    setCapturedImage(null)
  }, [card])

  const takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync({ quality: 0.1 })
    setCapturedImage(photo)
  }

  const retakePicture = () => {
    setCapturedImage(null)
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: CameraCapturedPicture) =>
      confirmBackCard(credentials, data),
    onSuccess: (data) => {
      if (!successResponseStatus(data)) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi xác thực',
          text2: data.message
        })
        return
      }
      router.push('/authentication/forget-password/face-confirmation')
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi xác thực',
          text2: error.response?.data?.message
        })
      }
    }
  })

  if (!permission) {
    return <LoadingSpin />
  }

  if (!permission.granted) {
    return (
      <SafeAreaView>
        <NormalText className="text-center">
          We need your permission to show the camera
        </NormalText>
        <Button onPress={requestPermission} title="Grant permission" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <StatusBar style="auto" />
      <View className="mt-10 mb-8">
        <SemiText className="text-3xl text-secondary">
          Xác minh CCCD mặt sau
        </SemiText>
      </View>
      <View className="w-full h-1/3 my-8">
        <View className="overflow-hidden rounded-xl mb-5">
          {capturedImage ? (
            <ImageBackground
              source={{ uri: capturedImage.uri }}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <Camera
              ref={(r) => (camera = r)}
              type={CameraType.back}
              ratio="4:3"
              className="w-full h-full"
            />
          )}
        </View>
      </View>
      {capturedImage ? (
        <>
          <View className="mt-8 mb-4">
            <TextButton
              onPress={() => mutate(capturedImage)}
              disable={isLoading}
              loading={isLoading}
              text="Dùng ảnh này"
              type={TextButtonType.PRIMARY}
            />
          </View>
          <TextButton
            onPress={retakePicture}
            text="Hủy bỏ"
            type={TextButtonType.SECONDARY}
          />
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
