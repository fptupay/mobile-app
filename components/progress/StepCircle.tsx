import { View, Text } from "react-native";

export default function StepCircle({
  index,
  active,
}: {
  index: string;
  active: boolean;
}) {
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
}
