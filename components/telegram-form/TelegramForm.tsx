import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { listenForMessages, sendIoTMessage } from '../../utils';

type TelegramFormData = {
  telegramMessage: string;
};

export const TelegramForm = () => {
  const [receivedMessage, setReceivedMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { control, handleSubmit } = useForm<TelegramFormData>({
    defaultValues: {
      telegramMessage: '',
    },
  });

  const onSubmit = async ({ telegramMessage }: any) => {
    setIsButtonDisabled(true);
    await sendIoTMessage(telegramMessage);
    setIsButtonDisabled(false);
  };

  useEffect(() => {
    listenForMessages(setReceivedMessage);
  }, []);

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
      <Button
        title="submit"
        disabled={isButtonDisabled}
        onPress={handleSubmit(onSubmit)}
      />
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
