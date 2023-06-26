import React, { type ReactElement } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { sendIOTMessage } from '../../utils/mtprotoClient'

interface TelegramFormData {
    telegramMessage: string
}

export const TelegramForm = (): ReactElement => {
    const { control, handleSubmit } = useForm<TelegramFormData>({
        defaultValues: {
            telegramMessage: '',
        },
    })

    const onSubmit: any = async (telegramMessage: never) => await sendIOTMessage(telegramMessage)

    return (
        <View>
            <Controller
                control={control}
                name="telegramMessage"
                render={({ field: { onChange, value } }) => (
                    <TextInput placeholder="telegram message" onChangeText={onChange} value={value} style={styles.input} />
                )}
            />
            <Button title="submit" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})
