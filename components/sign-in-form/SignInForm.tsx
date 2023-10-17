import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ConfirmationForm } from './ConfirmationForm';
import { PhoneNumberForm } from './PhoneNumberForm';
import { RootNavigationProps } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { ReadStoredValue } from '../../utils/EncryptedStorage';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export type SignInData = {
  diallingCode: string;
  phoneNumber: string;
  phoneCode: string;
};

export const SignInForm = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const [phoneCodeHash, setPhoneCodeHash] = useState<string>();

  const { control, handleSubmit } = useForm<SignInData>({
    defaultValues: {
      diallingCode: '',
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
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
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
