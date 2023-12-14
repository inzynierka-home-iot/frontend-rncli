import { FC, useCallback, useEffect, useState } from 'react';
import React from 'react-native';
import {
  Button,
  Input,
  Typography,
  useInputValue,
} from '../../../.storybook/stories';
import { useAppSelector } from '../../../redux/hooks';
import { BOT_NAME_LENGTH, BOT_SUFFIX } from '../../../utils/env';
import { BotFather } from '../../../types';
import { useSendTelegramMessage } from '../../../hooks';
import { generateBotName } from '../utils';

type BotNameInputProps = BotFather & { locationName: string };

export const BotNameInput: FC<BotNameInputProps> = ({
  locationName,
  botFatherAccessHash,
  botFatherId,
}) => {
  const sendTelegramMessage = useSendTelegramMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [botUsername, onBotUsernameChange] = useInputValue();

  const { isWaitingForUsername, isUsernameInvalidError, isUsernameTakenError } =
    useAppSelector(state => state.admin);

  useEffect(() => {
    if (isWaitingForUsername) {
      onBotUsernameChange(generateBotName(locationName));
    }
  }, [isWaitingForUsername]);

  const onConfirmBotUsername = useCallback(async () => {
    setIsSubmitting(true);
    const botFullName = botUsername + BOT_SUFFIX;
    await sendTelegramMessage(botFullName, botFatherAccessHash, botFatherId);
    setIsSubmitting(false);
  }, [botUsername, botFatherAccessHash, botFatherId]);

  return (
    <>
      <Typography
        variant="body-small"
        text={`Podaj username dla bota, którego będziesz używał na Raspberry PI. Na końcu wpisanej nazwy zostanie dodana końcówka '${BOT_SUFFIX}'.`}
        color="text-secondary"
      />
      <Input
        text={botUsername}
        onChange={onBotUsernameChange}
        placeholder="Podaj nazwę bota..."
        variant={
          isUsernameInvalidError || isUsernameTakenError ? 'error' : 'default'
        }
        disabled={!isWaitingForUsername || isSubmitting}
        max={BOT_NAME_LENGTH - BOT_SUFFIX.length}
      />
      {isUsernameTakenError && (
        <Typography
          variant="body-medium"
          text="Nazwa jest już zajęta. Spróbuj ponownie."
          color="text-error"
        />
      )}
      {isUsernameInvalidError && (
        <Typography
          variant="body-medium"
          text="Nazwa jest nieprawidłowa. Spróbuj ponownie."
          color="text-error"
        />
      )}
      <Button
        size="medium"
        text="Potwierdź"
        onPress={onConfirmBotUsername}
        disabled={!isWaitingForUsername || isSubmitting}
      />
    </>
  );
};
