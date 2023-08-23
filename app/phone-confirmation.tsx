import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MediumText, NormalText } from "../components/Themed";

export default function PhoneConfirmation() {
  return (
    <SafeAreaView className="flex-1 px-4">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 pt-0"
      >
        <StatusBar style="auto" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center space-y-8">
            <Image
              source={require("../assets/images/reset-mascot.png")}
              className="w-[220px] h-[160px] mx-auto"
            />
            <View>
              <MediumText className="text-3xl tracking-tight">
                Xác nhận số điện thoại
              </MediumText>
              <NormalText className="text-tertiary mt-1">
                Nhập số điện thoại của bạn
              </NormalText>
            </View>
            <View className="w-full space-y-4 mt-8">
              <TextInput
                className="h-12 px-4 py-3 border border-gray-300 rounded-lg  focus:border-primary"
                placeholder="Số điện thoại"
                style={{ fontFamily: "Inter" }}
              />
            </View>
            <View className="w-full mt-8 space-y-2">
              <Link
                href="/otp"
                className=" bg-primary rounded-lg py-3 text-center"
              >
                <MediumText className="text-white">Xác nhận</MediumText>
              </Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
