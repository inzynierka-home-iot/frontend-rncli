import React from 'react-native';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { Button, TextInput } from 'react-native';
import { SignInData } from './SignInForm';
import { sendVerificationCode } from '../../utils';
import {
  CountryDiallingCode,
  getCountriesCodes,
} from '../../utils/getCountriesCodes';
import SelectDropdown from 'react-native-select-dropdown';

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
  const [countryDiallingCodes, setCountryDiallingCodes] = useState<
    CountryDiallingCode[]
  >([]);

  const onLogin = async ({ diallingCode, phoneNumber }: SignInData) => {
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
    <>
      <Controller
        control={control}
        name="diallingCode"
        render={({ field: { onChange } }) => (
          <SelectDropdown
            data={countryDiallingCodes.map(e => e.name)}
            onSelect={(selectedItem, index) => {
              onChange(countryDiallingCodes[index].diallingCode);
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="diallingCode"
        render={({ field: { onChange, value } }) => (
          <TextInput placeholder="Code" onChangeText={onChange} value={value} />
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Telegram phone number"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Button
        disabled={isButtonDisabled}
        title="log in"
        onPress={handleSubmit(onLogin)}
      />
    </>
  );
};
