import { StatusBar } from "expo-status-bar";
import React from "react";
import QuestionButton from "../components/buttons/QuestionButton";
import {
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MediumText, NormalText } from "../components/Themed";
import BackButton from "../components/buttons/BackButton";
import {LinearGradient} from 'expo-linear-gradient'

export default function addBank() {
  const Bottom = () => {
    
  }
  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <QuestionButton href="index" />
      <BackButton href="/(account)/index" />
      <View className="h-[120px]">
          <LinearGradient
            // Background Linear Gradient
            colors={["#fdc83080", "#f97316bf"]}
            className="absolute top-0 left-0 right-0 h-full"
          />
          <SafeAreaView className="px-4 mt-12">
              <View className='w-full px-2'>
                <MediumText className='w-full flex items-center justify-center text-xl'>
                    Liên kết ngân hàng
                </MediumText>
              </View>
          </SafeAreaView>
      </View>
      <Bottom/>
    </View>
  )
}

