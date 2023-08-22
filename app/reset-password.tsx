import { StatusBar } from "expo-status-bar";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { MediumText } from "../components/Themed";

export default function ResetPassword() {
  return (
    <SafeAreaView className="flex-1 px-4">
      <StatusBar style="auto" />

      <BackButton href="/forget-password" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center space-y-8">
            <Image
              source={require("../assets/images/reset-mascot.png")}
              className="w-[198px] h-[145px] mx-auto"
            />
            <MediumText className="text-3xl tracking-tighter text-left">
              Đặt lại mật khẩu
            </MediumText>
            <View className="w-full space-y-4">
              <TextInput
                className="h-12 px-4 py-3 border border-gray-300 rounded-lg  focus:border-primary"
                placeholder="Mật khẩu mới"
                secureTextEntry={true}
                style={{ fontFamily: "Inter" }}
              />
              <TextInput
                className="h-12 px-4 py-3 border border-gray-300 rounded-lg bg-transparent focus:border-primary"
                placeholder="Xác nhận mật khẩu"
                secureTextEntry={true}
                style={{ fontFamily: "Inter" }}
              />
            </View>
            <View className="w-full mt-8 space-y-2">
              <Link
                href="/phone-confirmation"
                className=" bg-primary rounded-lg text-center py-3"
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
