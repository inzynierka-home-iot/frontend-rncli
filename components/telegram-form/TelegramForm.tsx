import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppDispatch } from '../../redux/hooks';
import { listenForMessages, sendIoTMessage } from '../../utils';
import { ReadStoredValue } from '../../utils';
import { Navbar } from '../../.storybook/stories/Navbar/Navbar';
import { LogoutButton } from '../navigation';
import { useAppNavigation } from '../../hooks';
import { ButtonProps } from '../../.storybook/stories';

type TelegramFormData = {
  telegramMessage: string;
};

export const TelegramForm = () => {
  const navigation = useAppNavigation();
  const [receivedMessage, setReceivedMessage] = useState('');
  const [botUserID, setBotUserID] = useState('');
  const [botAccessHash, setBotAccessHash] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<TelegramFormData>({
    defaultValues: {
      telegramMessage: '',
    },
  });

  const onSubmit = async ({ telegramMessage }: any) => {
    setIsButtonDisabled(true);
    await sendIoTMessage(telegramMessage, botAccessHash, botUserID, dispatch);
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
    listenForMessages(botUserID, dispatch);
  }, [botUserID, dispatch]);

  const logoutButtonProps: ButtonProps = {
    text: 'Wyloguj',
    variant: 'error',
    size: 'small',
    onPress: () => {
      navigation.navigate('DeviceList');
    },
  };

  return (
    <View>
      <Navbar text="Test" button={logoutButtonProps} />
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
