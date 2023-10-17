import React, { Keyboard, StyleSheet, View } from 'react-native';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { SignInData } from './SignInForm';
import { sendVerificationCode } from '../../utils';
import { Navbar } from '../../.storybook/stories/Navbar/Navbar';
import { Typography } from '../../.storybook/stories/Typography/Typography';
import { Select } from '../../.storybook/stories/Select/Select';
import { Input } from '../../.storybook/stories/Input/Input';
import { Button } from '../../.storybook/stories/Button/Button';
import { theme } from '../../.storybook/theme';
import {
  CountryDiallingCode,
  getCountriesCodes,
} from '../../utils/getCountriesCodes';

type PhoneNumberFormProps = {
  control: Control<SignInData>;
  handleSubmit: UseFormHandleSubmit<SignInData>;
  setPhoneCodeHash: Dispatch<SetStateAction<string | undefined>>;
};

export const PhoneNumberForm = ({
  control,
  handleSubmit,
  setPhoneCodeHash,
}: PhoneNumberFormProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [phoneVariant, setPhoneVariant] = useState<'default' | 'error'>(
    'default',
  );
  const [countryDiallingCodes, setCountryDiallingCodes] = useState<
    CountryDiallingCode[]
  >([{ display: 'Poland', value: '48' }]);

  const onLogin = async ({ diallingCode, phoneNumber }: SignInData) => {
    setPhoneVariant('default');
    setIsButtonDisabled(true);
    const res = await sendVerificationCode('+' + diallingCode + phoneNumber);
    setIsButtonDisabled(false);
    if (res) {
      setPhoneCodeHash(res.phone_code_hash);
    } else {
      setPhoneVariant('error');
    }
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      setCountryDiallingCodes(await getCountriesCodes());
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar
        text={'Zaloguj się'}
        buttons={[
          {
            text: 'Wyloguj',
            variant: 'error',
            size: 'small',
            onPress: () => {},
          },
        ]}
      />
      <View style={styles.content}>
        <Typography
          variant={'body-small'}
          text={
            'Uzupełnij dane, za pomocą których logujesz się do serwisu Telegram'
          }
          color="text-secondary"
        />
        <View style={styles.provideData}>
          <Controller
            control={control}
            name="diallingCode"
            render={({ field: { onChange } }) => (
              <Select
                selectData={countryDiallingCodes}
                index={selectedIndex}
                defaultText="Wybierz kraj"
                onSelect={(index: number): void => {
                  setSelectedIndex(index);
                  onChange(countryDiallingCodes[index].value);
                }}
              />
            )}
          />
          <View style={styles.inputs}>
            <View style={styles.diallingCode}>
              <Controller
                control={control}
                name="diallingCode"
                render={({ field: { onChange, value } }) => (
                  <Input
                    text={value}
                    keyboardType="numeric"
                    placeholder="Kod"
                    centerText={true}
                    onChange={onChange}
                  />
                )}
              />
            </View>
            <View style={styles.phoneNumber}>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <Input
                    text={value}
                    variant={phoneVariant}
                    keyboardType="numeric"
                    placeholder="Numer telefonu"
                    onChange={onChange}
                  />
                )}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text={'Zaloguj się'}
            disabled={isButtonDisabled}
            hasFullWidth={true}
            onPress={handleSubmit(onLogin)}
          />
        </View>
      </View>
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
  diallingCode: {
    flex: 1,
  },
  phoneNumber: {
    flex: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
