import React, { FC } from 'react';
import { useSendAPIRequest } from '../../../hooks';
import { DeviceType } from '../../../types';
import { Button } from '../../../.storybook/stories';

type AdditionalControlsProps = {
  deviceType: DeviceType;
  botHash: string;
  botId: string;
};

export const AdditionalControls: FC<AdditionalControlsProps> = ({
  deviceType,
  botHash,
  botId,
}) => {
  const sendIoTAPIRequest = useSendAPIRequest();

  const lightActionBaseParams = {
    location: '*',
    nodeId: '*',
    deviceId: '*',
    action: 'set',
    botHash,
    botId,
  };

  const handleAllLightsOn = () =>
    sendIoTAPIRequest({
      ...lightActionBaseParams,
      additionalParams: { V_STATUS: 1 },
    });

  const handleAllLightsOff = () =>
    sendIoTAPIRequest({
      ...lightActionBaseParams,
      additionalParams: { V_STATUS: 0 },
    });

  if (deviceType == DeviceType.S_BINARY) {
    return (
      <>
        <Button
          text="Włącz wszystkie w całym domu"
          variant="success"
          hasFullWidth
          onPress={handleAllLightsOn}
        />
        <Button
          text="Wyłącz wszystkie w całym domu"
          variant="error"
          hasFullWidth
          onPress={handleAllLightsOff}
        />
        {/* TODO add node selection and turn on/off for selected node */}
      </>
    );
  }
  return null;
};
