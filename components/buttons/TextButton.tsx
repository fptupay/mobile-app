import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { MediumText } from "../Themed";

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
          : "bg-white border border-tertiary"
      } rounded-lg px-1 py-2`}
    >
      {href ? (
        <Link href={href} className="py-2 w-full text-center">
          <MediumText
            className={`${
              type == TextButtonType.PRIMARY ? "text-white" : "text-tertiary"
            }`}
          >
            {text}
          </MediumText>
        </Link>
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
  );
}
