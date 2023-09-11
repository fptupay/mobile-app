import { useRouter } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { MediumText } from "../Themed";

export const TextButtonType = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

type TextButtonProps = {
  href?: any;
  text: string;
  type: string;
  onPress?: () => void;
  disable?: boolean;
};

export default function TextButton({
  href,
  text,
  type,
  onPress,
  disable,
}: TextButtonProps) {
  const route = useRouter();

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disable}>
      <View
        className={`${
          disable
            ? "bg-gray-300"
            : type == TextButtonType.PRIMARY
            ? "bg-primary"
            : "bg-white border border-tertiary"
        } rounded-lg px-1 py-2`}
      >
        {href ? (
          <Pressable
            disabled={disable}
            onPress={() => route.push(href)}
            className="flex items-center w-full"
          >
            <MediumText
              className={`${
                type == TextButtonType.PRIMARY ? "text-white" : "text-tertiary"
              } py-2 w-full text-center`}
            >
              {text}
            </MediumText>
          </Pressable>
        ) : (
          <MediumText
            className={`${
              type == TextButtonType.PRIMARY ? "text-white" : "text-tertiary"
            } py-2 w-full text-center`}
          >
            {text}
          </MediumText>
        )}
      </View>
    </TouchableOpacity>
  );
}
