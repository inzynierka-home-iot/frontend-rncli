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

  const handleMessage = (message: any) => {
    console.log('Received update:', message);
    setReceivedMessage(message);
    updateEmitter.off('newMessage', handleMessage);
  };

  const setListener = () => {
    updateEmitter.on('newMessage', handleMessage);
  };

  const onSubmit = async ({ telegramMessage }: any) => {
    setListener();
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
      <Text style={styles.message}>Message:</Text>
      <Text style={styles.message}>{receivedMessage}</Text>
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
  message: {
    height: 40,
    margin: 5,
    padding: 5,
    color: '#000000',
  },
});
