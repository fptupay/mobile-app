import { TouchableOpacity, View } from 'react-native'
import { NormalText } from './Themed'
import TextButton, { TextButtonType } from './buttons/TextButton'
import { useModalStore } from '@/stores/modalStore'

export default function PromptModal() {
  const setIsOpen = useModalStore((state) => state.setIsOpen)

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <TouchableOpacity
      onPressIn={closeModal}
      className="absolute z-10 bg-black/50 w-full h-full flex justify-center items-center px-4"
    >
      <TouchableOpacity activeOpacity={0.8}>
        <View className="bg-white rounded-lg p-5">
          <NormalText className="text-tertiary text-center mb-8">
            Rất tiếc, giao dịch không thể thực hiện vì bạn không có đủ tiền
            trong ví. Hãy nạp thêm tiền vào tài khoản nhé.
          </NormalText>
          <View
            className="flex flex-row justify-around"
            style={{ columnGap: 16 }}
          >
            <View className="flex-1">
              <TextButton
                onPress={closeModal}
                text="Hủy"
                type={TextButtonType.SECONDARY}
              />
            </View>
            <View className="flex-1">
              <TextButton
                href="/main-features/deposit/load-money"
                text="Nạp tiền"
                type={TextButtonType.PRIMARY}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
