import { View, StyleSheet } from "react-native";
import StepCircle from "./StepCircle";

export default function StepProgress({ type }: { type: string | string[] }) {
  return (
    <View className="flex flex-row justify-center items-center">
      <StepCircle index="1" active={type == "front"} />
      <View
        style={{
          borderBottomColor: "#808080",
          width: 95,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <StepCircle index="2" active={type == "back"} />
      <View
        style={{
          borderBottomColor: "#808080",
          width: 95,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <StepCircle index="3" active={false} />
    </View>
  );
}
