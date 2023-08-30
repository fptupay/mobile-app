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
import { MediumText, NormalText } from "../../components/Themed";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 px-4">
      <StatusBar style="auto" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 items-center justify-center space-y-8">
            <Image
              source={require("../../assets/images/login-mascot.png")}
              className="w-[172px] h-[145px]"
            />
            <MediumText className="text-3xl tracking-tighter">
              Đăng nhập tài khoản{" "}
              <MediumText className="text-primary">FPTUPay</MediumText> của bạn{" "}
            </MediumText>
            <View className="w-full space-y-4">
              <TextInput
                className="h-12 px-4 py-3 border border-gray-300 rounded-lg  focus:border-primary"
                placeholder="Mã sinh viên"
                style={{ fontFamily: "Inter" }}
              />
              <TextInput
                className="h-12 px-4 py-3 border border-gray-300 rounded-lg bg-transparent focus:border-primary"
                placeholder="Mật khẩu"
                secureTextEntry={true}
                style={{ fontFamily: "Inter" }}
              />
            </View>
            <View className="w-full mt-8 space-y-2">
              <Link
                href="/(authentication)/otp"
                className=" bg-primary rounded-lg text-center py-3"
              >
                <MediumText className="text-white">Đăng nhập</MediumText>
              </Link>
              <Link
                href="/(authentication)/forget-password"
                className="text-center"
              >
                <NormalText className="text-primary">Quên mật khẩu?</NormalText>
              </Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
