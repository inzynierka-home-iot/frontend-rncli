import { FC, useCallback, useState } from 'react';
import React from 'react-native';
import {
  Button,
  Input,
  Typography,
  useInputValue,
} from '../../../.storybook/stories';
import { useAppSelector } from '../../../redux/hooks';
import { sendIoTMessage } from '../../../utils';

type Props = {
  botFatherAccessHash: string;
  botFatherId: string;
};

export const BotNameInput: FC<Props> = ({
  botFatherAccessHash,
  botFatherId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [botUsername, onBotUsernameChange] = useInputValue();

  const { isWaitingForUsername, isUsernameInvalidError, isUsernameTakenError } =
    useAppSelector(state => state.admin);

  const onConfirmBotUsername = useCallback(async () => {
    setIsSubmitting(true);
    await sendIoTMessage(botUsername, botFatherAccessHash, botFatherId);
    setIsSubmitting(false);
  }, [botUsername, botFatherAccessHash, botFatherId]);

  return (
    <>
      <Typography
        variant="body-medium"
        text="Podaj username dla bota, którego będziesz uzywał na Raspberry PI. Jego nazwa musi kończyć się na bot, np. HomeBot lub home_bot"
        color="text-secondary"
      />
      <Input
        text={botUsername}
        onChange={onBotUsernameChange}
        placeholder="Podaj nazwę lokalizacji..."
        variant={
          isUsernameInvalidError || isUsernameTakenError ? 'error' : 'default'
        }
        disabled={!isWaitingForUsername || isSubmitting}
      />
      {isUsernameTakenError && (
        <Typography
          variant="body-medium"
          text="Nazwa jest juz zajęta. Spróbouj ponownie"
          color="text-error"
        />
      )}
      {isUsernameInvalidError && (
        <Typography
          variant="body-medium"
          text="Nazwa jest nieprawidłowa. Spróbouj ponownie"
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
