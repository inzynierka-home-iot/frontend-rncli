import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ConfrimationForm } from './ConfirmationForm';
import { PhoneNumberForm } from './PhoneNumberForm';

export type SignInData = {
  phoneNumber: string;
  phoneCode: string;
};

export const SignInForm = () => {
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
