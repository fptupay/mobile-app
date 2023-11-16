import GradientBackground from '@/components/GradientBackground'
import CustomIcon from '@/components/Icon'
import { NormalText, SemiText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { useTransactionStore } from '@/stores/bankStore'
import { WINDOW_HEIGHT } from '@/utils/helper'
import { StatusBar } from 'expo-status-bar'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { Image, Pressable, View } from 'react-native'

export default function TransferSuccessfulScreen() {
  const transactionDetails = useTransactionStore(
    (state) => state.transactionDetails
  )
  const {
    amount,
    balance,
    receiver_name,
    content,
    transaction_time,
    transaction_id
  } = transactionDetails

  const transferDetail = [
    {
      title: 'Loại thanh toán',
      content: 'Chuyển nhanh'
    },
    {
      title: 'Người nhận',
      content: receiver_name
    },
    {
      title: 'Số dư khả dụng',
      content: balance + ' đ'
    },
    {
      title: 'Nội dung giao dịch',
      content: content
    },
    {
      title: 'Thời gian giao dịch',
      content: transaction_time
    },
    {
      title: 'Mã giao dịch',
      content: transaction_id
    }
  ]

  const transactionItemsHtml = transferDetail
    .filter((_, index) => index !== 3)
    .map(
      (item: any) => `
  <div style="display: flex; justify-content: space-between; margin-bottom: 16px">
    <h3 style="color: #808080; flex: 1 1 0%">
      ${item.title}
    </h3>
    <p style="color: black; flex: 1 1 0%; text-align: right">
      ${item.content}
    </p>
  </div>
`
    )
    .join('')

  // include transaction details in html
  const html = `
   <html>
      <body style="background-color: #f1f5f9; padding: 2rem">
        <h1> Hoá đơn chuyển tiền </h1>
        ${transactionItemsHtml}
      </body>
    </html>
    `

  const handleShareBill = async () => {
    const file = await printToFileAsync({ html: html, base64: false })
    await shareAsync(file.uri)
  }

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <View style={{ height: WINDOW_HEIGHT * 0.25 }}>
        <GradientBackground />
        <View className="absolute right-6 top-16">
          <Pressable onPress={handleShareBill}>
            <CustomIcon name="Share" color="#000" size={24} />
          </Pressable>
        </View>
      </View>

      <View
        className="absolute left-0 right-0 bottom-0 bg-white flex-1 px-4 rounded-t-[30px] flex justify-start items-center"
        style={{ top: WINDOW_HEIGHT * 0.2 }}
      >
        <Image
          source={require('@/assets/images/tick-circle.png')}
          className="w-[80px] h-[80px] mx-auto mt-[-40px]"
        />
        <SemiText className="text-primary text-2xl text-center mt-4">
          Chuyển tiền thành công!
        </SemiText>
        <SemiText className="text-4xl text-secondary mt-4">{amount} đ</SemiText>

        <View className="w-full h-px bg-[#E1E1E1] mt-4"></View>

        <View className="mt-4 w-full">
          {transferDetail.map((item, index) => (
            <View key={index} className="flex flex-row justify-between mb-4">
              <NormalText className="text-tertiary flex-1">
                {item.title}
              </NormalText>
              <NormalText className="text-secondary flex-1 text-right">
                {item.content}
              </NormalText>
            </View>
          ))}
        </View>

        <View className="w-full mb-4 mt-auto" style={{ rowGap: 12 }}>
          <TextButton
            text="Về trang chủ"
            type={TextButtonType.PRIMARY}
            href="/account/home"
          />
          <TextButton
            text="Lưu bạn bè"
            type={TextButtonType.OUTLINE}
            href="/transfer/transfer-list"
          />
        </View>
      </View>
    </View>
  )
}
