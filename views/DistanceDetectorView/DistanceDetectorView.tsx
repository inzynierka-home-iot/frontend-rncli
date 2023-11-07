import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import React, { ScrollView, View } from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { DistanceDetector, RootStackParamList } from '../../types';
import { sendAPIRequest } from '../../utils';
import { styles } from './DistanceDetectorView.styles';

type DistanceDetectorViewProps = NativeStackScreenProps<
  RootStackParamList,
  'DistanceDetector'
>;

export const DistanceDetectorView: FC<DistanceDetectorViewProps> = ({
  route,
}) => {
  const { deviceId, nodeId, location } = route.params;

  const distanceDetector = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as DistanceDetector;

  const handleGetDistance = () => {
    sendAPIRequest({
      ...route.params,
      action: 'status',
      additionalParams: 'V_DISTANCE',
    });
  };

  if (!distanceDetector) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <View style={styles.container}>
      <Navbar text={`${location} - ${nodeId} - ${distanceDetector?.name}`} />
      <ScrollView>
        <View style={styles.content}>
          <Typography
            variant="body-medium"
            text={`Aktualny dystans od czunika: ${distanceDetector.values.V_DISTANCE}cm`}
          />
          <Button text="Pobierz aktualny dystans" onPress={handleGetDistance} />
        </View>
      </ScrollView>
    </View>
  );
};
