import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Navbar } from '../../.storybook/stories';
import { theme } from '../../.storybook/theme';
import { ConfirmationForm, Password2FAForm } from '../../components';
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
      <View style={styles.container}>
        <Navbar text="Zaloguj się" />
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
