import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { Keyboard, StyleSheet, View } from 'react-native';
import { RootNavigationProps } from '../../App';
import { SignInData } from './SignInForm';
import { logInCode } from '../../utils/logInCode';
import { resolveBotID } from '../../utils/resolveBotID';
import { ReadStoredValue, SaveStoredValue } from '../../utils/EncryptedStorage';
import { Password2FAForm } from './Password2FAFom';
import { Typography } from '../../.storybook/stories/Typography/Typography';
import { Input } from '../../.storybook/stories/Input/Input';
import { theme } from '../../.storybook/theme';
import { Button } from '../../.storybook/stories/Button/Button';
import { Navbar } from '../../.storybook/stories/Navbar/Navbar';

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
  const [codeVariant, setCodeVariant] = useState<'default' | 'error'>(
    'default',
  );
  const [is2FANeeded, setis2FANeeded] = useState(false);

  const onCode = async ({
    diallingCode,
    phoneNumber,
    phoneCode,
  }: SignInData) => {
    setCodeVariant('default');
    setIsButtonDisabled(true);
    const res = await logInCode(
      '+' + diallingCode + phoneNumber,
      phoneCodeHash,
      phoneCode,
    );
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
    } else {
      setCodeVariant('error');
    }
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Navbar
        text={'Zaloguj się'}
        buttons={[
          {
            text: 'Wyloguj',
            variant: 'error',
            size: 'small',
            onPress: () => { },
          },
        ]}
      />
      {is2FANeeded ? (
        <Password2FAForm control={control} handleSubmit={handleSubmit} />
      ) : (
        <View style={styles.content}>
          <Typography
            variant={'body-small'}
            text={
              'Na Twoje konto w serwisie telegram został wysłany kod potwierdzający, podaj go aby kontynuować'
            }
            color="text-secondary"
          />
          <View style={styles.provideData}>
            <View style={styles.inputs}>
              <Controller
                control={control}
                name="phoneCode"
                render={({ field: { onChange, value } }) => (
                  <Input
                    text={value}
                    variant={codeVariant}
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
              onPress={handleSubmit(onCode)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing(5),
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing(7),
    gap: theme.spacing(5),
  },
  provideData: {
    gap: theme.spacing(6),
  },
  inputs: {
    flexDirection: 'row',
    gap: theme.spacing(4),
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
