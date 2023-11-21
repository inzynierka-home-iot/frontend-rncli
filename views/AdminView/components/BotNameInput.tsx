import { FC, useCallback, useState } from 'react';
import React from 'react-native';
import {
  Button,
  Input,
  Typography,
  useInputValue,
} from '../../../.storybook/stories';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { sendIoTMessage } from '../../../utils';
import { BOT_NAME_LENGTH, BOT_SUFFIX } from '../../../utils/env';
import { BotFather } from '../../../types';

export const BotNameInput: FC<BotFather> = ({
  botFatherAccessHash,
  botFatherId,
}) => {
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [botUsername, onBotUsernameChange] = useInputValue();

  const { isWaitingForUsername, isUsernameInvalidError, isUsernameTakenError } =
    useAppSelector(state => state.admin);

  const onConfirmBotUsername = useCallback(async () => {
    setIsSubmitting(true);
    const botFullName = botUsername + BOT_SUFFIX;
    await sendIoTMessage(
      botFullName,
      botFatherAccessHash,
      botFatherId,
      dispatch,
    );
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
          text="Nazwa jest juz zajęta. Spróbuj ponownie."
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
