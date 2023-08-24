import { Link } from "expo-router";
import React from "react";
import CustomIcon from "./Icon";
import { View } from "react-native";
import { MediumText } from "./Themed";
import { LucideIcon } from "lucide-react-native";

export const TextButtonType = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

type TextButtonProps = {
  href?: any;
  text: string;
  type: string;
};

export default function TextButton({ href, text, type }: TextButtonProps) {
  return (
    <View
      className={`${
        type == TextButtonType.PRIMARY
          ? "bg-primary"
          : "bg-white border border-[#808080]"
      } rounded-lg`}
    >
      {href ? (
        <Link href={href} className="py-3 w-full text-center">
          <MediumText
            className={`${
              type == TextButtonType.PRIMARY ? "text-white" : "text-[#808080]"
            }`}
          >
            {text}
          </MediumText>
        </Link>
      ) : (
        <MediumText
          className={`${
            type == TextButtonType.PRIMARY ? "text-white" : "text-[#808080]"
          } py-3 w-full text-center`}
        >
          {text}
        </MediumText>
      )}
    </View>
  );
}
