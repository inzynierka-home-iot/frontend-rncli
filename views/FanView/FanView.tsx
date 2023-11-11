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

  const checkInput = (
    value: string,
    inputChange: (value: string) => void,
    min: number,
    max: number,
  ) => {
    if (value === '') {
      value = min.toString();
    }
    const parts = value.replace(',', '.').split('.').slice(0, 2);
    parts[0] = parseInt(parts[0]).toString();
    const newValue = parts.join('.');
    const newValueNumeric = parseFloat(newValue);
    const finalValue =
      newValueNumeric < min
        ? min.toString()
        : newValueNumeric > max
        ? max.toString()
        : newValue;
    inputChange(finalValue);
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
              onChange={e => {
                checkInput(
                  e,
                  onTempChange,
                  fanRangeValues.minTemp,
                  fanRangeValues.maxTemp,
                );
              }}
              placeholder=""
              keyboardType="numeric"
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
              onChange={e => {
                checkInput(
                  e,
                  onPercentageChange,
                  fanRangeValues.minPercentage,
                  fanRangeValues.maxPercentage,
                );
              }}
              placeholder=""
              keyboardType="numeric"
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
              onChange={e => {
                checkInput(
                  e,
                  onDirectionChange,
                  fanRangeValues.minDirection,
                  fanRangeValues.maxDirection,
                );
              }}
              placeholder=""
              keyboardType="numeric"
            />
          </View>
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
