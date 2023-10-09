import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { Button, TextInput } from 'react-native';
import { RootNavigationProps } from '../../App';
import { SignInData } from './SignInForm';
import { logInCode } from '../../utils/logInCode';
import { resolveBotID } from '../../utils/resolveBotID';
import { ReadStoredValue, SaveStoredValue } from '../../utils/EncryptedStorage';
import { Password2FAForm } from './Password2FAFom';

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
  const [is2FANeeded, setis2FANeeded] = useState(false);

  const onCode = async ({ phoneNumber, phoneCode }: SignInData) => {
    setIsButtonDisabled(true);
    const res = await logInCode(phoneNumber, phoneCodeHash, phoneCode);
    setIsButtonDisabled(false);

    if (res === '2fa') {
      setis2FANeeded(true);
    } else if (res._ === 'auth.authorization') {
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
      {is2FANeeded ? (
        <Password2FAForm control={control} handleSubmit={handleSubmit} />
      ) : (
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
            onPress={handleSubmit(onCode)}
          />
        </>
      )}
    </>
  );
};
