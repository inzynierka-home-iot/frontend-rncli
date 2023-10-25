import { useEffect } from 'react';
import { sendAPIRequest } from '../utils';
import { useAppSelector } from '../redux/hooks';
import { RootStackParamList } from '../types/Navigation';
import { selectTempSensorHistory } from '../redux/currentTempSensorSlice';

export const useTempHistory = ({
  location,
  nodeId,
  deviceId,
  botId,
  botHash,
}: RootStackParamList['TempSensor']) => {
  useEffect(() => {
    if (botId && botHash) {
      sendAPIRequest({
        location,
        nodeId,
        deviceId,
        action: 'statusAll',
        additionalParams: 'V_TEMP',
        botHash,
        botId,
      });
    }
  }, [botId, botHash]);

  const tempSensorHistory = useAppSelector(selectTempSensorHistory);

  return tempSensorHistory;
};
