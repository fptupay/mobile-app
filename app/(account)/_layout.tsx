import CustomIcon from '@/components/Icon'
import Colors from '@/constants/Colors'
import { Tabs, usePathname } from 'expo-router'

export default function AccountLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display:
            usePathname() === '/help-center/create-request' ? 'none' : 'flex'
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name="HomeIcon" color={color} size={size} />
          ),
          tabBarActiveTintColor: Colors.primary,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          tabBarLabel: 'Thanh toán',
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name="Banknote" color={color} size={size} />
          ),
          tabBarActiveTintColor: Colors.primary,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="help-center"
        options={{
          tabBarLabel: 'Hỗ trợ',
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name="MessagesSquare" color={color} size={size} />
          ),
          tabBarActiveTintColor: Colors.primary,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="my-wallet"
        options={{
          tabBarLabel: 'Ví của tôi',
          tabBarIcon: ({ color, size }) => (
            <CustomIcon name="Wallet" color={color} size={size} />
          ),
          tabBarActiveTintColor: Colors.primary,
          headerShown: false
        }}
      />
    </Tabs>
  )
}
