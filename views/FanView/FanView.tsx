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
import { LayoutProvider } from '../../components';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { Fan, FanRangeValues, RootStackParamList } from '../../types';
import { sendAPIRequest } from '../../utils';
import { styles } from './FanView.styles';

type FanViewProps = NativeStackScreenProps<RootStackParamList, 'Fan'>;

const fanRangeValues: FanRangeValues = {
  minTemp: 0,
  maxTemp: 50,
  minPercentage: 0,
  maxPercentage: 100,
  minDirection: 0,
  maxDirection: 255,
};

export const FanView: FC<FanViewProps> = ({ route }) => {
  const { deviceId, nodeId, location } = route.params;

  const fan = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as Fan;

  const [temp, onTempChange] = useInputValue(fan.values.V_TEMP);
  const [percentage, onPercentageChange] = useInputValue(
    fan.values.V_PERCENTAGE,
  );
  const [direction, onDirectionChange] = useInputValue(fan.values.V_DIRECTION);

  const handleChangeFanParams = () => {
    const finalTempValue = parseFloat(temp).toString();
    const finalDirectionValue = parseFloat(direction).toString();
    const finalPercentageValue = parseFloat(percentage).toString();
    sendAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: `V_TEMP=${finalTempValue}`,
    });
    sendAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: `V_PERCENTAGE=${finalPercentageValue}`,
    });
    sendAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: `V_DIRECTION=${finalDirectionValue}`,
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
      additionalParams: 'V_PERCENTAGE',
    });
    sendAPIRequest({
      ...route.params,
      action: 'status',
      additionalParams: 'V_DIRECTION',
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
      <View style={styles.section}>
        <Typography
          variant="body-medium"
          text={`Aktualna temperatura wentylacji: ${fan.values.V_TEMP}°C`}
        />
        <Typography
          variant="body-small"
          text={`Zakres: ${fanRangeValues.minTemp} - ${fanRangeValues.maxTemp}`}
        />
        <Input
          text={temp}
          onChange={onTempChange}
          placeholder=""
          keyboardType="numeric"
          max={fanRangeValues.maxTemp}
        />
      </View>
      <View style={styles.section}>
        <Typography
          variant="body-medium"
          text={`Aktualna prędkość wentylacji: ${fan.values.V_PERCENTAGE}%`}
        />
        <Typography
          variant="body-small"
          text={`Zakres: ${fanRangeValues.minPercentage} - ${fanRangeValues.maxPercentage}`}
        />
        <Input
          text={percentage}
          onChange={onPercentageChange}
          placeholder=""
          keyboardType="numeric"
          max={fanRangeValues.maxPercentage}
        />
      </View>
      <View style={styles.section}>
        <Typography
          variant="body-medium"
          text={`Aktualny kierunek głowicy: ${fan.values.V_DIRECTION}°`}
        />
        <Typography
          variant="body-small"
          text={`Zakres: ${fanRangeValues.minDirection} - ${fanRangeValues.maxDirection}`}
        />
        <Input
          text={direction}
          onChange={onDirectionChange}
          placeholder=""
          keyboardType="numeric"
          max={fanRangeValues.maxDirection}
        />
      </View>
      <Button
        text="Zmień parametry wentylatora"
        onPress={handleChangeFanParams}
      />
      <Button text="Pobierz najnowsze wartości" onPress={handleGetFanParams} />
    </LayoutProvider>
  );
};
