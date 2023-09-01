import {
  NormalText,
  SafeAreaView,
  SemiText,
  View,
} from "../../components/Themed";
import { Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import List from "../../components/list";
import { ListItemProps } from "../../components/list/ListItem";
import TextButton, {
  TextButtonType,
} from "../../components/buttons/TextButton";

const walletFunctions: ListItemProps[] = [
  {
    leftIcon: "Plus",
    color: "#000000",
    title: "Nạp tiền",
    description: "Từ ngân hàng vào FPTU Pay",
    rightIcon: "ChevronRight",
  },
  {
    leftIcon: "ArrowRight",
    title: "Chuyển tiền",
    color: "#000000",
    description: "Từ FPTU Pay tới FPT Academy",
    rightIcon: "ChevronRight",
  },
];

const accountDetail: ListItemProps[] = [
  {
    leftIcon: "User",
    color: "#F97316",
    title: "Cao Quynh Anh",
  },
  {
    leftIcon: "Phone",
    color: "#EF5A20",
    title: "+84 87259892",
  },
  {
    leftIcon: "AtSign",
    color: "#8095A8",
    title: "caoquynhanh@gmail.com",
  },
  {
    leftIcon: "Landmark",
    color: "#3074E3",
    title: "Ngân hàng đã liên kết",
  },
];

const otherFunctions: ListItemProps[] = [
  {
    leftIcon: "Lock",
    color: "#A983FC",
    title: "Đổi mật khẩu",
  },
  {
    leftIcon: "MessageSquare",
    color: "#35CC9F",
    title: "Hỗ trợ",
  },
  {
    leftIcon: "Settings",
    color: "#CCA967",
    title: "Cài đặt",
  },
];

export default function MyWallet() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 250 }}>
        <View className="h-1/4 bg-white rounded-bl-[30px] rounded-br-[30px] relative flex justify-center items-center">
          <LinearGradient
            className="w-full h-full rounded-bl-[30px] rounded-br-[30px]"
            colors={["#fdc83080", "#f97316bf"]}
          />
          <View className="absolute bg-transparent flex items-center">
            <View className="w-[72px] h-[72px] rounded-full"></View>
            <SemiText className="text-center text-secondary mt-4">
              Cao Quynh Anh
            </SemiText>
          </View>
        </View>

        <View>
          <View
            className="rounded-lg mx-4 mt-4 p-4 flex flex-row justify-between items-center"
            style={{
              shadowOffset: { width: 2, height: 4 },
              shadowOpacity: 0.4,
              shadowColor: "#808080",
              shadowRadius: 5,
            }}
          >
            <View>
              <NormalText className="text-base">Số dư của bạn</NormalText>
              <SemiText className="text-primary text-3xl">
                20.567.000
                <SemiText className="underline text-xl text-primary">
                  đ
                </SemiText>
              </SemiText>
            </View>
            <Image source={require("../../assets/images/account-mascot.png")} />
          </View>

          <View className="mt-3">
            <List data={walletFunctions} />
          </View>

          <View className="mt-5">
            <List data={accountDetail} title="Tài khoản" />
          </View>

          <View className="mt-5">
            <List data={otherFunctions} title="Khác" />
          </View>

          <View className="mx-4 my-4">
            <TextButton
              text="Đăng xuất"
              href="/"
              type={TextButtonType.PRIMARY}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
