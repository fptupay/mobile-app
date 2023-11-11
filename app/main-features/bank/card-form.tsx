import TextField from '@/components/TextField'
import { NormalText, SemiText } from '@/components/Themed'
import { Controller } from 'react-hook-form'
import { View } from 'react-native'

export default function CardForm({ cardForm }: { cardForm: any }) {
  const handleExpDateFormat = (value: string) => {
    let newValue = value.replace(/\//g, '')
    if (newValue.length > 2) {
      newValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`
    }
    return newValue
  }

  return (
    <View className="bg-transparent">
      <SemiText className="text-secondary">Thông tin liên kết</SemiText>
      <Controller
        control={cardForm.control}
        name="card_no"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Số thẻ"
            className="mt-5 mb-1"
            keyboardType="numeric"
            value={value}
            editable={true}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {cardForm.formState.errors.card_no && (
        <NormalText className="text-red-500">
          {cardForm.formState.errors.card_no.message}
        </NormalText>
      )}
      <Controller
        control={cardForm.control}
        name="issue_date"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Ngày hết hạn"
            className="mt-5 mb-1"
            keyboardType="numeric"
            value={value}
            editable={true}
            onBlur={onBlur}
            maxLength={5}
            onChangeText={(value) => {
              onChange(handleExpDateFormat(value))
            }}
          />
        )}
      />
      {cardForm.formState.errors.issue_date && (
        <NormalText className="text-red-500">
          {cardForm.formState.errors.issue_date.message}
        </NormalText>
      )}
    </View>
  )
}
