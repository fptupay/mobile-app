import { Camera, CameraType } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MediumText, NormalText } from "../../components/Themed";
import TextButton, {
  TextButtonType,
} from "../../components/buttons/TextButton";
import StepProgress from "../../components/progress/StepProgress";

export default function FaceAuthenticator() {
  let camera: Camera | null;
  const { type } = useLocalSearchParams();
  const [faceData, setFaceData] = useState([]);
  const [capturedImage, setCapturedImage] = useState<any>(null);

  useEffect(() => {
    setCapturedImage(null);
  }, [type]);

  const takePicture = async () => {
    const photo = await camera?.takePictureAsync({ skipProcessing: true });
    console.log("photo", photo);
    setCapturedImage(photo);
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  const handleFacesDetected = ({ faces }: { faces: any }) => {
    setFaceData(faces);
  };

  const getFaceData = () => {
    if (faceData.length === 0) {
      return (
        <NormalText className="font-semibold text-red-700">
          Không tìm thấy khuôn mặt
        </NormalText>
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <StatusBar style="auto" />
      <View className="mt-10 mb-8">
        <MediumText className="text-3xl font-semibold tracking-tighter">
          Xác thực khuôn mặt
        </MediumText>
      </View>
      <StepProgress type={type} />

      <View className="w-[250px] h-[250px] mx-auto bg-red-300 my-8 rounded-full overflow-hidden">
        {capturedImage ? (
          <ImageBackground
            source={{ uri: capturedImage.uri }}
            style={{ width: "100%", height: "100%" }}
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
              tracking: true,
            }}
          />
        )}
      </View>

      <View className="flex flex-row justify-center mb-8">{getFaceData()}</View>

      <View>
        <Text className="text-tertiary text-justify">
          <Text className="font-semibold text-black">Hướng dẫn:&nbsp;</Text>
          Tiến hành hướng khuôn mặt vào chính giữa khung hình. Vui lòng không
          nhắm mắt hoặc che khuôn mặt bằng tay.
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
                    : "/ekyc-camera/face-detector"
                }`,
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
