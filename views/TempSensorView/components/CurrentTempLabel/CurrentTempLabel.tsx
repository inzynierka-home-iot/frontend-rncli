import { FC, useMemo } from 'react';
import React from 'react-native';
import { Button, Typography } from '../../../../.storybook/stories';
import { selectTempSensorSubscription } from '../../../../redux/currentTempSensorSlice';
import { useAppSelector } from '../../../../redux/hooks';
import { sendAPIRequest } from '../../../../utils';
import { TempSensorBaseParams } from '../../TempSensorView';

type CurrentTempLabelProps = {
  tempValueRaw: number;
  tempSensorParams: TempSensorBaseParams;
};

export const CurrentTempLabel: FC<CurrentTempLabelProps> = ({
  tempValueRaw,
  tempSensorParams,
}) => {
  const tempValue = useMemo(
    () => Math.round(tempValueRaw * 100) / 100,
    [tempValueRaw],
  );

  const subscription = useAppSelector(selectTempSensorSubscription);

  const handleGetTemp = () => {
    sendAPIRequest({
      ...tempSensorParams,
      action: 'status',
      additionalParams: 'V_TEMP',
    });
  };

  const handleSubscribe = () => {
    sendAPIRequest({
      ...tempSensorParams,
      action: 'subscribe',
    });
  };

  const handleUnsubscribe = () => {
    sendAPIRequest({
      ...tempSensorParams,
      action: 'unsubscribe',
    });
  };

  return (
    <>
      <Typography
        variant="body-medium"
        text={`Aktualna temperatura: ${tempValue}°C`}
      />
      <Button
        text="Pobierz aktualną temperaturę"
        size="medium"
        hasFullWidth
        onPress={handleGetTemp}
      />
      {subscription ? (
        <Button
          text="Anuluj subskrypcję"
          size="medium"
          variant="error"
          hasFullWidth
          onPress={handleUnsubscribe}
        />
      ) : (
        <Button
          text="Subskrybuj"
          size="medium"
          variant="success"
          hasFullWidth
          onPress={handleSubscribe}
        />
      )}
    </>
  );
};
