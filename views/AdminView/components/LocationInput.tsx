import { FC, useCallback, useState } from 'react';
import React from 'react-native';
import {
  Button,
  Input,
  Typography,
  useInputValue,
} from '../../../.storybook/stories';
import { useAppSelector } from '../../../redux/hooks';
import { BotFather } from '../../../types';
import { useSendIotMessage } from '../../../hooks';

export const LocationInput: FC<BotFather> = ({
  botFatherAccessHash,
  botFatherId,
}) => {
  const sendTelegramMessage = useSendIotMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationName, onLocationNameChange] = useInputValue();

  const { isWaitingForName } = useAppSelector(state => state.admin);

  const onConfirmLocalisation = useCallback(async () => {
    setIsSubmitting(true);
    await sendTelegramMessage(locationName, botFatherAccessHash, botFatherId);
    setIsSubmitting(false);
  }, [botFatherAccessHash, botFatherId, locationName]);

  return (
    <>
      <Typography
        variant="body-small"
        text="Jak będzie nazywała się Twoja lokalizacja"
        color="text-secondary"
      />
      <Input
        text={locationName}
        onChange={onLocationNameChange}
        placeholder="Podaj nazwę lokalizacji..."
        disabled={!isWaitingForName || isSubmitting}
      />
      <Button
        size="medium"
        text="Potwierdź"
        onPress={onConfirmLocalisation}
        disabled={!isWaitingForName || isSubmitting}
      />
    </>
  );
};
