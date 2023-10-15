import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { NormalText, SemiText } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ChevronRight } from 'lucide-react-native'
import { useState } from 'react'
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native'

export type AddBankRouteParams = {
  setDepositSuccessful?: boolean
}

type BankItemProp = {
  id: number
  icon: any
  bank: string
}

const mockBankData: BankItemProp[] = [
  {
    id: 1,
    icon: require('@/assets/images/tick.png'),
    bank: 'Agribank'
  },
  {
    id: 2,
    icon: require('@/assets/images/tick.png'),
    bank: 'Agribank'
  },
  {
    id: 3,
    icon: require('@/assets/images/tick.png'),
    bank: 'Agribank'
  },
  {
    id: 4,
    icon: require('@/assets/images/tick.png'),
    bank: 'Agribank'
  },
  {
    id: 5,
    icon: require('@/assets/images/tick.png'),
    bank: 'Agribank'
  },
  {
    id: 6,
    icon: require('@/assets/images/tick.png'),
    bank: 'Agribank'
  },
  {
    id: 7,
    icon: require('@/assets/images/tick.png'),
    bank: 'Agribank'
  },
  {
    id: 8,
    icon: require('@/assets/images/tick.png'),
    bank: 'Agribank'
  },
  {
    id: 9,
    icon: require('@/assets/images/tick.png'),
    bank: 'Agribank'
  },
  {
    id: 10,
    icon: require('@/assets/images/tick.png'),
    bank: 'Agribank'
  }
]

export default function AddBankScreen() {
  const params: { previousRoute: string } = useLocalSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  const filteredBankData = mockBankData.filter((item) =>
    item.bank.toLowerCase().includes(searchValue.toLowerCase())
  )

  const clearSearchValue = () => {
    setSearchValue('')
  }

  const renderItem = ({ item }: { item: BankItemProp }) => (
    <KeyboardAvoidingView>
      <View className="flex-row justify-between items-center py-3 h-[75px] w-full border-b border-gray-300">
        <View className="flex-row items-center space-x-4">
          <View className="w-[48px] h-[48px] rounded-full border border-gray-400 border-opacity-40">
            <Image source={item.icon} className="w-full h-full rounded-full" />
          </View>
          <View>
            <Text>{item.bank}</Text>
          </View>
        </View>
        <View>
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/main-features/(bank)/add-bank-item',
                params: {
                  previousRoute: params.previousRoute
                }
              })
            }
          >
            <ChevronRight size={24} color={Colors.secondary} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )

  const BankFlatList = () => {
    return (
      <View className="w-full mt-5">
        <View className="px-4">
          {filteredBankData.length == 0 ? (
            <View className="mt-10 flex justify-center items-center space-y-4">
              <CustomIcon name="SearchX" color={Colors.tertiary} size={64} />
              <SemiText className="text-lg text-tertiary">
                Không tìm thấy kết quả nào
              </SemiText>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 180
              }}
              data={filteredBankData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    )
  }

  return (
    <SharedLayout
      href={params.previousRoute || '/account/home'}
      title="Liên kết ngân hàng"
    >
      <View className="py-4 flex-1 flex-col justify-start gap-y-5">
        <View className="my-1 flex-row">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 flex-row items-center justify-between"
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="flex-1 items-center justify-center">
                <View className="w-full relative">
                  <TextInput
                    className="h-12 px-10 py-3 bg-[#D9D9D9] rounded-lg focus:border-primary"
                    placeholderTextColor={Colors.tertiary}
                    placeholder="Tìm kiếm ngân hàng"
                    value={searchValue}
                    onChangeText={(text) => setSearchValue(text)}
                    style={{ fontFamily: 'Inter' }}
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
            {searchValue.length > 0 && (
              <Pressable className="ml-3" onPress={clearSearchValue}>
                <NormalText className="text-secondary">Hủy</NormalText>
              </Pressable>
            )}
          </KeyboardAvoidingView>
        </View>
        <View>
          <SemiText className="text-secondary">
            {searchValue.length == 0 ? 'Toàn bộ ngân hàng' : 'Gợi ý cho bạn'}
          </SemiText>
          <BankFlatList />
        </View>
      </View>
    </SharedLayout>
  )
}
