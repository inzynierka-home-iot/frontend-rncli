import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Navbar } from '../../.storybook/stories';
import { theme } from '../../.storybook/theme';
import { PhoneNumberForm } from '../../components';
import { useNavigateAuthUsers } from '../../hooks';
import { SignInData } from '../../types';

export const LoginView = () => {
  const { control, handleSubmit } = useForm<SignInData>({
    defaultValues: {
      diallingCode: '',
      phoneNumber: '',
      phoneCode: '',
      password: '',
    },
  });

  useNavigateAuthUsers();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Navbar text="Zaloguj się" backButton={false} />
        <PhoneNumberForm control={control} handleSubmit={handleSubmit} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing(5),
  },
});
