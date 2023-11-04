import React from 'react';
import { Typography } from '../../../.storybook/stories';
import { useAppSelector } from '../../../redux/hooks';

export const BotTokenLabel = () => {
  const { newBotToken } = useAppSelector(state => state.admin);

  if (!newBotToken) {
    return null;
  }

  return (
    <>
      <Typography
        variant="body-medium"
        text="Udało się, Twój bot został pomyślnie utworzony! Jego token to: "
      />
      <Typography
        variant="body-medium"
        text={newBotToken}
        color="text-success"
        selectable
      />
      <Typography
        variant="body-medium"
        text="Uzyj tego tokenu w pliku .env na Twoim brokerze oraz uruchom serwer, aby uzywac aplikacji :)"
      />
    </>
  );
};
