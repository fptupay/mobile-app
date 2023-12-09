import { ekycBack, ekycFront } from '@/api/ekyc'
import {
  MediumText,
  NormalText,
  SafeAreaView,
  SemiText
} from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import StepProgress from '@/components/progress/StepProgress'
import { useEkycStore } from '@/stores/ekycStore'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import Toast from 'react-native-toast-message'

import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Button, ImageBackground, TouchableOpacity, View } from 'react-native'
import LoadingSpin from '@/components/LoadingSpin'
import { successResponseStatus } from '@/utils/helper'

export default function EkycCameraScreen() {
  const router = useRouter()
  const { card } = useLocalSearchParams()
  const ekycId = useEkycStore((state) => state.ekycId)
  const setEkycId = useEkycStore((state) => state.setEkycId)
  const setFrontCardDetails = useEkycStore((state) => state.setFrontCardDetails)

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

  const ekycFrontMutation = useMutation({
    mutationFn: (data: CameraCapturedPicture) => ekycFront(data),
    onSuccess: (data) => {
      if (!successResponseStatus(data)) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi xác thực',
          text2: data.message
        })
        return
      }
      setEkycId(data.data.user_ekyc_id)
      setFrontCardDetails(data?.data)
      router.push('/authentication/init/ekyc/ekyc-result')
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

  const ekycBackMutation = useMutation({
    mutationFn: (data: CameraCapturedPicture) => {
      return ekycBack(data, ekycId)
    },
    onSuccess: (data) => {
      if (!successResponseStatus(data)) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi xác thực',
          text2: data.message
        })
        return
      }
      router.push('/authentication/init/ekyc/face-authenticator')
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
        <MediumText className="text-3xl text-secondary">
          Chụp thẻ căn cước
        </MediumText>
      </View>
      <StepProgress type={card} />
      <View className="w-full h-1/3 my-8">
        <NormalText className="text-center text-primary mb-2">
          Mặt {card === 'front' ? 'trước' : 'sau'}
        </NormalText>
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
      <View>
        <NormalText className="text-tertiary text-justify">
          <SemiText className="text-secondary">Lưu ý:&nbsp;</SemiText>
          Đảm bảo ảnh rõ nét, đầy đủ thông tin, ảnh đúng định dạng. Không chụp
          ảnh từ màn hình thiết bị, ảnh photo, ảnh mất góc, ảnh bị chói sáng
          hoặc ảnh quá tối
        </NormalText>
      </View>
      {capturedImage ? (
        <>
          <View className="mt-8 mb-4">
            <TextButton
              onPress={() =>
                card === 'front'
                  ? ekycFrontMutation.mutate(capturedImage)
                  : ekycBackMutation.mutate(capturedImage)
              }
              disable={
                ekycFrontMutation.isLoading || ekycBackMutation.isLoading
              }
              loading={
                ekycFrontMutation.isLoading || ekycBackMutation.isLoading
              }
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
