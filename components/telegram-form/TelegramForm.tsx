import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { sendIOTMessage, updateEmitter } from '../../utils/mtprotoClient';

type TelegramFormData = {
  telegramMessage: string;
};

export const TelegramForm = () => {
  const [receivedMessage, setReceivedMessage] = useState('');
  const { control, handleSubmit } = useForm<TelegramFormData>({
    defaultValues: {
      telegramMessage: '',
    },
  });

  updateEmitter.on('newMessage', (message: any) => {
    console.log('Received update:', message);
    setReceivedMessage(message);
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
      <Text>{receivedMessage}</Text>
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
