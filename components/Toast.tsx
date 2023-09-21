import { WINDOW_HEIGHT } from '@/utils/helper'
import React, { useEffect, useRef } from 'react'
import { Animated, Platform, StyleSheet, Text } from 'react-native'

interface ToastProps {
  type: string
  label: string
  visible: boolean
}

export default function Toast({ type, label, visible }: ToastProps) {
  const popAnim = useRef(new Animated.Value(WINDOW_HEIGHT * -1)).current

  useEffect(() => {
    popIn()
  }, [visible])

  const popIn = () => {
    Animated.timing(popAnim, {
      toValue:
        Platform.OS === 'ios' ? WINDOW_HEIGHT * -0.88 : WINDOW_HEIGHT * -0.95,
      duration: 300,
      useNativeDriver: true
    }).start(popOut)
  }

  const popOut = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: WINDOW_HEIGHT * -1.05,
        duration: 300,
        useNativeDriver: true
      }).start()
    }, 2000)
  }

  return (
    <Animated.View
      className={
        type == 'alert'
          ? 'bg-red-600'
          : type == 'warning'
            ? 'bg-orange-400'
            : 'bg-green-600'
      }
      style={[
        styles.toastContainer,
        {
          transform: [{ translateY: popAnim }]
        }
      ]}
    >
      <Text style={styles.labelText}>{label}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  toastContainer: {
    height: 80,
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    elevation: 5,
    marginHorizontal: 'auto',
    paddingVertical: 10
  },
  labelText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 'auto'
  }
})
