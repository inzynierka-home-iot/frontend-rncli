import { FC, useCallback, useEffect, useState } from 'react';
import React from 'react-native';
import {
  Button,
  CheckBox,
  Input,
  Typography,
  useCheckBoxValue,
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
  const [isNameGenerated, onIsNameGenerated] = useCheckBoxValue(true);

  const { isWaitingForUsername, isUsernameInvalidError, isUsernameTakenError } =
    useAppSelector(state => state.admin);

  useEffect(() => {
    if (isNameGenerated && isWaitingForUsername) {
      onBotUsernameChange(generateBotName(locationName));
    } else {
      onBotUsernameChange('');
    }
  }, [isNameGenerated, isWaitingForUsername]);

  const onConfirmBotUsername = useCallback(async () => {
    setIsSubmitting(true);
    const botFullName = botUsername + BOT_SUFFIX;
    await sendTelegramMessage(botFullName, botFatherAccessHash, botFatherId);
    setIsSubmitting(false);
  }, [botUsername, botFatherAccessHash, botFatherId, sendTelegramMessage]);

  return (
    <>
      <Typography
        variant="body-small"
        text={`Podaj username dla bota, którego będziesz używał na Raspberry PI. Na końcu wpisanej nazwy zostanie dodana końcówka '${BOT_SUFFIX}'.`}
        color={isWaitingForUsername ? 'text-primary' : 'text-secondary'}
      />
      <CheckBox
        checked={isNameGenerated}
        onPress={onIsNameGenerated}
        label="Użyj wygenerowanej nazwy"
        disabled={!isWaitingForUsername || isSubmitting}
      />
      <Input
        text={botUsername}
        onChange={onBotUsernameChange}
        placeholder="Podaj nazwę bota..."
        variant={
          isUsernameInvalidError || isUsernameTakenError ? 'error' : 'default'
        }
        disabled={!isWaitingForUsername || isSubmitting || isNameGenerated}
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
