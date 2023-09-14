import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ConfirmationForm } from './ConfirmationForm';
import { PhoneNumberForm } from './PhoneNumberForm';
import { RootNavigationProps } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { ReadStoredValue } from '../../utils/EncryptedStorage';

export type SignInData = {
  phoneNumber: string;
  phoneCode: string;
};

export const SignInForm = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const [phoneCodeHash, setPhoneCodeHash] = useState<string>();

  const { control, handleSubmit } = useForm<SignInData>({
    defaultValues: {
      phoneNumber: '',
      phoneCode: '',
    },
  });

  useEffect(() => {
    (async () => {
      const resLogging = await ReadStoredValue('4authKey');
      if (resLogging) {
        navigation.navigate('Telegram');
      }
    })();
  }, [navigation]);

  return (
    <>
      {phoneCodeHash ? (
        <ConfirmationForm
          control={control}
          handleSubmit={handleSubmit}
          phoneCodeHash={phoneCodeHash}
        />
      ) : (
        <PhoneNumberForm
          control={control}
          handleSubmit={handleSubmit}
          setPhoneCodeHash={setPhoneCodeHash}
        />
      )}
    </>
  );
};
