import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { Button, TextInput } from 'react-native';
import { RootNavigationProps } from '../../App';
import { SignInData } from './SignInForm';
import { logIn2FA } from '../../utils/logIn2FA';
import { resolveBotID } from '../../utils/resolveBotID';
import { ReadStoredValue } from '../../utils/EncryptedStorage';

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

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onConfirm = async ({ phoneNumber, phoneCode }: SignInData) => {
    setIsButtonDisabled(true);
    const res = await logIn2FA(phoneNumber, phoneCodeHash, phoneCode);
    setIsButtonDisabled(false);
    if (res._ == 'auth.authorization') {
      const botAccessHash = await ReadStoredValue(
        'bot_conversation_access_hash',
      );
      const botUserID = await ReadStoredValue('bot_user_id');
      if (!botAccessHash || !botUserID) await resolveBotID();
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
      <Button
        title="confirm your account"
        disabled={isButtonDisabled}
        onPress={handleSubmit(onConfirm)}
      />
    </>
  );
};
