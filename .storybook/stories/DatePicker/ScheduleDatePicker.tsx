import React, { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { DayButton } from './DayButton';
import DatePicker from 'react-native-date-picker';
import { theme } from '../../theme';
import { Typography } from '../Typography';

export type ScheduleDateValue = {
  hours: number;
  minutes: number;
  days: number[];
};

export type ScheduleDatePickerProps = {
  schedule: ScheduleDateValue;
  onChange: (params: ScheduleDateValue) => void;
  mode?: 'interval' | 'repeat';
};

const AVAILABLE_DAYS = ['mon', 'tue', 'wed', 'thu', 'fr', 'sat', 'sun'];

export const ScheduleDatePicker: FC<ScheduleDatePickerProps> = ({
  schedule: { hours, minutes, days },
  onChange,
  mode = 'interval',
}) => {
  const onSelectDay = useCallback((value: number) => {
    if (days.includes(value)) {
      onChange({
        hours,
        minutes,
        days: days.filter((day) => day !== value),
      });
    } else {
      onChange({
        hours,
        minutes,
        days: [...days, value],
      });
    }
  }, [hours, minutes, days, onChange])

  const onTimeChange = useCallback((newDate: Date) => {
    onChange({
      hours: newDate.getHours(),
      minutes: newDate.getMinutes(),
      days
    })
  }, [hours, minutes, days, onChange])

  return (
    <View style={styles.container}>
      {mode === 'repeat' && (
        <>
          <Typography text="Wybierz dni" variant="header-small" />
          <View style={styles.daysContainer}>
            {AVAILABLE_DAYS.map((day, index) => <DayButton
              key={day}
              value={index + 1}
              label={day}
              onDayChange={onSelectDay}
              isSelected={days.includes(index + 1)}
            />)}
          </View>
        </>
      )}
      <Typography text="Wybierz godzinę" variant="header-small" />
      <DatePicker
        date={new Date(2023, 1, 1, hours, minutes)}
        mode='time'
        onDateChange={onTimeChange}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(6),
  },
  daysContainer: {
    display: 'flex',
    gap: theme.spacing(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});