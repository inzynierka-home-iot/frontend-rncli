import { FC, useCallback, useState } from 'react';
import React from 'react-native';
import { Button, Input, Typography } from '../../../.storybook/stories';
import { useAppSelector } from '../../../redux/hooks';
import { BotFather } from '../../../types';
import { useSendTelegramMessage } from '../../../hooks';
import {
  BOT_NAME_LENGTH,
  BOT_NAME_RANDOM_NUMBERS,
  BOT_SUFFIX,
} from '../../../utils/env';

type LocationInputProps = BotFather & {
  locationName: string;
  onLocationNameChange: (value: string) => void;
};

export const LocationInput: FC<LocationInputProps> = ({
  locationName,
  onLocationNameChange,
  botFatherAccessHash,
  botFatherId,
}) => {
  const sendTelegramMessage = useSendTelegramMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        max={
          BOT_NAME_LENGTH - (BOT_NAME_RANDOM_NUMBERS + 1) - BOT_SUFFIX.length
        }
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
