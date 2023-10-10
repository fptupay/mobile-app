import { MediumText, NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AddBankSuccessScreen() {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 px-4">
      <StatusBar style="auto" />
      <View className="flex-1 justify-center space-y-8">
        <Image
          source={require('../assets/images/link-success.png')}
          className="mx-auto"
        />
        <MediumText className="text-2xl tracking-tight text-center text-primary">
          Liên kết thành công!
        </MediumText>
        <NormalText className="text-tertiary mx-auto text-center w-3/4">
          Bây giờ bạn có thể thực hiện các giao dịch một cách dễ dàng và tiện
          lợi rồi.
        </NormalText>
      </View>
      <View className="mb-4">
        <TextButton
          text="Nạp tiền ngay"
          type={TextButtonType.PRIMARY}
          onPress={() => router.push('/load-money')}
        />
      </View>
    </SafeAreaView>
  )
}
