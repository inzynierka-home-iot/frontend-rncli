import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { sendIOTMessage } from '../../utils/mtprotoClient';

type TelegramFormData = {
  telegramMessage: string;
};

export const TelegramForm = () => {
  const { control, handleSubmit } = useForm<TelegramFormData>({
    defaultValues: {
      telegramMessage: '',
    },
  });

  const onSubmit = async ({ telegramMessage }: any) => {
    sendIOTMessage(telegramMessage);
  };

  return (
    <View>
      <Controller
        control={control}
        name="telegramMessage"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="telegram message"
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      <Button title="submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
