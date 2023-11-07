import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import React, { ScrollView, View } from 'react-native';
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

  const [temp, onTempChange] = useInputValue(fan.values.V_TEMP);
  const [direction, onDirectionChange] = useInputValue(fan.values.V_DIRECTION);
  const [percentage, onPercentageChange] = useInputValue(
    fan.values.V_PERCENTAGE,
  );

  const handleChangeFanParams = () => {
    sendAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: `V_TEMP=${temp}`,
    });
    sendAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: `V_DIRECTION=${direction}`,
    });
    sendAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: `V_PERCENTAGE=${percentage}`,
    });
  };

  const handleGetFanParams = () => {
    sendAPIRequest({
      ...route.params,
      action: 'status',
      additionalParams: 'V_TEMP',
    });
    sendAPIRequest({
      ...route.params,
      action: 'status',
      additionalParams: 'V_DIRECTION',
    });
    sendAPIRequest({
      ...route.params,
      action: 'status',
      additionalParams: 'V_PERCENTAGE',
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
      <ScrollView>
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
            text={`Aktualny kierunek głowicy wentylacji: ${fan.values.V_PERCENTAGE}`}
          />
          <Input text={percentage} onChange={onPercentageChange} />
          <Button
            text="Zmień parametry wentylatora"
            onPress={handleChangeFanParams}
          />
          <Button
            text="Pobierz najnowsze wartości"
            onPress={handleGetFanParams}
          />
        </View>
      </ScrollView>
    </View>
  );
};
