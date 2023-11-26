import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import {
  Button,
  Input,
  Typography,
  useInputValue,
} from '../../../../.storybook/stories';
import { useSendAPIRequest } from '../../../../hooks';
import { FanRangeValues, FanValues } from '../../../../types';
import { getNumericValue } from '../../../../utils';
import { styles } from './CurrentParamsLabel.styles';

type CurrentParamsLabelProps = {
  fanBaseParams: any;
  fanValues: FanValues;
};

export const CurrentParamsLabel: FC<CurrentParamsLabelProps> = ({
  fanBaseParams,
  fanValues,
}) => {
  const sendIoTAPIRequest = useSendAPIRequest();

  const [temp, onTempChange] = useInputValue(fanValues.V_TEMP);
  const [percentage, onPercentageChange] = useInputValue(
    fanValues.V_PERCENTAGE,
  );
  const [direction, onDirectionChange] = useInputValue(fanValues.V_DIRECTION);

  const fanTurnedOff = useMemo(
    () =>
      fanValues.V_TEMP === '0' &&
      fanValues.V_PERCENTAGE === '0' &&
      fanValues.V_DIRECTION === '0',
    [fanValues.V_TEMP, fanValues.V_PERCENTAGE, fanValues.V_DIRECTION],
  );

  const onFanStateToggle = useCallback(() => {
    const tempValue = fanTurnedOff ? FanRangeValues.DEFAULT_TEMP : 0;
    const percentageValue = fanTurnedOff
      ? FanRangeValues.DEFAULT_PERCENTAGE
      : 0;
    const directionValue = fanTurnedOff ? FanRangeValues.DEFAULT_DIRECTION : 0;

    sendIoTAPIRequest({
      ...fanBaseParams,
      action: 'set',
      additionalParams: {
        V_TEMP: tempValue,
        V_PERCENTAGE: percentageValue,
        V_DIRECTION: directionValue,
      },
    });
  }, [fanTurnedOff, fanBaseParams, sendIoTAPIRequest]);

  const onChangeFanParams = useCallback(() => {
    const finalTempValue = getNumericValue(parseFloat, temp);
    const finalPercentageValue = getNumericValue(parseFloat, percentage);
    const finalDirectionValue = getNumericValue(parseFloat, direction);

    sendIoTAPIRequest({
      ...fanBaseParams,
      action: 'set',
      additionalParams: {
        V_TEMP: finalTempValue,
        V_PERCENTAGE: finalPercentageValue,
        V_DIRECTION: finalDirectionValue,
      },
    });
  }, [direction, fanBaseParams, percentage, sendIoTAPIRequest, temp]);

  const onGetFanParams = useCallback(() => {
    sendIoTAPIRequest({
      ...fanBaseParams,
      action: 'status',
    });
  }, [fanBaseParams, sendIoTAPIRequest]);

  useEffect(() => {
    onTempChange(fanValues.V_TEMP);
    onPercentageChange(fanValues.V_PERCENTAGE);
    onDirectionChange(fanValues.V_DIRECTION);
  }, [fanValues, onDirectionChange, onPercentageChange, onTempChange]);

  return (
    <>
      <Button
        text={fanTurnedOff ? 'Włącz wentylator' : 'Wyłącz wentylator'}
        variant={fanTurnedOff ? 'success' : 'error'}
        onPress={onFanStateToggle}
      />
      <View style={styles.section}>
        <Typography
          variant="body-medium"
          text={`Aktualna temperatura wentylacji: ${fanValues.V_TEMP}°C`}
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
          text={`Aktualna prędkość wentylacji: ${fanValues.V_PERCENTAGE}%`}
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
          text={`Aktualny kierunek głowicy: ${fanValues.V_DIRECTION}°`}
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
      <Button text="Zmień parametry wentylatora" onPress={onChangeFanParams} />
      <Button text="Pobierz najnowsze wartości" onPress={onGetFanParams} />
    </>
  );
};
