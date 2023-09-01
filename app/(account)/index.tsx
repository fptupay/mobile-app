import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../../components/Icon";
import { MediumText, NormalText, SemiText } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { IconProps } from "../../types/Icon.type";
import { formatMoney } from "../../utils/helper";

interface MainActionProps {
  image: IconProps["name"];
  title: string;
}

const MainAction: React.FC<MainActionProps> = ({ image, title }) => (
  <View className="w-[30%]  h-full relative text-center items-center">
    <View className="w-[48px] h-[48px] items-center bg-black rounded-full justify-center">
      <CustomIcon name={image} size={24} color="#fff" />
    </View>
    <MediumText className="text-center mt-4 wd:w-[30%]">{title}</MediumText>
  </View>
);

export default function Home() {
  const transactions = [
    {
      id: 1,
      recipient: "Nguyễn Văn A",
      name: "Mua sắm",
      amount: 100000,
      type: "expense",
      message: "Mua sắm tạp hoá",
      date: "2021-09-01",
    },
    {
      id: 2,
      recipient: "Nguyễn Văn B",
      name: "Học phí",
      amount: 100000,
      type: "expense",
      message: "Mua sắm tạp hoá",
      date: "2021-09-01",
    },
    {
      id: 3,
      recipient: "Nguyễn Văn C",
      name: "Lương tháng 9",
      amount: 100000,
      type: "income",
      message: "Công ty X chuyển tiền lương tháng 9",
      date: "2021-09-01",
    },
    {
      id: 4,
      recipient: "Nguyễn Văn D",
      name: "Mua sắm",
      amount: 100000,
      type: "expense",
      message: "Mua sắm tạp hoá",
      date: "2021-09-01",
    },
    {
      id: 5,
      recipient: "Nguyễn Văn E",
      name: "Mua sắm",
      amount: 100000,
      type: "income",
      message: "Mua sắm tạp hoá",
      date: "2021-09-01",
    },
    {
      id: 6,
      recipient: "Nguyễn Văn F",
      name: "Mua sắm",
      amount: 100000,
      type: "expense",
      message: "Mua sắm tạp hoá",
      date: "2021-09-01",
    },
    {
      id: 7,
      recipient: "Nguyễn Lan Anh",
      name: "Chuyển tiền ăn",
      amount: 100000,
      type: "income",
      message: "Nguyễn Lan Anh chuyển tiền",
      date: "2021-09-01",
    },
    // there are 2 types: income and expense, with varied amount
    {
      id: 8,
      recipient: "Nguyễn Văn H",
      name: "Mua sắm",
      amount: 100000,
      type: "expense",
      message: "Mua sắm tạp hoá",
      date: "2021-09-01",
    },
    {
      id: 9,
      recipient: "Nguyễn Văn I",
      name: "Mua sắm",
      amount: 100000,
      type: "expense",
      message: "Mua sắm tạp hoá",
      date: "2021-09-01",
    },
    {
      id: 10,
      recipient: "Nguyễn Văn K",
      name: "Mua sắm",
      amount: 100000,
      type: "income",
      message: "Mua sắm tạp hoá",
      date: "2021-09-01",
    },
  ];

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

          <View className="mt-6">
            <NormalText className="text-base">Số dư của bạn</NormalText>
            <SemiText className="text-3xl">{formatMoney(100000000)}đ</SemiText>
          </View>

          <View className="mt-6">
            <View className="flex-row justify-between">
              <MainAction image="Plus" title="Nạp tiền" />
              <MainAction image="ArrowRight" title="Chuyển tiền" />
              <MainAction image="WalletCards" title="Rút tiền" />
            </View>
          </View>
        </SafeAreaView>
      </View>

      <View className="absolute top-[320px] left-0 right-0 bottom-0 bg-white flex-1 px-4 rounded-t-[30px]">
        <View className="pt-4 flex-row justify-between">
          <NormalText className="text-tertiary uppercase">Hôm nay</NormalText>
          <View className="flex-row">
            <View className="mr-4">
              <CustomIcon name="BarChart" size={24} color={Colors.tertiary} />
            </View>
            <CustomIcon name="Search" size={24} color={Colors.tertiary} />
          </View>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center py-3">
              <View className="flex-row items-center space-x-4">
                <View className="w-10 h-10 rounded-full bg-gray-200"></View>
                <View className="w-[200px]">
                  <MediumText>{item.name}</MediumText>
                  <NormalText className="text-ellipsis text-tertiary">
                    {item.message}
                  </NormalText>
                </View>
              </View>
              <View>
                <NormalText
                  className={
                    item.type === "income" ? "text-green-500" : "text-red-500"
                  }
                >
                  {item.type === "income" ? "+" : "-"}
                  {formatMoney(item.amount)}
                </NormalText>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
