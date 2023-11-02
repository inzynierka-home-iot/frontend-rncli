import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DayButton } from './DayButton'
import DatePicker from 'react-native-date-picker';
import { theme } from '../../theme';
import { Typography } from '../Typography';

export type ScheduleDateValue = {
  hours: number;
  minutes: number;
  days?: string[];
}

export type ScheduleDatePickerProps = {
  onChange: (params: ScheduleDateValue) => void;
  mode?: 'interval' | 'repeat';
};

const AVAILABLE_DAYS = ['mon', 'tue', 'wed', 'thu', 'fr', 'sat', 'sun']

export const ScheduleDatePicker: FC<ScheduleDatePickerProps> = ({
  mode = 'interval',
  onChange,
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [date, setDate] = useState(new Date())

  const onSelectDay = (value: string) => {
    setSelectedDays((selectedDays) => {
      if (selectedDays.includes(value)) {
        return selectedDays.filter((day) => day !== value)
      }
      return [...selectedDays, value]
    })
  }

  const onTimeChange = (newDate: Date) => setDate(newDate)

  useEffect(() => {
    onChange({
      hours: date.getHours(),
      minutes: date.getMinutes(),
      days: selectedDays,
    })
  }, [date, selectedDays])

  return (
    <View style={styles.container}>
      {mode === 'repeat' && (
        <>
          <Typography text="Wybierz dzień" variant="header-small" />
          <View style={styles.daysContainer}>
            {AVAILABLE_DAYS.map((day) => <DayButton
              key={day}
              value={day}
              onDayChange={onSelectDay}
              isSelected={selectedDays.includes(day)}
            />)}
          </View>
        </>
      )}
      <Typography text="Wybierz godzinę" variant="header-small" />
      <DatePicker
        date={date}
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
  }
})