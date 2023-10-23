import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { View } from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootStackParamList } from '../../types';
import { sendAPIRequest } from '../../utils';
import { styles } from './LightView.styles';

type LightViewProps = NativeStackScreenProps<RootStackParamList, 'Light'>;

export const LightView = ({ route }: LightViewProps) => {
  const { deviceId, nodeId, botHash, botId, location } = route.params;

  const light = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  );

  const lightActionBaseParams = {
    location,
    nodeId,
    deviceId,
    action: 'set',
    botHash,
    botId,
  };

  const handleLightOn = () =>
    sendAPIRequest({
      ...lightActionBaseParams,
      additionalParams: 'V_STATUS=1',
    });

  const handleLightOff = () =>
    sendAPIRequest({
      ...lightActionBaseParams,
      additionalParams: 'V_STATUS=0',
    });

  const handleAllLightsOn = () =>
    sendAPIRequest({
      ...lightActionBaseParams,
      deviceId: '*',
      additionalParams: 'V_STATUS=1',
    });

  const handleAllLightsOff = () =>
    sendAPIRequest({
      ...lightActionBaseParams,
      deviceId: '*',
      additionalParams: 'V_STATUS=0',
    });

  return (
    <View style={styles.container}>
      <Navbar text={`${location} - ${nodeId} - ${light?.name}`} />
      <View style={styles.content}>
        {/* TODO add lamp state when we get backend for lights and use only one button to turn light on / off */}
        <Typography variant="body-medium" text="Aktualny status lampy to: " />
        <Typography variant="body-medium" text="Włączona" />
        <Button text="Włącz" hasFullWidth onPress={handleLightOn} />
        <Button text="Wyłącz" hasFullWidth onPress={handleLightOff} />
        <Button
          text="Włącz wszystkie w danym nodzie"
          variant="success"
          hasFullWidth
          onPress={handleAllLightsOn}
        />
        <Button
          text="Wyłącz wszystkie w danym nodzie"
          variant="error"
          hasFullWidth
          onPress={handleAllLightsOff}
        />
      </View>
    </View>
  );
};
