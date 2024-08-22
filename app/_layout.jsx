import { View, Text } from 'react-native'
import React from 'react'
import { Slot,Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <>
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: false}} />
       <Stack.Screen name="register/worker" options={{ headerShown: false}} />
         <Stack.Screen name="register/worker-other-info" options={{ headerShown: false}} />
         <Stack.Screen name="profile" options={{ headerShown: false}} />
            <Stack.Screen name="login" options={{ headerShown: false}} />
            <Stack.Screen name="register/contractor" options={{ headerShown: false}} />
            <Stack.Screen name="landing/contractor" options={{ headerShown: false}} />
            <Stack.Screen name="landing/worker" options={{ headerShown: false}} />
            <Stack.Screen name="workersList" options={{ headerShown: false}} />
            <Stack.Screen name="language_choose" options={{ headerShown: false}} />
    </Stack>
    </>
  )
}

export default RootLayout