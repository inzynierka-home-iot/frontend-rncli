import React from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { Button, TextInput } from 'react-native';
import { SignInData } from './SignInForm';
import { sendVerificationCode } from '../../utils/mtprotoClient';

type PhoneNumberFormProps = {
  control: Control<SignInData>;
  handleSubmit: UseFormHandleSubmit<SignInData>;
  setPhoneCodeHash: Dispatch<SetStateAction<string | undefined>>;
};

export const PhoneNumberForm = ({
  control,
  handleSubmit,
  setPhoneCodeHash,
}: PhoneNumberFormProps) => {
  const onLogin = async ({ phoneNumber }: SignInData) => {
    try {
      const res = await sendVerificationCode(phoneNumber);
      setPhoneCodeHash(res.phone_code_hash);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Telegram phone number"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Button title="log in" onPress={handleSubmit(onLogin)} />
    </>
  );
};
