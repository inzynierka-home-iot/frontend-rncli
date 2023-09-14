import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { Button, TextInput } from 'react-native';
import { RootNavigationProps } from '../../App';
import { SignInData } from './SignInForm';
import { logIn2FA } from '../../utils/logIn2FA';
import { storeUserID } from '../../utils/storeUserID';

type ConfirmationFormProps = {
  control: Control<SignInData>;
  handleSubmit: UseFormHandleSubmit<SignInData>;
  phoneCodeHash: string;
};

export const ConfirmationForm = ({
  control,
  handleSubmit,
  phoneCodeHash,
}: ConfirmationFormProps) => {
  const navigation = useNavigation<RootNavigationProps>();

  const onConfirm = async ({ phoneNumber, phoneCode }: SignInData) => {
    const res = await logIn2FA(phoneNumber, phoneCodeHash, phoneCode);
    if (res._ == 'auth.authorization') {
      await storeUserID();
      navigation.navigate('Telegram');
    }
  };

  return (
    <>
      <Controller
        control={control}
        name="phoneCode"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Telegram code you received from app"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Button title="confirm your account" onPress={handleSubmit(onConfirm)} />
    </>
  );
};
