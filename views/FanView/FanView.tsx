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

const numberRegex = new RegExp('\\.', 'g');

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
    if (value == '') {
      value = min.toString();
    }
    const potentialValue = parseFloat(value);
    if (isNaN(potentialValue)) {
      return;
    }
    const potentialValueString = potentialValue.toString();
    if (
      value == potentialValueString + ',' ||
      value == potentialValueString + '.,'
    ) {
      value = potentialValueString + '.';
    }
    let numberOfDots = value.match(numberRegex)?.length;
    if (numberOfDots && numberOfDots > 1) {
      value = potentialValueString + '.';
      numberOfDots = value.match(numberRegex)?.length;
      if (numberOfDots && numberOfDots > 1) {
        value = potentialValueString;
      }
    }
    const finalValueFloat = parseFloat(value);
    if (finalValueFloat < min) {
      inputChange(min.toString());
    } else if (finalValueFloat > max) {
      inputChange(max.toString());
    } else {
      numberOfDots = value.match(numberRegex)?.length;
      const finalValueString =
        value == finalValueFloat.toString()
          ? finalValueFloat.toString()
          : numberOfDots && numberOfDots > 0
          ? finalValueFloat.toString() + '.'
          : finalValueFloat.toString();
      inputChange(finalValueString);
    }
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
            <Input
              text={temp}
              onChange={e => {
                checkInput(e, onTempChange, 0, 50);
              }}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.section}>
            <Typography
              variant="body-medium"
              text={`Aktualna prędkość wentylacji: ${fan.values.V_PERCENTAGE}%`}
            />
            <Input
              text={percentage}
              onChange={e => {
                checkInput(e, onPercentageChange, 0, 100);
              }}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.section}>
            <Typography
              variant="body-medium"
              text={`Aktualny kierunek głowicy wentylacji: ${fan.values.V_DIRECTION}°`}
            />
            <Input
              text={direction}
              onChange={e => {
                checkInput(e, onDirectionChange, 0, 255);
              }}
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
