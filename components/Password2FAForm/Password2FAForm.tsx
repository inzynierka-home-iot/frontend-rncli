import React, { useState } from 'react';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { Button, TextInput } from 'react-native';
import {
  confirm2FAPassword,
  ReadStoredValue,
  resolveBotID,
  SaveStoredValue,
} from '../../utils';
import { useAppNavigation } from '../../hooks';
import { SignInData } from '../../types';

type Password2FAFormProps = {
  control: Control<SignInData>;
  handleSubmit: UseFormHandleSubmit<SignInData>;
};

export const Password2FAForm = ({
  control,
  handleSubmit,
}: Password2FAFormProps) => {
  const navigation = useAppNavigation();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onConfirm = async ({ password }: SignInData) => {
    setIsButtonDisabled(true);
    const res = await confirm2FAPassword(password);
    setIsButtonDisabled(false);
    if (res.res._ === 'auth.authorization') {
      const botAccessHash = await ReadStoredValue(
        'bot_conversation_access_hash',
      );
      const botUserID = await ReadStoredValue('bot_user_id');
      if (!botAccessHash || !botUserID) {
        await resolveBotID();
      }
      SaveStoredValue('SignedIn', 'true');
      navigation.replace('Telegram');
    }
  };

  return (
    <>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Your 2FA password"
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
      />
      <Button
        title="Confirm your password"
        disabled={isButtonDisabled}
        onPress={handleSubmit(onConfirm)}
      />
    </>
  );
};
