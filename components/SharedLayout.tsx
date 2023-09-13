import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "./GradientBackground";
import { MediumText } from "./Themed";
import BackButton from "./buttons/BackButton";
import QuestionButton from "./buttons/QuestionButton";

interface SharedLayoutProps {
  href: string;
  title: string;
  children: React.ReactNode;
}

export default function SharedLayout({
  href,
  title,
  children,
}: SharedLayoutProps) {
  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <View className="h-1/4">
        <GradientBackground />
        <SafeAreaView className="px-4 pt-4">
          <BackButton href={href} />
          <QuestionButton href="" />
          <MediumText
            className={`text-2xl text-secondary mt-[calc(100vh-96vh)]`}
          >
            {title}
          </MediumText>
        </SafeAreaView>
      </View>
      <View className="absolute top-[calc(100vh-82vh)] left-0 right-0 bottom-0 bg-white flex-1 px-4 rounded-t-[30px] flex justify-between">
        {children}
      </View>
    </View>
  );
}
