import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Navbar } from '../../.storybook/stories';
import {
  ConfirmationForm,
  LayoutProvider,
  Password2FAForm,
} from '../../components';
import { RootStackParamList, SignInData } from '../../types';

type ConfirmAuthViewProps = NativeStackScreenProps<
  RootStackParamList,
  'ConfirmAuth'
>;

export const ConfirmAuthView = ({ route }: ConfirmAuthViewProps) => {
  const [is2FANeeded, setis2FANeeded] = useState(false);

  const { phoneCodeHash, phoneNumber, diallingCode } = route.params;

  const { control, handleSubmit } = useForm<SignInData>({
    defaultValues: {
      diallingCode,
      phoneNumber,
      phoneCode: '',
      password: '',
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LayoutProvider navbar={<Navbar text="Potwierdź logowanie" />}>
        {is2FANeeded ? (
          <Password2FAForm control={control} handleSubmit={handleSubmit} />
        ) : (
          <ConfirmationForm
            control={control}
            handleSubmit={handleSubmit}
            setIs2FANeeded={setis2FANeeded}
            phoneCodeHash={phoneCodeHash}
          />
        )}
      </LayoutProvider>
    </TouchableWithoutFeedback>
  );
};
