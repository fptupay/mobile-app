import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { OtpInput } from "../components/OtpInput";
import { MediumText, NormalText } from "../components/Themed";
import Colors from "../constants/Colors";
import { OtpInputRef } from "../types/OtpInput.type";

export default function Otp() {
  const otpInputRef = useRef<OtpInputRef>(null);
  const [otpCode, setOtpCode] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsDisabled(otpCode.length < 6);
  }, [otpCode]);

  const handleClear = () => {
    otpInputRef.current?.clear();
  };

  return (
    <SafeAreaView className="flex-1">
      <BackButton href="/phone-confirmation" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-4"
      >
        <StatusBar style="auto" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 pt-16 space-y-8">
            <View>
              <MediumText className="text-3xl text-left tracking-tighter">
                Nhập mã OTP
              </MediumText>
              <NormalText className="text-tertiary mt-1">
                Vui lòng nhập mã 6 số vừa được gửi tới số điện thoại 0123456789
              </NormalText>
            </View>

            {/* OTP 6 digits */}
            <View>
              <OtpInput
                ref={otpInputRef}
                numberOfDigits={6}
                focusColor="#F97316"
                onTextChange={(text: any) => setOtpCode(text)}
              />
            </View>

            <View className="w-full mt-8 space-y-2">
              <Pressable onPress={handleClear}>
                <NormalText className="text-primary text-center">
                  Xóa
                </NormalText>
              </Pressable>
              <Pressable
                disabled={isDisabled}
                className="rounded-lg py-3 text-center w-full disabled:bg-gray-400"
                style={{
                  backgroundColor: isDisabled
                    ? Colors.tertiary
                    : Colors.primary,
                }}
              >
                <MediumText className="text-white text-center">
                  Xác nhận
                </MediumText>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  inputsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  codeContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#DFDFDE",
    height: 60,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  codeText: {
    fontSize: 28,
    lineHeight: 38,
  },
});
