import { Camera, CameraType } from "expo-camera";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, ImageBackground, TouchableOpacity } from "react-native";
import {
  MediumText,
  NormalText,
  SafeAreaView,
  SemiText,
  View,
} from "../../components/Themed";
import TextButton, {
  TextButtonType,
} from "../../components/buttons/TextButton";
import StepProgress, { StepType } from "../../components/progress/StepProgress";

export default function EkycCamera() {
  const { type } = useLocalSearchParams();

  let camera: Camera | null;
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<any>(null);

  useEffect(() => {
    setCapturedImage(null);
  }, [type]);

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ skipProcessing: true });
    console.log("photo", photo);
    setCapturedImage(photo);
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  if (!permission) {
    return <NormalText>Loading...</NormalText>;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView>
        <NormalText className="text-center">
          We need your permission to show the camera
        </NormalText>
        <Button onPress={requestPermission} title="Grant permission" />
      </SafeAreaView>
    );
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
          Mặt {type == StepType.FRONT ? "trước" : "sau"}
        </NormalText>
        <View className="overflow-hidden rounded-xl mb-5">
          {capturedImage ? (
            <ImageBackground
              source={{ uri: capturedImage.uri }}
              style={{ width: "100%", height: "100%" }}
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
          <View className="mt-8">
            <TextButton
              href={{
                pathname: `${
                  type == "front"
                    ? "/ekyc-camera/type"
                    : "/ekyc-camera/face-authenticator"
                }`,
                params: {
                  type: `${
                    type == StepType.FRONT ? StepType.BACK : StepType.SELFIE
                  }`,
                },
              }}
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
  );
}
