import { MediumText } from "@/components/Themed";
import { WINDOW_HEIGHT } from "@/utils/helper";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  PanResponder,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  const featuresData = [
    {
      id: 1,
      icon: require("@/assets/images/fpt.png"),
      time: "1 phút trước",
      from: "Từ APT Academy",
      description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024",
    },
    {
      id: 2,
      icon: require("@/assets/images/fpt.png"),
      time: "1 phút trước",
      from: "Từ APT Academy",
      description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024",
    },
    {
      id: 3,
      icon: require("@/assets/images/fpt.png"),
      time: "1 phút trước",
      from: "Từ APT Academy",
      description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024",
    },
    {
      id: 4,
      icon: require("@/assets/images/fpt.png"),
      time: "1 phút trước",
      from: "Từ APT Academy",
      description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024",
    },
    {
      id: 5,
      icon: require("@/assets/images/fpt.png"),
      time: "1 phút trước",
      from: "Từ APT Academy",
      description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024",
    },
    {
      id: 6,
      icon: require("@/assets/images/fpt.png"),
      time: "1 phút trước",
      from: "Từ APT Academy",
      description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024",
    },
    {
      id: 7,
      icon: require("@/assets/images/fpt.png"),
      time: "1 phút trước",
      from: "Từ APT Academy",
      description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024",
    },
    {
      id: 8,
      icon: require("@/assets/images/fpt.png"),
      time: "1 phút trước",
      from: "Từ APT Academy",
      description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024",
    },
    {
      id: 9,
      icon: require("@/assets/images/fpt.png"),
      time: "1 phút trước",
      from: "Từ APT Academy",
      description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024",
    },
    {
      id: 10,
      icon: require("@/assets/images/fpt.png"),
      time: "1 phút trước",
      from: "Từ APT Academy",
      description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024",
    },
  ];

  const [features, setFeatures] = React.useState(featuresData);

  const renderItem = ({ item }: { item: (typeof featuresData)[0] }) => (
    <KeyboardAvoidingView>
      <View className="flex-row justify-center items-center h-[75px] w-full border-b border-gray-300">
        <View className="bg-[#3074E3] rounded-full w-2 h-2 left-4"></View>
        <View className="w-[48px] h-[48px] rounded-full border border-gray-400 border-opacity-40 left-6">
          <Image source={item.icon} className="w-full h-full rounded-full" />
        </View>
        <View className="left-10">
          <Text className="text-[#0F172A]">{item.description}</Text>
          <View className="flex-row justify-start items-center mt-2">
            <Text className=" text-[#808080] text-sm">{item.time}</Text>
            <View className="bg-[#808080] rounded-full w-1 h-1 left-5"></View>
            <Text className="left-10 top-0 text-[#3074E3] ">{item.from}</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  const Content = () => {
    const [scrollY, setScrollY] = useState(WINDOW_HEIGHT - 350);
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
          setScrollY(WINDOW_HEIGHT - 350 - lastGestureDy.current);
        },
      })
    ).current;

    const contentNotifiAnimation = {
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
          className="flex-1 px-4 bg-white left-0 right-0 backdrop-blur-[4px] rounded-t-[30px] absolute -top-6"
          style={[{ maxHeight: WINDOW_HEIGHT }, contentNotifiAnimation]}
        >
          <View className="w-full h-[24px] flex justify-start items-center left-2">
            <View className="w-[73px] self-stretch  h-[17px]">
              <MediumText className="absolute w-[41px] left-0 top-3 text-center font-normal leading-[18px] text-[#3074EE]">
                Tất cả
              </MediumText>
            </View>
            <View className="absolute bg-[#DB2A34] rounded-[4px] left-[50px] top-2">
              <Text className="w-full h-full items-center text-white p-1">
                10
              </Text>
            </View>
          </View>
          <View className="h-full pt-4 w-full">
            <View className="px-2 relative">
              <FlatList
                contentContainerStyle={{
                  paddingBottom: (200 * (WINDOW_HEIGHT - 350)) / scrollY,
                }}
                data={featuresData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <View className="h-[100px]">
        <LinearGradient
          colors={["#fdc83080", "#f97316bf"]}
          className="absolute top-0 left-0 right-0 h-full"
        />
        <SafeAreaView className="px-4 pt-2">
          <View className="w-full px-2">
            <MediumText className="w-full flex items-center justify-center text-xl ">
              Thông báo
            </MediumText>
          </View>
        </SafeAreaView>
      </View>
      <Content />
    </View>
  );
}
