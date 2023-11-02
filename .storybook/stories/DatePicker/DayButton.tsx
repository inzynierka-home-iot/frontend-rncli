import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { theme } from '../../theme';
import { Typography } from '../Typography';

type DayButtonProps = {
  value: string;
  isSelected: boolean;
  onDayChange: (value: string) => void;
}

export const DayButton: FC<DayButtonProps> = ({
  value,
  isSelected,
  onDayChange
}) => {
  const styles = useStyles(isSelected);

  const onPress = () => onDayChange(value);

  return (
    <TouchableOpacity style={styles.dayButton} onPress={onPress} activeOpacity={0.6}>
      <Typography text={value} variant='body-small' color='text-invertedPrimary' />
    </TouchableOpacity>
  )
}

const useStyles = (isSelected: boolean) => {
  return StyleSheet.create({
    dayButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: theme.spacing(11),
      height: theme.spacing(11),
      borderRadius: theme.spacing(6),
      padding: theme.spacing(1),
      backgroundColor: isSelected
        ? theme.colors['text-success']
        : theme.colors['action-primary'],
    },
  })
}