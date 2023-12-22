import { getTransactionDetails } from '@/api/transaction'
import CustomIcon from '@/components/Icon'
import SharedLayout from '@/components/SharedLayout'
import { MediumText, NormalText, SemiText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import Colors from '@/constants/Colors'
import { formatDateTime, formatMoney } from '@/utils/helper'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import * as Clipboard from 'expo-clipboard'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'

export default function TransactionDetailScreen() {
  const params: { id: string } = useLocalSearchParams()

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ['transaction-detail', params.id],
    queryFn: () => getTransactionDetails(params.id)
  })
  console.log(data.data.am)

  const details = [
    {
      title: 'Số tiền',
      value: isFetched && formatMoney(data?.data.amount) + ' đ'
    },
    {
      title: 'Người nhận',
      value: data?.data.fund_transfer_detail?.receiver_name ?? 'Không có'
    },
    {
      title: 'Mã sinh viên',
      value: data?.data.fund_transfer_detail?.destination ?? 'Không có'
    },
    {
      title: 'Nội dung giao dịch',
      value: data?.data.fund_transfer_detail?.description ?? 'Không có'
    },
    {
      title: 'Thời gian',
      value: isFetched && formatDateTime(data?.data.created_at)
    },
    {
      title: 'Mã giao dịch',
      value: data?.data.transaction_id
    },
    {
      title: 'Trạng thái',
      value: 'Thành công'
    },
    {
      title: 'Số dư khả dụng',
      value: isFetched && `${formatMoney(data?.data.close_balance)} đ`
    }
  ]

  const filteredDetails = details.filter((item) => item.value !== 'Không có')

  const transferDetailHtml = filteredDetails
    .slice(0, -1)
    .map(
      (item: any) => `
  <div style="display: flex; justify-content: space-between; margin-bottom: 16px">
    <h3 style="color: #808080; flex: 1 1 0%">
      ${item.title}
    </h3>
    <p style="color: black; flex: 1 1 0%; text-align: right">
      ${item.value}
    </p>
  </div>
`
    )
    .join('')

  const html = `
   <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="background-color: #f1f5f9; padding: 2rem; font-family: Helvetica Neue;">
        <h1 style="font-size: 48px; margin-bottom: 32px"> Hoá đơn chuyển tiền </h1>
        <h2 style="font-size: 20px; margin-bottom: 48px"> Cảm ơn bạn đã sử dụng dịch vụ của FPTUPay! </h2>
        ${transferDetailHtml}
      </body>
    </html>
    `

  const handleShareBill = async () => {
    const file = await printToFileAsync({ html: html, base64: false })
    await shareAsync(file.uri)
  }

  const handleCopyTransactionId = async () => {
    await Clipboard.setStringAsync(data?.data.transaction_id)
  }

  return (
    <SharedLayout title="Chi tiết giao dịch" backHref="/account/home">
      {isLoading ? (
        <View className="flex justify-center items-center mt-8 h-full">
          <ActivityIndicator size="large" color={Colors.tertiary} />
          <NormalText className="mt-2 text-tertiary">
            Đang tải dữ liệu
          </NormalText>
        </View>
      ) : (
        <>
          <MediumText className="text-secondary mt-4">
            {data?.data.trans_code === 'TRANSFER'
              ? 'Chuyển tiền nhanh'
              : data?.data.description}
          </MediumText>

          <SemiText className="text-4xl text-center mt-4 text-secondary">
            {' '}
            {formatMoney(data?.data.amount)} đ
          </SemiText>
          <View className="h-[1px] mt-4 w-full mx-auto bg-gray-200" />

          <View className="mt-4">
            <View className="mt-2 flex space-y-4">
              {filteredDetails.map((item) => (
                <View className="flex-row justify-between" key={item.title}>
                  <NormalText className="text-tertiary">
                    {item.title}
                  </NormalText>
                  <View className="flex flex-row flex-1 justify-end">
                    <NormalText className="mr-1 text-secondary text-right">
                      {item.value}
                    </NormalText>
                    {item.title === 'Mã giao dịch' && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleCopyTransactionId}
                      >
                        <CustomIcon
                          name="Copy"
                          size={20}
                          color={Colors.tertiary}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-auto mb-4">
            {data?.data.amount < 0 && (
              <TextButton
                text="Trợ giúp"
                type="primary"
                onPress={() => {
                  router.push('/help-center/create-request')
                }}
              />
            )}
            <View className="mt-2">
              <TextButton
                text="Chia sẻ biên lai"
                type="outline"
                onPress={handleShareBill}
              />
            </View>
          </View>
        </>
      )}
    </SharedLayout>
  )
}
