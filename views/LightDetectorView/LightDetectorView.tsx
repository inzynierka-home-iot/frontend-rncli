import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import React, { ScrollView, View } from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { LightDetector, RootStackParamList } from '../../types';
import { sendAPIRequest } from '../../utils';
import { styles } from './LightDetectorView.styles';

type LightDetectorViewProps = NativeStackScreenProps<
  RootStackParamList,
  'LightDetector'
>;

export const LightDetectorView: FC<LightDetectorViewProps> = ({ route }) => {
  const { deviceId, nodeId, location } = route.params;

  const lightDetector = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as LightDetector;

  const handleGetLightLevel = () => {
    sendAPIRequest({
      ...route.params,
      action: 'status',
      additionalParams: 'V_LIGHT_LEVEL',
    });
  };

  if (!lightDetector) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <View style={styles.container}>
      <Navbar text={`${location} - ${nodeId} - ${lightDetector?.name}`} />
      <ScrollView>
        <View style={styles.content}>
          <Typography
            variant="body-medium"
            text={`Aktualny stan natęzenia światła: ${lightDetector.values.V_LIGHT_LEVEL}`}
          />
          <Button text="Pobierz aktualny stan" onPress={handleGetLightLevel} />
        </View>
      </ScrollView>
    </View>
  );
};
