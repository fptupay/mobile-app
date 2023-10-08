import { ekycSelfie } from '@/api/ekyc'
import {
  MediumText,
  NormalText,
  SafeAreaView,
  SemiText,
  View
} from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import StepProgress, { StepType } from '@/components/progress/StepProgress'
import { useEkycStore } from '@/stores/ekycStore'
import { useMutation } from '@tanstack/react-query'

import { Camera, CameraType } from 'expo-camera'
import * as FaceDetector from 'expo-face-detector'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'

export default function FaceAuthenticatorScreen() {
  let camera: Camera | null
  const [faceData, setFaceData] = useState([])
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const ekycId = useEkycStore((state) => state.ekycId)

  const takePicture = async () => {
    const photo = await camera?.takePictureAsync({ skipProcessing: true })
    console.log('photo', photo)
    setCapturedImage(photo)
  }

  const retakePicture = () => {
    setCapturedImage(null)
  }

  const handleFacesDetected = ({ faces }: { faces: any }) => {
    setFaceData(faces)
  }

  const getFaceData = () => {
    if (faceData.length === 0) {
      return (
        <SemiText className="text-red-700">Không tìm thấy khuôn mặt</SemiText>
      )
    }
  }

  const faceAuthenticationMutation = useMutation({
    mutationFn: (data: any) => ekycSelfie(data, ekycId),
    onSuccess: (data) => {
      console.log('data', data)
      // display success dialog
    },
    onError: (error) => {
      console.log('error', error)
    }
  })

  return (
    <SafeAreaView className="flex-1 px-4">
      <StatusBar style="auto" />
      <View className="mt-10 mb-8">
        <MediumText className="text-3xl tracking-tighter">
          Xác thực khuôn mặt
        </MediumText>
      </View>
      <StepProgress type={StepType.SELFIE} />

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
            onFacesDetected={handleFacesDetected}
            type={CameraType.front}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 100,
              tracking: true
            }}
          />
        )}
      </View>

      <View className="flex flex-row justify-center mb-8">{getFaceData()}</View>

      <View>
        <NormalText className="text-tertiary text-justify">
          <SemiText>Hướng dẫn:&nbsp;</SemiText>
          Tiến hành hướng khuôn mặt vào chính giữa khung hình. Vui lòng không
          nhắm mắt hoặc che khuôn mặt bằng tay.
        </NormalText>
      </View>

      {capturedImage ? (
        <>
          <View className="mt-8">
            <TextButton
              href={() => faceAuthenticationMutation.mutate(capturedImage)}
              text="Dùng ảnh này"
              type={TextButtonType.PRIMARY}
            />
          </View>
          <TouchableOpacity onPress={retakePicture} className="mt-4">
            <TextButton text="Hủy bỏ" type={TextButtonType.SECONDARY} />
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
