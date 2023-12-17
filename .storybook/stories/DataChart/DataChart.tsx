import React, { FC, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ChartData } from '../../../types';
import { theme } from '../../theme';
import { DataChartConsts } from './DataChartConsts';

export type DataChartProps = {
  chartData: ChartData[];
  prefix?: string;
  suffix?: string;
};

export const DataChart: FC<DataChartProps> = ({
  chartData,
  prefix = '',
  suffix = '',
}) => {
  const [chartWidth, setChartWidth] = useState(0);
  const chartHeight = chartWidth / DataChartConsts.HEIGHT_CALC_FACTOR;

  const onLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    setChartWidth(width);
  };

  const chartConfig = useMemo(
    () => ({
      backgroundGradientFrom: theme.colors['background-gradient-from'],
      backgroundGradientTo: theme.colors['background-gradient-to'],
      decimalPlaces: 1,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }),
    [],
  );

  const chartContent = {
    labels: chartData.map(chartElement => chartElement.index),
    datasets: [
      {
        data: chartData.map(chartElement => chartElement.value),
      },
    ],
  };

  return (
    <View onLayout={onLayout}>
      <LineChart
        data={chartContent}
        width={chartWidth}
        height={chartHeight}
        chartConfig={chartConfig}
        yAxisLabel={prefix}
        yAxisSuffix={suffix}
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
