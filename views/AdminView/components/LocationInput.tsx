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

export const LocationInput: FC<Props> = ({
  botFatherAccessHash,
  botFatherId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isWaitingForName } = useAppSelector(state => state.admin);

  const [locationName, onLocationNameChange] = useInputValue();

  const onConfirmLocalisation = useCallback(async () => {
    setIsSubmitting(true);
    await sendIoTMessage(locationName, botFatherAccessHash, botFatherId);
    setIsSubmitting(false);
  }, [botFatherAccessHash, botFatherId, locationName]);

  return (
    <>
      <Typography
        variant="body-medium"
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
