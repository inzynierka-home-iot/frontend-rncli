import React, { type ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { ConfrimationForm } from './ConfirmationForm'
import { PhoneNumberForm } from './PhoneNumberForm'

export interface SignInData {
    phoneNumber: string
    phoneCode: string
}

export const SignInForm = (): ReactElement => {
    const { control, handleSubmit } = useForm<SignInData>({
        defaultValues: {
            phoneNumber: '',
            phoneCode: '',
        },
    })

    const [phoneCodeHash, setPhoneCodeHash] = useState<string>()

    return (
        <View>
            {phoneCodeHash != null ? (
                <ConfrimationForm control={control} handleSubmit={handleSubmit} phoneCodeHash={phoneCodeHash} />
            ) : (
                <PhoneNumberForm control={control} handleSubmit={handleSubmit} setPhoneCodeHash={setPhoneCodeHash} />
            )}
        </View>
    )
}
