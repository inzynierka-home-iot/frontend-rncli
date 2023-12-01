import { FC } from 'react';
import { Button } from '../../../../.storybook/stories';
import { useSendAPIRequest } from '../../../../hooks';
import { AdditionalControlsProps } from '../AdditionalControls';

export const LightControls: FC<AdditionalControlsProps> = ({
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
    deviceType,
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
};
