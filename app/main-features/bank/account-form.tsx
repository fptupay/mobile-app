import TextField from '@/components/TextField'
import { NormalText, SemiText } from '@/components/Themed'
import { Controller } from 'react-hook-form'
import { View } from 'react-native'

export default function AccountForm({ accountForm }: { accountForm: any }) {
  return (
    <View className="bg-transparent">
      <SemiText className="text-secondary">Thông tin liên kết</SemiText>
      <Controller
        control={accountForm.control}
        name="card_no"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Số tài khoản"
            className="mt-5 mb-1"
            keyboardType="numeric"
            value={value}
            editable={true}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {accountForm.formState.errors.card_no && (
        <NormalText className="text-red-500">
          {accountForm.formState.errors.card_no.message}
        </NormalText>
      )}
    </View>
  )
}
