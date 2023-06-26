import 'stream-browserify'
import 'react-native-quick-crypto'
import React, { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { type StackNavigationProp } from '@react-navigation/stack'
import { SignInForm, TelegramForm } from './components'
import { useEffect, useState } from 'react'
import { connect } from './utils/mtprotoClient'

export interface RootStackParamList {
    SignIn: undefined
    Telegram: undefined
}

// @ts-expect-error - this is a hack to get the type of the navigation prop
export type RootNavigationProps = StackNavigationProp<RootStackParamList>

// @ts-expect-error - this is a hack to get the type of the navigation prop
const Stack = createNativeStackNavigator<RootStackParamList>()

const App: Element = () => {
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        void (async () => {
            const res = await connect()
            if (res !== undefined) {
                setIsConnected(true)
            }
        })()
    }, [])

    return (
        <NavigationContainer>
            {isConnected ? (
                <Stack.Navigator>
                    <Stack.Screen name="SignIn" component={SignInForm} />
                    <Stack.Screen name="Telegram" component={TelegramForm} />
                </Stack.Navigator>
            ) : (
                <Text>Loading</Text>
            )}
        </NavigationContainer>
    )
}

export default App
