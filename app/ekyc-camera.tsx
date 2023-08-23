import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { MediumText, NormalText } from "../components/Themed";

const StepCircle = ({ index, active }: { index: string; active: boolean }) => {
  return (
    <View
      className={`${
        active ? "bg-[#F97316]" : "border border-[#808080]"
      } w-[32px] h-[32px] flex rounded-full justify-center items-center`}
    >
      <Text className={`${active ? "text-white" : "text-[#808080]"}`}>
        {index}
      </Text>
    </View>
  );
};

export default function EkycCamera() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

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
      <View className="flex flex-row justify-center items-center">
        <StepCircle index="1" active={true} />
        <View
          style={{
            borderBottomColor: "#808080",
            width: 95,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <StepCircle index="2" active={false} />
        <View
          style={{
            borderBottomColor: "#808080",
            width: 95,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <StepCircle index="3" active={false} />
      </View>
      <View className="w-full h-1/3 my-8">
        <Text className="text-center text-[#F97316] mb-2">Mặt trước</Text>
        <View className="overflow-hidden rounded-xl mb-5">
          <Camera type={CameraType.back} className="w-full h-full" />
        </View>
      </View>
      <View>
        <Text className="text-[#808080] text-justify">
          <Text className="font- text-black">Lưu ý:&nbsp;</Text>
          Đảm bảo ảnh rõ nét, đầy đủ thông tin, ảnh đúng định dạng. Không chụp
          ảnh từ màn hình thiết bị, ảnh photo, ảnh mất góc, ảnh bị chói sáng
          hoặc ảnh quá tối
        </Text>
      </View>
      <View className="w-[64px] h-[64px] p-[2px] rounded-full border-2 border-[#808080] mx-auto mt-8">
        <TouchableOpacity className="bg-[#808080] w-full h-full rounded-full" />
      </View>
    </SafeAreaView>
  );
}
