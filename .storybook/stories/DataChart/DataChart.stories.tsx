import React from 'react';
import { View } from 'react-native';
import { DataChart } from './DataChart';
import { ChartData } from '../../../types';

const MyDataChartMeta = {
  title: 'DataChart',
  component: DataChart,
  decorators: [
    (Story: any) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Story />
      </View>
    ),
  ],
};

const mockedData = {
  currentTempSensorHistory: [
    { date: '1', value: 23.255 },
    { date: '2', value: 24.546 },
    { date: '3', value: 22.342 },
    { date: '4', value: 25.362 },
    { date: '5', value: 27.355 },
    { date: '6', value: 24.825 },
    { date: '7', value: 21.367 },
  ] as ChartData[],
};

export default MyDataChartMeta;

export const Basic = {
  args: {
    chartData: mockedData.currentTempSensorHistory,
  },
};
