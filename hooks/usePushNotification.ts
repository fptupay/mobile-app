/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'

export interface PushNotification {
  expoPushToken?: Notifications.ExpoPushToken
  notification?: Notifications.Notification
}

export const usePushNotifications = (): PushNotification => {
  Notifications.setNotificationHandler({
    // eslint-disable-next-line @typescript-eslint/require-await
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    })
  })

  const [expoPushToken, setExpoPushToken] =
    useState<Notifications.ExpoPushToken>()
  const [notification, setNotification] = useState<Notifications.Notification>()

  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  async function registerForPushNotificationsAsync() {
    let token

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId
      })
    } else {
      alert('Must use physical device for Push Notifications')
    }

    return token
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .catch((error) => console.log(error))

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      )
      Notifications.removeNotificationSubscription(responseListener.current!)
    }
  }, [])

  return {
    expoPushToken,
    notification
  }
}
