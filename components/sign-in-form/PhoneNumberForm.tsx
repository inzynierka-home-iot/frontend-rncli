import React, { Keyboard, StyleSheet, View } from 'react-native';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
// import { Button } from 'react-native';
import { SignInData } from './SignInForm';
import { sendVerificationCode } from '../../utils';
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [countryDiallingCodes, setCountryDiallingCodes] = useState<
    CountryDiallingCode[]
  >([{ display: 'Poland', value: '48' }]);

  const onLogin = async ({ diallingCode, phoneNumber }: SignInData) => {
    Keyboard.dismiss();
    setIsButtonDisabled(true);
    const res = await sendVerificationCode('+' + diallingCode + phoneNumber);
    setIsButtonDisabled(false);
    if (res) {
      setPhoneCodeHash(res.phone_code_hash);
    }
  };

  useEffect(() => {
    (async () => {
      setCountryDiallingCodes(await getCountriesCodes());
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Typography
        variant={'body-small'}
        text={'Podaj numer telefonu'}
        color="text-secondary"
      />
      <View style={styles.selectData}>
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
