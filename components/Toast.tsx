import { WINDOW_HEIGHT } from '@/utils/helper'
import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'

interface ToastProps {
  type: string
  label: string
}

export default function Toast({ type, label }: ToastProps) {
  const popAnim = useRef(new Animated.Value(WINDOW_HEIGHT * -1)).current

  useEffect(() => {
    popIn()
  }, [])

  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: WINDOW_HEIGHT * -0.96,
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
      style={[
        styles.toastContainer,
        {
          transform: [{ translateY: popAnim }]
        }
      ]}
    >
      <Text style={styles.labelText}>
        {label} - {type}
      </Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  toastContainer: {
    height: 70,
    width: '100%',
    backgroundColor: 'green',
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
