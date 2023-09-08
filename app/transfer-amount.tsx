import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import SharedLayout from "../components/SharedLayout";
import TextField from "../components/TextField";
import { MediumText, NormalText } from "../components/Themed";
import TextButton from "../components/buttons/TextButton";
import { formatMoney } from "../utils/helper";

export default function TransferAmountScreen() {
  const [amount, setAmount] = useState<string>();
  const [suggestions, setSuggestions] = useState<number[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleAmountChange = (amount: string) => {
    const numericValue = amount.replace(/\D/g, "");
    const formattedAmount = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setAmount(formattedAmount);

    const baseAmount = parseInt(amount) || 0;
    const suggestions =
      baseAmount === 0 ? [] : [baseAmount, baseAmount * 10, baseAmount * 100];
    setSuggestions(suggestions);
  };

  const handleSuggestionPress = (suggestion: number) => {
    setAmount(formatMoney(suggestion));
  };

  return (
    <SharedLayout href="/transfer" title="Chuyển tiền">
      <View className="border border-gray-300 rounded-lg px-4 py-2 flex flex-row justify-between items-center m-4">
        <View className="flex items-center">
          <View className="ml-2">
            <MediumText className="text-black">Phạm Quang Hưng</MediumText>
            <NormalText className="text-tertiary">HE160005</NormalText>
          </View>
        </View>
        <MediumText className="text-primary">Thay đổi</MediumText>
      </View>

      <View>
        <TextInput
          className="text-4xl font-semibold text-primary text-center"
          placeholder="0đ"
          value={amount}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
        />
      </View>
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
      />
      <TextButton
        href="/transfer-confirmation"
        text="Chuyển tiền"
        type="primary"
      />
    </SharedLayout>
  );
}
