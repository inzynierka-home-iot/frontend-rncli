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
        text="Przekaż ten token do parametru 'telegram_bot_token' w skrypcie uruchamianym na Twoim brokerze, aby używac aplikacji :)"
      />
    </>
  );
};
