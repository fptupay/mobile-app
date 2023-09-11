import SharedLayout from "@/components/SharedLayout";
import TextField from "@/components/TextField";
import { SemiText } from "@/components/Themed";
import TextButton from "@/components/buttons/TextButton";

import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export default function TransferMoneyScreen() {
  const [studentCode, setStudentCode] = useState<string>();
  const [owner, setOwner] = useState<string>();
  const [error, setError] = useState<string>();

  return (
    <SharedLayout href="/transfer-list" title="Chuyển tiền tới">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="space-y-6">
          <SemiText className="mt-4">Thông tin người nhận mới</SemiText>
          <TextField
            value={studentCode}
            label="Mã sinh viên"
            errorText={error}
            onChangeText={(text) => setStudentCode(text)}
          />
          <TextField
            value={owner}
            label="Chủ tài khoản"
            errorText={error}
            onChangeText={(text) => setOwner(text)}
          />
        </View>
      </TouchableWithoutFeedback>
      <View className="mt-auto">
        <TextButton href="/transfer-amount" text="Tiếp tục" type="primary" />
      </View>
    </SharedLayout>
  );
}
