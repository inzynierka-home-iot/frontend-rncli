import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { Button, TextInput } from 'react-native';
import { RootNavigationProps } from '../../App';
import { SignInData } from './SignInForm';
import { confirm2FAPassword } from '../../utils/confirm2FAPassword';
import { ReadStoredValue, SaveStoredValue } from '../../utils/EncryptedStorage';
import { resolveBotID } from '../../utils/resolveBotID';

type Password2FAFormProps = {
  control: Control<SignInData>;
  handleSubmit: UseFormHandleSubmit<SignInData>;
};

export const Password2FAForm = ({
  control,
  handleSubmit,
}: Password2FAFormProps) => {
  const navigation = useNavigation<RootNavigationProps>();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onConfirm = async ({ password }: SignInData) => {
    console.log(password);
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
