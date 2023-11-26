import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useMemo } from 'react';
import React, { View } from 'react-native';
import {
  Button,
  Input,
  Navbar,
  Typography,
  useInputValue,
} from '../../.storybook/stories';
import { LayoutProvider } from '../../components';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { useSendAPIRequest } from '../../hooks';
import { Fan, FanRangeValues, RootStackParamList } from '../../types';
import { getNumericValue } from '../../utils';
import { TurnOnFanSelect } from './components';
import { styles } from './FanView.styles';

type FanViewProps = NativeStackScreenProps<RootStackParamList, 'Fan'>;

export const FanView: FC<FanViewProps> = ({ route }) => {
  const { deviceId, nodeId, location } = route.params;

  const sendIoTAPIRequest = useSendAPIRequest();

  const fan = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as Fan;

  const fanTurnedOff = useMemo(
    () =>
      fan.values.V_TEMP === '0' &&
      fan.values.V_PERCENTAGE === '0' &&
      fan.values.V_DIRECTION === '0',
    [fan.values.V_TEMP, fan.values.V_PERCENTAGE, fan.values.V_DIRECTION],
  );

  const [temp, onTempChange] = useInputValue(fan.values.V_TEMP);
  const [percentage, onPercentageChange] = useInputValue(
    fan.values.V_PERCENTAGE,
  );
  const [direction, onDirectionChange] = useInputValue(fan.values.V_DIRECTION);

  const handleChangeFanParams = () => {
    const finalTempValue = getNumericValue(parseFloat, temp);
    const finalPercentageValue = getNumericValue(parseFloat, percentage);
    const finalDirectionValue = getNumericValue(parseFloat, direction);

    sendIoTAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: `V_TEMP=${finalTempValue}&V_PERCENTAGE=${finalPercentageValue}&V_DIRECTION=${finalDirectionValue}`,
    });
  };

  const handleFanStateToggle = useCallback(() => {
    const tempValue = fanTurnedOff ? FanRangeValues.DEFAULT_TEMP : 0;
    const percentageValue = fanTurnedOff
      ? FanRangeValues.DEFAULT_PERCENTAGE
      : 0;
    const directionValue = fanTurnedOff ? FanRangeValues.DEFAULT_DIRECTION : 0;

    sendIoTAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: `V_TEMP=${tempValue}&V_PERCENTAGE=${percentageValue}&V_DIRECTION=${directionValue}`,
    });
  }, [fanTurnedOff, route.params, sendIoTAPIRequest]);

  const handleGetFanParams = () => {
    sendIoTAPIRequest({
      ...route.params,
      action: 'status',
    });
  };

  if (!fan) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <LayoutProvider
      navbar={<Navbar text={`${location} - ${nodeId} - ${fan?.name}`} />}>
      <Button text="Pobierz najnowsze wartości" onPress={handleGetFanParams} />
      <View style={styles.section}>
        <Typography
          variant="body-medium"
          text={`Aktualna temperatura wentylacji: ${fan.values.V_TEMP}°C`}
        />
        <Typography
          variant="body-small"
          text={`Zakres: ${FanRangeValues.MIN_TEMP} - ${FanRangeValues.MAX_TEMP}`}
        />
        <Input
          text={temp}
          onChange={onTempChange}
          keyboardType="numeric"
          max={FanRangeValues.MAX_TEMP}
        />
      </View>
      <View style={styles.section}>
        <Typography
          variant="body-medium"
          text={`Aktualna prędkość wentylacji: ${fan.values.V_PERCENTAGE}%`}
        />
        <Typography
          variant="body-small"
          text={`Zakres: ${FanRangeValues.MIN_PERCENTAGE} - ${FanRangeValues.MAX_PERCENTAGE}`}
        />
        <Input
          text={percentage}
          onChange={onPercentageChange}
          keyboardType="numeric"
          max={FanRangeValues.MAX_PERCENTAGE}
        />
      </View>
      <View style={styles.section}>
        <Typography
          variant="body-medium"
          text={`Aktualny kierunek głowicy: ${fan.values.V_DIRECTION}°`}
        />
        <Typography
          variant="body-small"
          text={`Zakres: ${FanRangeValues.MIN_DIRECTION} - ${FanRangeValues.MAX_DIRECTION}`}
        />
        <Input
          text={direction}
          onChange={onDirectionChange}
          keyboardType="numeric"
          max={FanRangeValues.MAX_DIRECTION}
        />
      </View>
      <Button
        text="Zmień parametry wentylatora"
        onPress={handleChangeFanParams}
      />
      <TurnOnFanSelect
        fanBaseParams={route.params}
        fanSchedule={fan.schedule}
      />
      <Button
        text={fanTurnedOff ? 'Włącz wentylator' : 'Wyłącz wentylator'}
        variant={fanTurnedOff ? 'success' : 'error'}
        onPress={handleFanStateToggle}
      />
      <Button text="Pobierz najnowsze wartości" onPress={handleGetFanParams} />
    </LayoutProvider>
  );
};
