import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { View } from 'react-native';
import { Button, Typography } from '../../.storybook/stories';
import { RootStackParamList } from '../../types';
import { sendIoTMessage } from '../../utils';
import { styles } from './LightView.styles';

type LightViewProps = NativeStackScreenProps<RootStackParamList, 'Light'>;

export const LightView = ({ route }: LightViewProps) => {
  const { lightId, node, botHash, botId, location } = route.params;
  console.log(lightId, botHash, botId, location);

  const handleLightOn = () => {
    sendIoTMessage(
      `/${location}/${node}/${lightId}/set/?V_STATUS=1`,
      botHash,
      botId,
    );
  };

  const handleLightOff = () => {
    sendIoTMessage(
      `/${location}/${node}/${lightId}/set/?V_STATUS=0`,
      botHash,
      botId,
    );
  };

  const handleAllLightsOn = () => {
    sendIoTMessage(`/${location}/*/*/set/?V_STATUS=1`, botHash, botId);
  };

  const handleAllLightsOff = () => {
    sendIoTMessage(`/${location}/*/*/set/?V_STATUS=0`, botHash, botId);
  };

  return (
    <View style={styles.container}>
      <Typography
        variant="body-medium"
        text="Aktualny status lampy to: WŁĄCZONA"
      />
      <Button text="Włącz" hasFullWidth onPress={handleLightOn} />
      <Button text="Wyłącz" hasFullWidth onPress={handleLightOff} />
      <Button text="Włącz wszystkie" hasFullWidth onPress={handleAllLightsOn} />
      <Button
        text="Wyłącz wszystkie"
        hasFullWidth
        onPress={handleAllLightsOff}
      />
    </View>
  );
};
