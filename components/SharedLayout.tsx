import { WINDOW_HEIGHT } from '@/utils/helper'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import GradientBackground from './GradientBackground'
import { SemiText } from './Themed'
import BackButton from './buttons/BackButton'
import QuestionButton from './buttons/QuestionButton'

interface SharedLayoutProps {
  backHref?: string
  questionHref?: string
  title: string
  children: React.ReactNode
  hasInstruction?: boolean
}

export default function SharedLayout({
  backHref,
  questionHref,
  title,
  children,
  hasInstruction
}: SharedLayoutProps) {
  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <View style={{ height: WINDOW_HEIGHT * 0.25 }}>
        <GradientBackground />
        <SafeAreaView className="px-4 pt-4">
          <View className="flex-row justify-between">
<<<<<<< HEAD
            {backHref ? <BackButton href={backHref}/> : <BackButton />}
=======
            {backHref ? <BackButton href={backHref} /> : <BackButton />}
>>>>>>> 3a6b3db5ba3d356ef5e42b681e05486b8ec9e273
            {hasInstruction ? <QuestionButton href={questionHref} /> : null}
          </View>

          <SemiText
            className="text-2xl text-secondary"
            style={{ marginTop: WINDOW_HEIGHT * 0.04 }}
          >
            {title}
          </SemiText>
        </SafeAreaView>
      </View>
      <View
        className="absolute left-0 right-0 bottom-0 bg-white flex-1 px-4 rounded-t-[30px] flex "
        style={{ top: WINDOW_HEIGHT * 0.2 }}
      >
        {children}
      </View>
    </View>
  )
}
