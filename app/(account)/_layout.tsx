import CustomIcon from "@/components/Icon";
import Colors from "@/constants/Colors";
import { Tabs } from "expo-router";

export default function AccountLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name="HomeIcon" color={color} size={size} />
          ),
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          tabBarLabel: "Thanh toán",
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name="Banknote" color={color} size={size} />
          ),
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          tabBarLabel: "QR",
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name="QrCode" color={color} size={size} />
          ),
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarLabel: "Thông báo",
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name="Bell" color={color} size={size} />
          ),
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="my-wallet"
        options={{
          tabBarLabel: "Ví của tôi",
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name="Wallet" color={color} size={size} />
          ),
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
