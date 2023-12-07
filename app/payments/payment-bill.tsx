import { View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getDNGBillByFeeType } from '@/api/bill'
import SharedLayout from '@/components/SharedLayout'
import DescriptionRowItem from '@/components/DescriptionRowItem'
import { MediumText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { formatMoney } from '@/utils/helper'
import { router, useLocalSearchParams } from 'expo-router'
import LoadingSpin from '@/components/LoadingSpin'
import { useTransferStore } from '@/stores/transferStore'
import { usePaymentStore } from '@/stores/paymentStore'

export default function PaymentBillScreen() {
  const { type } = useLocalSearchParams()
  console.log(
    '🚀 ~ file: payment-bill.tsx:16 ~ PaymentBillScreen ~ type:',
    type
  )
  const { setTransactionType, setTransactionId } = useTransferStore()
  const { setPendingBill } = usePaymentStore()

  const { data: bill, isLoading } = useQuery({
    queryKey: ['bill'],
    queryFn: () => getDNGBillByFeeType(type as string),
    onSuccess: (data) => {
      setTransactionType(data?.data[0].type)
      setTransactionId(data?.data[0].transaction_id)
      setPendingBill(data?.data[0])
    }
  })

  const billForm = [
    {
      label: 'Mã hóa đơn',
      description: bill?.data[0]?.id
    },
    {
      label: 'Loại hóa đơn',
      description: bill?.data[0]?.type_desc
    },
    {
      label: 'Số tiền',
      description: bill?.data[0] && formatMoney(bill?.data[0]?.amount)
    },
    {
      label: 'Nội dung',
      description: bill?.data[0]?.item_name
    },
    {
      label: 'Mã giao dịch',
      description: bill?.data[0]?.transaction_id
    }
  ]

  return (
    <>
      <SharedLayout title="Hóa đơn">
        <MediumText className="mt-6 text-secondary">
          Vui lòng kiểm tra lại chi tiết hoá đơn trước khi thanh toán nhé!
        </MediumText>
        <View className="mt-4">
          {isLoading ? (
            <LoadingSpin />
          ) : (
            <View>
              {billForm.map((item: any) => (
                <DescriptionRowItem
                  key={item.label}
                  label={item.label}
                  description={item.description}
                />
              ))}
            </View>
          )}
        </View>

        <View className="mt-auto mb-4">
          <TextButton
            onPress={() => router.replace('/transfer/otp')}
            text="Tiếp tục"
            type="primary"
          />
        </View>
      </SharedLayout>
    </>
  )
}
