import React, { Button, TextInput } from 'react-native'
import { type Dispatch, type ReactElement, type SetStateAction } from 'react'
import { type Control, Controller, type UseFormHandleSubmit } from 'react-hook-form'
import { type SignInData } from './SignInForm'
import { sendVerificationCode } from '../../utils/mtprotoClient'

interface PhoneNumberFormProps {
    control: Control<SignInData>
    handleSubmit: UseFormHandleSubmit<SignInData>
    setPhoneCodeHash: Dispatch<SetStateAction<string | undefined>>
}

export const PhoneNumberForm = ({ control, handleSubmit, setPhoneCodeHash }: PhoneNumberFormProps): ReactElement => {
    const onLogin = async ({ phoneNumber }: SignInData): Promise<void> => {
        try {
            const res = await sendVerificationCode(phoneNumber)
            setPhoneCodeHash(res.phone_code_hash)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value } }) => (
                    <TextInput placeholder="Telegram phone number" onChangeText={onChange} value={value} />
                )}
            />
            <Button title="log in" onPress={handleSubmit(onLogin)} />
        </>
    )
}
