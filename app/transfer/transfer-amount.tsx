import PromptModal from '@/components/PromptModal'
import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useAccountStore } from '@/stores/accountStore'
import { useModalStore } from '@/stores/modalStore'
import { formatMoney } from '@/utils/helper'
import { useLocalSearchParams, useRouter } from 'expo-router'

import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

export default function TransferAmountScreen() {
  const router = useRouter()
  const { studentCode, receiver } = useLocalSearchParams()
  const { full_name } = useAccountStore((state) => state.details)

  const [amount, setAmount] = useState('')
  const [rawAmount, setRawAmount] = useState('')
  const [suggestions, setSuggestions] = useState<number[]>([])
  const [message, setMessage] = useState(`${full_name} chuyển tiền`)
  const [alertType, setAlertType] = useState('')

  const isKeyboardVisible = useKeyboard()
  const isOpen = useModalStore((state) => state.isOpen)
  const setIsOpen = useModalStore((state) => state.setIsOpen)
  const balance = useAccountStore((state) => state.balance)

  const handleAmountChange = (amount: string) => {
    // amount should not start with 0
    if (amount.startsWith('0')) {
      return
    }
    const numericValue = amount.replace(/\D/g, '')
    const baseAmount = parseInt(numericValue) || 0
    // prevent user from entering more than 100 million
    if (numericValue.length > 8 || baseAmount > 100000000) {
      return
    }

    // format amount with dot by thousands
    const formattedAmount = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    setRawAmount(numericValue)
    setAmount(formattedAmount)

    let suggestions: any[] = []
    switch (true) {
      case baseAmount === 0:
        suggestions = []
        break
      case baseAmount > 999999:
        suggestions = [baseAmount, baseAmount * 10]
        break
      default:
        suggestions = [baseAmount, baseAmount * 10, baseAmount * 100]
        break
    }
    setSuggestions(suggestions.filter((suggestion) => suggestion <= 100000000))
  }

  const handleSuggestionPress = (suggestion: number) => {
    setAmount(formatMoney(suggestion.toString()))
    setRawAmount(suggestion.toString().replace(/\D/g, ''))
  }

  const handleTransfer = () => {
    if (+rawAmount > +balance) {
      setIsOpen(true)
      setAlertType('not-enough-balance')
    } else if (+rawAmount < 10000) {
      setIsOpen(true)
      setAlertType('min-amount')
    } else {
      setIsOpen(false)
      router.push({
        pathname: '/transfer/transfer-confirmation',
        params: { amount: rawAmount, message, studentCode, receiver }
      })
    }
  }

  return (
    <>
      {isOpen && <PromptModal type={alertType} />}
      <SharedLayout title="Chuyển tiền">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            className="flex-1 justify-between"
            keyboardVerticalOffset={100}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {/* Recipient info */}
            <View className="border border-gray-300 rounded-lg px-4 py-2 flex flex-row justify-between items-center mt-4">
              <View>
                <MediumText className="text-black">{receiver}</MediumText>
                <NormalText className="text-tertiary">{studentCode}</NormalText>
              </View>
              <Pressable onPress={() => router.back()}>
                <MediumText className="text-primary">Thay đổi</MediumText>
              </Pressable>
            </View>

            {/* Entered amount */}
            <View className="justify-center items-center">
              <TextInput
                className="text-4xl font-semibold text-primary w-full text-center"
                placeholder="0đ"
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
                autoFocus
              />
              <NormalText className="text-tertiary">
                Số dư hiện tại: {formatMoney(balance)}đ
              </NormalText>
            </View>

            <View className="mb-4">
              {/* Suggestion */}
              <View
                className={`${
                  isKeyboardVisible ? 'justify-start' : 'justify-end'
                }`}
              >
                <View className="space-x-2 flex-row">
                  {suggestions.map((suggestion) => (
                    <TouchableOpacity
                      key={suggestion}
                      onPress={() => handleSuggestionPress(suggestion)}
                      className="flex-wrap p-1 rounded-md bg-orange-100"
                    >
                      <MediumText className="text-secondary">
                        {formatMoney(suggestion)}
                      </MediumText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TextField
                value={message}
                label="Nhắn gửi"
                onChangeText={(text) => setMessage(text)}
                className="my-4"
              />
              <TextButton
                onPress={handleTransfer}
                text="Tiếp tục"
                type="primary"
                disable={!amount}
              />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SharedLayout>
    </>
  )
}
