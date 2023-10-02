import { SafeAreaView } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import React from 'react'
import { Text } from 'react-native'

export default function QRScannerScreen() {
  return (
    <SafeAreaView>
      <Text>QRScanner</Text>
      <TextButton
        text="Verify e-KYC"
        type={TextButtonType.PRIMARY}
        href="/(authentication)/ekyc/ekyc-rule"
      />
    </SafeAreaView>
  )
}
