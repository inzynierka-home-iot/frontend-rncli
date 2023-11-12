import React, { Dispatch, SetStateAction } from 'react';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { styles } from './ConfirmationForm.styles';
import { SignInData } from '../../types';
import { Button, Input, Typography } from '../../.storybook/stories';
import { useConfirmCodeClick } from './hooks/useConfirmCodeClick';
import { View } from 'react-native';

type ConfirmationFormProps = {
  control: Control<SignInData>;
  handleSubmit: UseFormHandleSubmit<SignInData>;
  setIs2FANeeded: Dispatch<SetStateAction<boolean>>;
  phoneCodeHash: string;
};

export const ConfirmationForm = ({
  control,
  handleSubmit,
  setIs2FANeeded,
  phoneCodeHash,
}: ConfirmationFormProps) => {
  const { isConfirmButtonDisabled, codeVariant, onConfirm } =
    useConfirmCodeClick(phoneCodeHash, setIs2FANeeded);

  return (
    <>
      <Typography
        variant="body-small"
        text="Na Twoje konto w serwisie telegram został wysłany kod potwierdzający, podaj go aby kontynuować"
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
          onPress={handleSubmit(onConfirm)}
          disabled={isConfirmButtonDisabled}
          text="Kontynuuj"
          hasFullWidth
        />
      </View>
    </>
  );
};
