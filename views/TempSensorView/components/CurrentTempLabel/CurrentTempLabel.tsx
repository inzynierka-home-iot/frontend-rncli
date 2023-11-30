import { FC, useMemo } from 'react';
import React from 'react-native';
import { Button, Typography } from '../../../../.storybook/stories';
import { useSendAPIRequest } from '../../../../hooks';
import { selectTempSensorSubscription } from '../../../../redux/currentTempSensorSlice';
import { useAppSelector } from '../../../../redux/hooks';
import { DeviceViewRouteParams } from '../../../../types';

type CurrentTempLabelProps = {
  tempValueRaw: number;
  tempSensorParams: DeviceViewRouteParams;
};

export const CurrentTempLabel: FC<CurrentTempLabelProps> = ({
  tempValueRaw,
  tempSensorParams,
}) => {
  const subscription = useAppSelector(selectTempSensorSubscription);

  const sendIoTAPIRequest = useSendAPIRequest();

  const handleGetTemp = () => {
    sendIoTAPIRequest({
      ...tempSensorParams,
      action: 'status',
    });
  };

  const handleSubscribe = () => {
    sendIoTAPIRequest({
      ...tempSensorParams,
      action: 'subscribe',
    });
  };

  const handleUnsubscribe = () => {
    sendIoTAPIRequest({
      ...tempSensorParams,
      action: 'unsubscribe',
    });
  };

  const tempValue = useMemo(
    () => Math.round(tempValueRaw * 100) / 100,
    [tempValueRaw],
  );

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
