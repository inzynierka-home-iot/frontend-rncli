import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import React, { View } from 'react-native';
import {
  Button,
  Input,
  Navbar,
  Typography,
  useInputValue,
} from '../../.storybook/stories';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { Fan, RootStackParamList } from '../../types';
import { sendAPIRequest } from '../../utils';
import { styles } from './FanView.styles';

type FanViewProps = NativeStackScreenProps<RootStackParamList, 'Fan'>;

export const FanView: FC<FanViewProps> = ({ route }) => {
  const { deviceId, nodeId, location } = route.params;

  const fan = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as Fan;

  const [temp, onTempChange] = useInputValue(fan.values.V_TEMP.toString());
  const [direction, onDirectionChange] = useInputValue(
    fan.values.V_DIRECTION.toString(),
  );
  const [percantage, onPercentageChange] = useInputValue(
    fan.values.V_PERCANTAGE.toString(),
  );

  const handleChangeFanParams = () => {
    sendAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: `V_TEMP=${temp}&V_DIRECTION=${direction}&V_PERCENTAGE=${percantage}`,
    });
  };

  if (!fan) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <View style={styles.container}>
      <Navbar text={`${location} - ${nodeId} - ${fan?.name}`} />
      <View style={styles.content}>
        <Typography
          variant="body-medium"
          text={`Aktualny temperatura wentylacji: ${fan.values.V_TEMP}`}
        />
        <Input text={temp} onChange={onTempChange} />
        <Typography
          variant="body-medium"
          text={`Aktualny prędkość wentylacji: ${fan.values.V_DIRECTION}`}
        />
        <Input text={direction} onChange={onDirectionChange} />
        <Typography
          variant="body-medium"
          text={`Aktualny kierunek głowicy wentylacji: ${fan.values.V_PERCANTAGE}`}
        />
        <Input text={percantage} onChange={onPercentageChange} />
        <Button text="Zmień kolor" onPress={handleChangeFanParams} />
      </View>
    </View>
  );
};
