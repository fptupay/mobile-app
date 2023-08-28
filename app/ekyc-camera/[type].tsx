import { Camera, CameraType } from "expo-camera";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    return <Text>Loading...</Text>;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView>
        <Text className="text-center">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 px-5 bg-white">
      <StatusBar style="auto" />
      <View className="mt-10 mb-8">
        <Text className="text-3xl font-semibold">Chụp thẻ căn cước</Text>
      </View>
      <StepProgress type={type} />
      <View className="w-full h-1/3 my-8">
        <Text className="text-center text-primary mb-2">
          Mặt {type == StepType.FRONT ? "trước" : "sau"}
        </Text>
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
        <Text className="text-tertiary text-justify">
          <Text className="font-semibold text-black">Lưu ý:&nbsp;</Text>
          Đảm bảo ảnh rõ nét, đầy đủ thông tin, ảnh đúng định dạng. Không chụp
          ảnh từ màn hình thiết bị, ảnh photo, ảnh mất góc, ảnh bị chói sáng
          hoặc ảnh quá tối
        </Text>
      </View>
      {capturedImage ? (
        <>
          <View className="mt-8">
            <TextButton
              href={{
                pathname: `${
                  type == "front"
                    ? "/ekyc-camera/[type]"
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
