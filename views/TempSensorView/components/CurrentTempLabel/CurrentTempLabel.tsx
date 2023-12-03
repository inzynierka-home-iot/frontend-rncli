import { FC, useMemo } from 'react';
import React from 'react-native';
import { Button, Typography } from '../../../../.storybook/stories';
import { useSendAPIRequest } from '../../../../hooks';
import { DeviceViewRouteParams } from '../../../../types';

type CurrentTempLabelProps = {
  tempValueRaw: number;
  tempSensorParams: DeviceViewRouteParams;
};

export const CurrentTempLabel: FC<CurrentTempLabelProps> = ({
  tempValueRaw,
  tempSensorParams,
}) => {
  const sendIoTAPIRequest = useSendAPIRequest();

  const handleGetTemp = () => {
    sendIoTAPIRequest({
      ...tempSensorParams,
      action: 'status',
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
    </>
  );
};
