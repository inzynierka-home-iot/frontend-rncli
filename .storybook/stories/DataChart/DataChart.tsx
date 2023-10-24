import React, { FC, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ChartData } from '../../../types';
import { theme } from '../../theme';

export type DataChartProps = {
  chartData: ChartData[];
};

export const DataChart: FC<DataChartProps> = ({ chartData }) => {
  const [chartWidth, setChartWidth] = useState<number>(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    setChartWidth(width);
  };

  const chartConfig = useMemo(() => {
    return {
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    };
  }, []);

  return (
    <View onLayout={onLayout}>
      <LineChart
        data={{
          labels: chartData.map(chartElement => chartElement.date),
          datasets: [
            {
              data: chartData.map(chartElement => chartElement.value),
            },
          ],
        }}
        width={chartWidth}
        height={chartWidth / 1.5}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    borderRadius: theme.spacing(4),
  },
});
