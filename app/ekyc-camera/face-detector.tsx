import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import StepProgress, { StepType } from "../../components/progress/StepProgress";
import TextButton, {
  TextButtonType,
} from "../../components/buttons/TextButton";

export default function FaceDetector() {
  const { type } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 px-5 bg-white">
      <StatusBar style="auto" />
      <View className="mt-10 mb-8">
        <Text className="text-3xl font-semibold">Xác thực khuôn mặt</Text>
      </View>
      <StepProgress type={type} />

      <View className="w-full h-1/3 bg-red-300 my-8">
        <Text>Face detector</Text>
      </View>

      <View>
        <Text className="text-[#808080] text-justify">
          <Text className="font-semibold text-black">Hướng dẫn:&nbsp;</Text>
          Tiến hành hướng khuôn mặt vào chính giữa khung hình. Sau đó, quay sang
          trái, quay sang phải và quay về giữa
        </Text>
      </View>

      <View>
        <TouchableOpacity className="mt-8">
          <TextButton text="Bắt đầu" type={TextButtonType.PRIMARY} />
        </TouchableOpacity>
        <View className="mt-4">
          <TextButton
            href={{
              pathname: "/ekyc-camera/[type]",
              params: {
                type: `${StepType.FRONT}`,
              },
            }}
            text="Chụp lại"
            type={TextButtonType.SECONDARY}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
