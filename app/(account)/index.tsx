import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NormalText, SemiText } from "../../components/Themed";

export default function Home() {
  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <View className="h-[350px]">
        <LinearGradient
          // Background Linear Gradient
          colors={["#f97316bf", "#fdc83080"]}
          className="absolute top-0 left-0 right-0 h-full"
        />
        <SafeAreaView className="px-4 pt-4">
          <View className="flex flex-row space-x-2 items-center">
            <View className="w-9 h-9 rounded-full bg-gray-200"></View>
            <View>
              <NormalText>Xin chào</NormalText>
              <SemiText>Phạm Quang Hưng</SemiText>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <View className="absolute top-[300px] left-0 right-0 bottom-0 bg-white flex-1 px-4 rounded-t-[30px]">
        <Text>Content 1</Text>

        <Text>Content 2</Text>
      </View>
    </View>
  );
}
