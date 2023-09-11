import { View, StyleSheet } from 'react-native'
import StepCircle from './StepCircle'

export const StepType = {
  FRONT: 'front',
  BACK: 'back',
  SELFIE: 'selfie'
}

export default function StepProgress({ type }: { type: string | string[] }) {
  return (
    <View className="flex flex-row justify-center items-center">
      <StepCircle
        index="1"
        active={type == StepType.FRONT}
        complete={type == StepType.BACK || type == StepType.SELFIE}
      />
      <View
        style={{
          borderBottomColor: '#808080',
          width: 95,
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
      />
      <StepCircle
        index="2"
        active={type == StepType.BACK}
        complete={type == StepType.SELFIE}
      />
      <View
        style={{
          borderBottomColor: '#808080',
          width: 95,
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
      />
      <StepCircle index="3" active={type == StepType.SELFIE} complete={false} />
    </View>
  )
}
