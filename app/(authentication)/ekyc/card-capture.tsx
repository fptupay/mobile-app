import { ekycBack, ekycFront } from '@/api/ekyc'
import {
  MediumText,
  NormalText,
  SafeAreaView,
  SemiText,
  View
} from '@/components/Themed'
import Toast from '@/components/Toast'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import StepProgress, { StepType } from '@/components/progress/StepProgress'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Button, ImageBackground, TouchableOpacity } from 'react-native'

export default function EkycCameraScreen() {
  const [type, setType] = useState(StepType.FRONT)
  const [ekycId, setEkycId] = useState('')
  const router = useRouter()

  let camera: Camera | null
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const [toast, setToast] = useState({
    visible: false,
    type: 'warning',
    label: ''
  })

  useEffect(() => {
    setCapturedImage(null)
  }, [type])

  const takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync({ quality: 0.1 })
    console.log('photo', photo.uri)
    setCapturedImage(photo)
  }

  const retakePicture = () => {
    setCapturedImage(null)
  }

  const showToast = (type: string, label: string) => {
    setCapturedImage(null)
    setToast({ visible: true, type, label })

    setTimeout(() => {
      setToast({ visible: false, type, label })
    }, 3000)
  }

  const ekycFrontMutation = useMutation({
    mutationFn: (data: CameraCapturedPicture) => ekycFront(data),
    onSuccess: (data) => {
      setEkycId(data.data.user_ekyc_id)
      setType(StepType.BACK)
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        showToast('alert', error.response?.data?.message)
      }
    }
  })

  const ekycBackMutation = useMutation({
    mutationFn: (data: CameraCapturedPicture) => ekycBack(data, ekycId),
    onSuccess: () => {
      router.push('/ekyc/face-authenticator')
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        showToast('alert', error.response?.data?.message)
      }
    }
  })

  if (!permission) {
    return <NormalText>Loading...</NormalText>
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
    <SafeAreaView className="flex-1 px-4">
      <StatusBar style="auto" />
      <View className="mt-10 mb-8">
        <MediumText className="text-3xl">Chụp thẻ căn cước</MediumText>
      </View>
      <StepProgress type={type} />
      <View className="w-full h-1/3 my-8">
        <NormalText className="text-center text-primary mb-2">
          Mặt {type == StepType.FRONT ? 'trước' : 'sau'}
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
          <SemiText>Lưu ý:&nbsp;</SemiText>
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
                type == StepType.FRONT
                  ? ekycFrontMutation.mutate(capturedImage)
                  : ekycBackMutation.mutate(capturedImage)
              }
              disable={ekycFrontMutation.isLoading}
              loading={ekycFrontMutation.isLoading}
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

      {toast.visible && (
        <Toast type={toast.type} label={toast.label} visible={toast.visible} />
      )}
    </SafeAreaView>
  )
}
