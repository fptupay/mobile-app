import { TouchableOpacity, View } from 'react-native'
import { MediumText, NormalText } from './Themed'
import TextButton, { TextButtonType } from './buttons/TextButton'
import { useModalStore } from '@/stores/modalStore'

export default function PromptModal({ type }: { type: string }) {
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
          <MediumText className="text-primary mb-2 text-xl">
            Thông báo
          </MediumText>
          <NormalText className="text-tertiary mb-4">
            {type === 'not-enough-balance'
              ? 'Số tiền còn lại trong tài khoản của bạn không đủ để thực hiện giao dịch này. Hãy nạp thêm tiền vào tài khoản nhé.'
              : 'Số tiền nhỏ hơn hạn mức tối thiểu trên 1 giao dịch (10.000 đ)'}
          </NormalText>
          <View
            className="flex flex-row justify-around"
            style={{ columnGap: 16 }}
          >
            <View className="flex-1">
              <TextButton
                onPress={closeModal}
                text="Đóng"
                type={TextButtonType.SECONDARY}
              />
            </View>
            {type === 'not-enough-balance' ? (
              <View className="flex-1">
                <TextButton
                  href="/main-features/deposit/load-money"
                  text="Nạp tiền"
                  type={TextButtonType.PRIMARY}
                />
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
