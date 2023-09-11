import { IconProps } from "@/types/Icon.type";
import CustomIcon from "../Icon";
import { NormalText, View } from "../Themed";

export type ListItemProps = {
  title: string;
  leftIcon: IconProps["name"];
  color: string;
  description?: string;
  rightIcon?: IconProps["name"];
};

export default function ListItem({
  title,
  description,
  leftIcon,
  color,
  rightIcon,
}: ListItemProps) {
  return (
    <View className="flex flex-row justify-between mx-3 my-1 py-2 bg-[#FAFAFA]">
      <View className="flex flex-row bg-[#FAFAFA]">
        <View
          className="rounded-full p-2 w-9 h-9 flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <CustomIcon name={leftIcon} color="white" />
        </View>
        <View className="ml-4 bg-[#FAFAFA] flex justify-center">
          <NormalText className="text-secondary">{title}</NormalText>
          {description && (
            <NormalText className="text-tertiary">{description}</NormalText>
          )}
        </View>
      </View>
      {rightIcon && (
        <View className="p-2 w-9 h-9 flex items-center justify-center bg-[#FAFAFA]">
          <CustomIcon name={rightIcon} size={24} color="#f97316" />
        </View>
      )}
    </View>
  );
}
