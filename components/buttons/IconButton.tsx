import { useRouter } from "expo-router";
import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { NormalText, SemiText } from "../Themed";
import { ChevronRight, PlusSquare } from "lucide-react-native";
import Colors from "../../constants/Colors";

interface IconButtonProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  href: any;
  description?: string | null;
}

export default function IconButton(props: IconButtonProps) {
  const { label, description, href, style, ...otherProps } = props;
  const router = useRouter();

  return (
    <View
      {...otherProps}
      style={style}
      className="p-4 rounded-lg flex flex-row items-center justify-between border border-gray-300"
    >
      <View className="flex flex-row gap-3 items-center">
        <PlusSquare size={24} color={Colors.secondary} />
        <View>
          <SemiText className="text-secondary capitalize">{label}</SemiText>
          <NormalText className="text-tertiary">{description}</NormalText>
        </View>
      </View>
      <Pressable onPress={() => router.push(href)}>
        <ChevronRight size={24} color={Colors.secondary} />
      </Pressable>
    </View>
  );
}
