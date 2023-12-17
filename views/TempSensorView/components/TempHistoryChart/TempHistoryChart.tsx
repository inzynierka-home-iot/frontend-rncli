import { FC } from 'react';
import React, { View } from 'react-native';
import { Button, DataChart, Typography } from '../../../../.storybook/stories';
import { useSendAPIRequest, useTempHistory } from '../../../../hooks';
import { DeviceViewRouteParams } from '../../../../types';
import { styles } from './TempHistoryChart.styles';

type TempHistoryChartProps = {
  tempSensorParams: DeviceViewRouteParams;
};

export const TempHistoryChart: FC<TempHistoryChartProps> = ({
  tempSensorParams,
}) => {
  const currentTempSensorHistory = useTempHistory(tempSensorParams);

  const sendAPIRequest = useSendAPIRequest();

  const handleGetTempHistory = () => {
    sendAPIRequest({
      ...tempSensorParams,
      action: 'statusAll',
      additionalParams: 'V_TEMP',
    });
  };

  return (
    <>
      {!!currentTempSensorHistory.length && (
        <View style={styles.tempChart}>
          <Typography
            variant="body-medium"
            text={`Wykres z ostatnich ${currentTempSensorHistory.length} odczytów`}
          />
          <DataChart chartData={currentTempSensorHistory} suffix="°C" />
        </View>
      )}
      <Button
        text="Pobierz najnowszą historię"
        size="medium"
        hasFullWidth
        onPress={handleGetTempHistory}
      />
    </>
  );
};
