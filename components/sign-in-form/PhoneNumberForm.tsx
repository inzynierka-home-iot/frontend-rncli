import React from 'react-native';
import { Dispatch, SetStateAction, useState } from 'react';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { Button, TextInput } from 'react-native';
import { SignInData } from './SignInForm';
import { sendVerificationCode } from '../../utils';

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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onLogin = async ({ phoneNumber }: SignInData) => {
    setIsButtonDisabled(true);
    const res = await sendVerificationCode(phoneNumber);
    setIsButtonDisabled(false);
    if (res) {
      setPhoneCodeHash(res.phone_code_hash);
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
      <Button
        disabled={isButtonDisabled}
        title="log in"
        onPress={handleSubmit(onLogin)}
      />
    </>
  );
};
