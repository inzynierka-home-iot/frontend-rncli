import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ConfrimationForm } from './ConfirmationForm';
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

  useEffect(() => {
    (async () => {
      const resLogging = await ReadStoredValue('4authKey');
      if (resLogging) {
        navigation.navigate('Telegram');
      }
    })();
  }, [navigation]);

  const { control, handleSubmit } = useForm<SignInData>({
    defaultValues: {
      phoneNumber: '',
      phoneCode: '',
    },
  });

  const [phoneCodeHash, setPhoneCodeHash] = useState<string>();

  return (
    <View>
      {phoneCodeHash ? (
        <ConfrimationForm
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
    </View>
  );
};
