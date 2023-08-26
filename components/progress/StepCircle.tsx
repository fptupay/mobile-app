import { Check } from "lucide-react-native";
import { View, Text } from "react-native";

export default function StepCircle({
  index,
  active,
  complete,
}: {
  index: string;
  active: boolean;
  complete: boolean;
}) {
  return (
    <View
      className={`${
        active
          ? "bg-primary"
          : complete
          ? "border border-primary"
          : "border border-tertiary"
      } w-[32px] h-[32px] flex rounded-full justify-center items-center`}
    >
      {complete ? (
        <Check size={16} color="#F97316" />
      ) : (
        <Text className={`${active ? "text-white" : "text-tertiary"}`}>
          {index}
        </Text>
      )}
    </View>
  );
}
