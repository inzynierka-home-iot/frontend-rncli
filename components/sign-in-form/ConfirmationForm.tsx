import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { Keyboard, StyleSheet, View } from 'react-native';
import { RootNavigationProps } from '../../App';
import { SignInData } from './SignInForm';
import { logIn2FA } from '../../utils/logIn2FA';
import { resolveBotID } from '../../utils/resolveBotID';
import { ReadStoredValue } from '../../utils/EncryptedStorage';
import { Typography } from '../../.storybook/stories/Typography/Typography';
import { Input } from '../../.storybook/stories/Input/Input';
import { theme } from '../../.storybook/theme';
import { Button } from '../../.storybook/stories/Button/Button';

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

  const onConfirm = async ({ phoneNumber, phoneCode }: SignInData) => {
    Keyboard.dismiss();
    setIsButtonDisabled(true);
    const res = await logIn2FA(phoneNumber, phoneCodeHash, phoneCode);
    setIsButtonDisabled(false);
    if (res._ == 'auth.authorization') {
      const botAccessHash = await ReadStoredValue(
        'bot_conversation_access_hash',
      );
      const botUserID = await ReadStoredValue('bot_user_id');
      if (!botAccessHash || !botUserID) await resolveBotID();
      navigation.navigate('Telegram');
    }
  };

  return (
    <View style={styles.container}>
      <Typography
        variant={'body-small'}
        text={
          'Na Twoje konto w serwisie telegram został wysłany kod potwierdzający, podaj go aby kontynuować'
        }
        color="text-secondary"
      />
      <View style={styles.selectData}>
        <View style={styles.inputs}>
          <Controller
            control={control}
            name="phoneCode"
            render={({ field: { onChange, value } }) => (
              <Input
                text={value}
                keyboardType="numeric"
                placeholder="Kod potwierdzający"
                onChange={onChange}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text={'Kontynuuj'}
          disabled={isButtonDisabled}
          hasFullWidth={true}
          onPress={handleSubmit(onConfirm)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing(7),
    gap: theme.spacing(12),
  },
  selectData: {
    gap: theme.spacing(6),
  },
  inputs: {
    flexDirection: 'row',
    gap: theme.spacing(6),
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
