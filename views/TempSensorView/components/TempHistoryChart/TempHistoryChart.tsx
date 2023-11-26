import { FC } from 'react';
import React, { StyleSheet, View } from 'react-native';
import { Button, DataChart, Typography } from '../../../../.storybook/stories';
import { theme } from '../../../../.storybook/theme';
import { useSendAPIRequest } from '../../../../hooks';
import { useTempHistory } from '../../../../hooks/useTempHistory';
import { TempSensorBaseParams } from '../../TempSensorView';

type TempHistoryChartProps = {
  tempSensorParams: TempSensorBaseParams;
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
    });
  };

  return (
    <>
      {!!currentTempSensorHistory.length && (
        <View style={styles.tempChart}>
          <Typography
            variant="body-medium"
            text="Wykres z ostatnich ${currentTempSensorHistory.length} odczytów"
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

const styles = StyleSheet.create({
  tempChart: {
    gap: theme.spacing(2),
  },
});
