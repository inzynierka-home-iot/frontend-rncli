import React, { View } from 'react-native';
import { useState } from 'react';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { styles } from './PhoneNumberForm.styles';
import type { SignInData } from '../../types';
import { useCountryDiallingCodes, useSendVerificationCode } from '../../hooks';
import { Input, Select, Typography, Button } from '../../.storybook/stories';

type PhoneNumberFormProps = {
  control: Control<SignInData>;
  handleSubmit: UseFormHandleSubmit<SignInData>;
};

export const PhoneNumberForm = ({
  control,
  handleSubmit,
}: PhoneNumberFormProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const countryDiallingCodes = useCountryDiallingCodes();

  const { isLoginButtonDisabled, phoneVariant, onLogin } =
    useSendVerificationCode();

  return (
    <View style={styles.container}>
      <Typography
        variant="body-small"
        text="Uzupełnij dane, za pomocą których logujesz się do serwisu Telegram"
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
              onSelect={(index: number) => {
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
                  onChange={onChange}
                  keyboardType="numeric"
                  placeholder="Kod"
                  centerText
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
          text="Zaloguj się"
          disabled={isLoginButtonDisabled}
          onPress={handleSubmit(onLogin)}
          hasFullWidth
        />
      </View>
    </View>
  );
};
