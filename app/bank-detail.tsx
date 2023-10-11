import { View, Image, Modal, ScrollView } from 'react-native'
import React, { useState } from 'react'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import { EyeOff } from 'lucide-react-native'
import Colors from '@/constants/Colors'
import { BlurView } from 'expo-blur'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import DescriptionRowItem, {
  ListItemProp
} from '@/components/DescriptionRowItem'

const mockPersonalData: ListItemProp[] = [
  {
    label: 'Chủ thẻ',
    description: 'NGUYEN QUANG HUNG'
  },
  {
    label: 'Ngày liên kết',
    description: '01/01/2023'
  }
]

const mockCardData = [
  {
    label: 'Nạp tiền tối thiểu',
    description: '10.000đ'
  },
  {
    label: 'Nạp tiền tối đa',
    description: '5.000.000đ'
  },
  {
    label: 'Rút tiền tối thiểu',
    description: '10.000đ'
  },
  {
    label: 'Rút tiền tối đa',
    description: '5.000.000đ'
  }
]

export default function BankDetail() {
  const [isModalVisible, setModalVisible] = useState(false)

  const handleTextButtonClick = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const handleCancelLink = () => {
    setModalVisible(false)
  }

  return (
    <SharedLayout href="/bank" title="Thông tin liên kết">
      <View className="py-4 bg-transparent flex-1 flex-col justify-between">
        <View className="bg-transparent">
          <View className=" w-full h-[225px] bg-[#FF8E3A] relative p-3 rounded-lg">
            <View className="absolute flex flex-row justify-between items-center p-3">
              <Image
                source={require('../assets/images/techcombank.png')}
                className=" h-10 w-10 mx-auto"
              />
              <MediumText className="tracking-tight text-center text-white ml-3 text-xl">
                Agribank
              </MediumText>
            </View>
            <View className="absolute flex flex-row items-center right-0 p-3 bottom-0">
              <MediumText className="tracking-tight text-white ml-3 text-lg">
                **** **** 1234
              </MediumText>
              <EyeOff size={20} color={Colors.white} className="ml-2" />
            </View>
          </View>
        </View>
        <ScrollView className="pt-6">
          <SemiText className="text-secondary pb-2">Thông tin cơ bản</SemiText>
          {mockPersonalData.map((item) => (
            <DescriptionRowItem
              key={item.label}
              label={item.label}
              description={item.description}
            />
          ))}
          <SemiText className="text-secondary pb-2 pt-6">
            Hạn mức giao dịch
          </SemiText>
          {mockCardData.map((item) => (
            <DescriptionRowItem
              key={item.label}
              label={item.label}
              description={item.description}
            />
          ))}
        </ScrollView>
      </View>
      <View className="bg-white p-4 shadow-sm shadow-tertiary absolute right-0 left-0 bottom-0">
        <TextButton
          text="Huỷ liên kết"
          type="primary"
          onPress={handleTextButtonClick}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <BlurView
          intensity={15}
          style={{ flex: 1, backgroundColor: 'rgba(80, 80, 80, 0.80)' }}
        >
          <View className="flex-1 justify-end mb-60 px-4">
            <View className="bg-white w-full h-[200px] rounded-lg shadow-2xl p-8">
              <MediumText className="text-2xl tracking-tight text-secondary mb-2">
                Huỷ liên kết
              </MediumText>
              <NormalText>
                Bạn có chắc muốn huỷ liên kết với ngân hàng x?
              </NormalText>
              <View className="flex flex-row justify-between text-center mt-4">
                <View className="w-[50%] mr-2">
                  <TextButton
                    text="Không"
                    type={TextButtonType.SECONDARY}
                    onPress={handleCancelLink}
                  />
                </View>
                <View className="w-[50%] mr-2">
                  <TextButton
                    text="Có"
                    type={TextButtonType.PRIMARY}
                    href="/link-information-bank"
                  />
                </View>
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>
    </SharedLayout>
  )
}
