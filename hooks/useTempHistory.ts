import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { RootStackParamList } from '../types/Navigation';
import { selectTempSensorHistory } from '../redux/currentTempSensorSlice';
import { useSendAPIRequest } from './useSendAPIRequest';

export const useTempHistory = ({
  location,
  nodeId,
  deviceId,
  botId,
  botHash,
}: RootStackParamList['TempSensor']) => {
  const sendIoTAPIRequest = useSendAPIRequest();

  useEffect(() => {
    if (botId && botHash) {
      sendIoTAPIRequest({
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
