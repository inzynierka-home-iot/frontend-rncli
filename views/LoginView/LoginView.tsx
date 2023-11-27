import React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Navbar } from '../../.storybook/stories';
import { LayoutProvider, PhoneNumberForm } from '../../components';
import { useNavigateAuthUsers } from '../../hooks';
import { SignInData } from '../../types';
import { LoadingWrapper } from '../../components/LoadingWrapper';

export const LoginView = () => {
  const { control, handleSubmit } = useForm<SignInData>({
    defaultValues: {
      diallingCode: '',
      phoneNumber: '',
      phoneCode: '',
      password: '',
    },
  });

  const isLoading = useNavigateAuthUsers();

  return (
    <LoadingWrapper isLoading={isLoading} text="Ładowanie danych">
      <LayoutProvider navbar={<Navbar text="Zaloguj się" backButton={false} />}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <PhoneNumberForm control={control} handleSubmit={handleSubmit} />
        </TouchableWithoutFeedback>
      </LayoutProvider>
    </LoadingWrapper>
  );
};
