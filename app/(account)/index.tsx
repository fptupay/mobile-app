import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../../components/Icon";
import { MediumText, NormalText, SemiText } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { IconProps } from "../../types/Icon.type";
import { WINDOW_HEIGHT, formatMoney } from "../../utils/helper";

interface MainActionProps {
  image: IconProps["name"];
  title: string;
}

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

const MainAction: React.FC<MainActionProps> = ({ image, title }) => (
  <View className="w-[30%] h-full relative text-center items-center">
    <View className="w-[48px] h-[48px] items-center bg-black rounded-full justify-center">
      <CustomIcon name={image} size={24} color="#fff" />
    </View>
    <MediumText className="text-center mt-4 wd:w-[30%] text-secondary">
      {title}
    </MediumText>
  </View>
);

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);

  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };

  const BottomSheet = () => {
    const MAX_UPWARD_TRANSLATE_Y = -WINDOW_HEIGHT * 0.25;
    const MAX_DOWNWARD_TRANSLATE_Y = 0;
    const animatedValue = useRef(new Animated.Value(0)).current;
    const lastGestureDy = useRef(0);
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          animatedValue.setOffset(lastGestureDy.current);
        },
        onPanResponderMove: (event, gesture) => {
          animatedValue.setValue(gesture.dy);
        },
        onPanResponderRelease: (event, gesture) => {
          lastGestureDy.current += gesture.dy;
          if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
            lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
          } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
            lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
          }
        },
      })
    ).current;

    const bottomSheetAnimation = {
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
            outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
            extrapolate: "clamp",
          }),
        },
      ],
    };

    return (
      <View className="flex-1 bg-black">
        <Animated.View
          className="absolute flex-1 left-0 right-0 -top-8 bg-white px-4 rounded-t-[30px]"
          style={[{ maxHeight: WINDOW_HEIGHT}, bottomSheetAnimation]}
        >
          <View
            className="w-48 h-10 pt-2 justify-start items-center mx-auto"
            {...panResponder.panHandlers}
          >
            <View className="w-28 h-2 rounded-xl bg-tertiary"></View>
          </View>
          {!isSearching ? (
            <View className="mt-1 flex-row items-center justify-between">
              <NormalText className="text-tertiary uppercase">
                Hôm nay
              </NormalText>
              <View className="flex-row">
                <View className="mr-4">
                  <CustomIcon
                    name="BarChart"
                    size={24}
                    color={Colors.tertiary}
                  />
                </View>
                <TouchableOpacity onPress={toggleSearch}>
                  <CustomIcon name="Search" size={24} color={Colors.tertiary} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="my-5 flex-row items-center justify-center">
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
              >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View className="flex-1 items-center justify-center">
                    <View className="w-full relative">
                      <TextInput
                        className="h-12 px-10 py-3 bg-[#D9D9D9] rounded-lg focus:border-primary"
                        placeholderTextColor={Colors.tertiary}
                        placeholder="Tìm kiếm giao dịch"
                        style={{ fontFamily: "Inter" }}
                      />
                      <View className="absolute top-3 left-2">
                        <CustomIcon
                          name="Search"
                          size={24}
                          color={Colors.tertiary}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
              <TouchableOpacity className="ml-3" onPress={toggleSearch}>
                <NormalText className="text-secondary">Hủy</NormalText>
              </TouchableOpacity>
            </View>
          )}

          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex-row justify-between items-center py-3">
                <View className="flex-row items-center space-x-4">
                  <View className="w-10 h-10 rounded-full bg-gray-200"></View>
                  <View className="w-[200px]">
                    <MediumText className="text-secondary">
                      {item.name}
                    </MediumText>
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
        </Animated.View>
      </View>
    );
  };

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <View className="h-[350px]">
        <LinearGradient
          // Background Linear Gradient
          colors={["#fdc83080", "#f97316bf"]}
          className="absolute top-0 left-0 right-0 h-full"
        />
        <SafeAreaView className="px-4 pt-4">
          <View className="flex flex-row space-x-2 items-center">
            <View className="w-9 h-9 rounded-full bg-gray-200"></View>
            <View>
              <NormalText className="text-secondary">Xin chào</NormalText>
              <SemiText className="text-secondary">Phạm Quang Hưng</SemiText>
            </View>
          </View>

          <View className="mt-6">
            <NormalText className="text-base text-secondary">
              Số dư của bạn
            </NormalText>
            <SemiText className="text-3xl text-secondary">
              {formatMoney(100000000)}đ
            </SemiText>
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

      <BottomSheet />
    </View>
  );
}
