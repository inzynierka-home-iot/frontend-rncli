import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  listenForMessages,
  logoutFromTelegram,
  sendIoTMessage,
} from '../../utils';
import { ReadStoredValue } from '../../utils/EncryptedStorage';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../App';
import { LogoutButton } from '../navigation';

type TelegramFormData = {
  telegramMessage: string;
};

export const TelegramForm = () => {
  const [receivedMessage, setReceivedMessage] = useState('');
  const [botUserID, setBotUserID] = useState('');
  const [botAccessHash, setBotAccessHash] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigation = useNavigation<RootNavigationProps>();
  const { control, handleSubmit } = useForm<TelegramFormData>({
    defaultValues: {
      telegramMessage: '',
    },
  });

  const onSubmit = async ({ telegramMessage }: any) => {
    setIsButtonDisabled(true);
    await sendIoTMessage(telegramMessage, botAccessHash, botUserID);
    setIsButtonDisabled(false);
  };

  useEffect(() => {
    (async () => {
      const hash = await ReadStoredValue('bot_conversation_access_hash');
      if (hash) {
        setBotAccessHash(hash);
      }
      const id = await ReadStoredValue('bot_user_id');
      if (id) {
        setBotUserID(id);
      }
    })();
  }, []);

  useEffect(() => {
    listenForMessages(setReceivedMessage, botUserID);
  }, [botUserID]);

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
      <LogoutButton />
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
