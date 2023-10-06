import PromptModal from '@/components/PromptModal'
import SharedLayout from '@/components/SharedLayout'
import TextField from '@/components/TextField'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton from '@/components/buttons/TextButton'
import { useModalStore } from '@/stores/modalStore'
import { formatMoney } from '@/utils/helper'

import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

export default function TransferAmountScreen() {
  const [amount, setAmount] = useState<string>()
  const [suggestions, setSuggestions] = useState<number[]>([])
  const [message, setMessage] = useState<string>('')

  const isOpen = useModalStore((state) => state.isOpen)
  const setIsOpen = useModalStore((state) => state.setIsOpen)

  const handleAmountChange = (amount: string) => {
    // amount should not start with 0
    if (amount.startsWith('0')) {
      return
    }
    const numericValue = amount.replace(/\D/g, '')

    const baseAmount = parseInt(numericValue) || 0
    // prevent user from entering more than 100 million
    if (numericValue.length > 8 && numericValue !== '100000000') {
      return
    }

    // format amount with dot by thousands
    const formattedAmount = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
    setAmount(formatMoney(suggestion))
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      {isOpen && <PromptModal />}
      <SharedLayout href="/transfer" title="Chuyển tiền">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {/* Recipient info */}
            <View className="border border-gray-300 rounded-lg px-4 py-2 flex flex-row justify-between items-center mt-4">
              <View>
                <MediumText className="text-black">Phạm Quang Hưng</MediumText>
                <NormalText className="text-tertiary">HE160005</NormalText>
              </View>
              <MediumText className="text-primary">Thay đổi</MediumText>
            </View>

            {/* Entered amount */}
            <View className="flex-1 flex-row justify-center items-center">
              <TextInput
                className="text-4xl font-semibold text-primary w-full text-center"
                placeholder="0đ"
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
              />
            </View>
            {/* Suggestion */}
            <View className="space-x-2 flex-row">
              {suggestions.map((suggestion) => (
                <TouchableOpacity
                  key={suggestion}
                  onPress={() => handleSuggestionPress(suggestion)}
                  className="flex-wrap p-1 rounded-md bg-orange-100 text-primary"
                >
                  <MediumText>{formatMoney(suggestion)}</MediumText>
                </TouchableOpacity>
              ))}
            </View>
            <TextField
              value={message}
              label="Nhắn gửi"
              onChangeText={(text) => setMessage(text)}
              className="my-4"
            />
            <TextButton
              onPress={openModal}
              // href="/transfer-confirmation"
              text="Chuyển tiền"
              type="primary"
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SharedLayout>
    </>
  )
}
