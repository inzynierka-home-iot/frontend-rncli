import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Input,
  Typography,
  useInputValue,
} from '../../.storybook/stories';
import { useAppSelector } from '../../redux/hooks';
import { resolveUserID, sendIoTMessage } from '../../utils';
import { styles } from './AdminViewStyles';
import { useListenForBotFather } from './hooks';

const BOT_FATHER_NAME = 'BotFather';

export const AdminView = () => {
  const [botFatherId, setBotFatherId] = useState<string>();
  const [locationName, onLocationNameChange] = useInputValue();
  const [botId, onBotIdChange] = useInputValue();

  const { isWaitingForName, isWaitingForId } = useAppSelector(
    state => state.admin,
  );

  const handleBotCreate = useCallback(async () => {
    const { access_hash, id } = await resolveUserID(BOT_FATHER_NAME);
    await sendIoTMessage('/newbot', access_hash, id);
    setBotFatherId(id);
  }, []);

  const handleBotName = useCallback(async () => {
    const { access_hash, id } = await resolveUserID(BOT_FATHER_NAME);
    await sendIoTMessage(locationName, access_hash, id);
    setBotFatherId(id);
  }, [locationName]);

  const handleBotId = useCallback(async () => {
    const { access_hash, id } = await resolveUserID(BOT_FATHER_NAME);
    await sendIoTMessage(botId, access_hash, id);
    setBotFatherId(id);
  }, [botId]);

  console.log(handleBotId);

  useListenForBotFather(botFatherId);

  return (
    <View style={styles.container}>
      <Button
        size="medium"
        text="Stwórz nowego bota"
        onPress={handleBotCreate}
      />
      {isWaitingForName && (
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
          />
          <Button size="medium" text="Potwierdź" onPress={handleBotName} />
        </>
      )}
      {isWaitingForId && (
        <>
          <Typography
            variant="body-medium"
            text="Podaj username dla bota, którego będziesz uzywał na Raspberry PI. Jego nazwa musi kończyć się na bot, np. HomeBot lub home_bot"
            color="text-secondary"
          />
          <Input
            text={botId}
            onChange={onBotIdChange}
            placeholder="Podaj nazwę lokalizacji..."
          />
          <Button size="medium" text="Potwierdź" onPress={handleBotId} />
        </>
      )}
    </View>
  );
};
