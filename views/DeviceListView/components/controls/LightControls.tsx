import React, { FC, useMemo } from 'react';
import {
  Button,
  Select,
  Typography,
  useSelectIndex,
} from '../../../../.storybook/stories';
import { useSendAPIRequest } from '../../../../hooks';
import { AdditionalControlsProps } from '../AdditionalControls';
import { useAppSelector } from '../../../../redux/hooks';
import { selectNodesWithType } from '../../../../redux/devicesSlice';

export const LightControls: FC<AdditionalControlsProps> = ({
  deviceType,
  botHash,
  botId,
}) => {
  const sendIoTAPIRequest = useSendAPIRequest();

  const [selectedIndex, onSelect] = useSelectIndex();

  const nodes = useAppSelector(state => selectNodesWithType(state, deviceType));

  const nodesSelectData = useMemo(
    () =>
      nodes.map(node => ({
        display: node,
        value: node,
      })),
    [nodes],
  );

  const lightActionBaseParams = {
    // TODO - set proper location EVERYWHERE
    location: 'home-1',
    deviceType,
    botHash,
    botId,
  };

  const handleAllLightsOn = () => {
    sendIoTAPIRequest({
      ...lightActionBaseParams,
      nodeId: '*',
      deviceId: '*',
      action: 'set',
      additionalParams: { V_STATUS: 1 },
    });
  };

  const handleAllLightsOff = () => {
    sendIoTAPIRequest({
      ...lightActionBaseParams,
      nodeId: '*',
      deviceId: '*',
      action: 'set',
      additionalParams: { V_STATUS: 0 },
    });
  };

  const handleNodeLightsOn = () => {
    sendIoTAPIRequest({
      ...lightActionBaseParams,
      nodeId: nodesSelectData[selectedIndex].value,
      deviceId: '*',
      action: 'set',
      additionalParams: { V_STATUS: 1 },
    });
  };

  const handleNodeLightsOff = () =>
    sendIoTAPIRequest({
      ...lightActionBaseParams,
      nodeId: nodesSelectData[selectedIndex].value,
      deviceId: '*',
      action: 'set',
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
      <Typography
        variant="body-medium"
        text="Wybierz node, którym chcesz zarządzać"
      />
      <Select
        selectData={nodesSelectData}
        index={selectedIndex}
        onSelect={onSelect}
      />
      <Button
        text="Włącz w danym nodzie"
        variant="success"
        hasFullWidth
        onPress={handleNodeLightsOn}
      />
      <Button
        text="Wyłącz w danym nodzie"
        variant="error"
        hasFullWidth
        onPress={handleNodeLightsOff}
      />
    </>
  );
};
