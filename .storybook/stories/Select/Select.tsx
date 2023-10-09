import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { theme } from '../../theme';
import { Typography } from '../Typography/Typography';

type SelectProps = {
  selectData: Array<{ display: string; value: string }>;
  variant?: 'default' | 'error';
  disabled?: boolean;
  index: number;
  onSelect: (index: number) => void;
};

export const Select: FC<SelectProps> = ({
  selectData,
  variant = 'default',
  disabled = false,
  index,
  onSelect,
}) => {
  const [type, setType] = useState<SelectProps['variant'] | 'active'>(variant);
  const onFocus = useCallback(() => setType('active'), []);
  const onBlur = useCallback(() => setType(variant), [variant]);
  const styles = useStyles(type, disabled);
  const textColor = !disabled ? 'text-primary' : 'background-subtle';
  const expandColor = !disabled ? 'text-secondary' : 'background-subtle';

  return (
    <SelectDropdown
      data={selectData.map(e => e.display)}
      onSelect={(selectedItem, index) => onSelect(index)}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      buttonStyle={styles.container}
      renderCustomizedButtonChild={() => {
        return (
          <Typography
            variant={'body-large'}
            text={selectData[index].display}
            color={textColor}
          />
        );
      }}
      renderDropdownIcon={() => {
        return (
          <FontAwesomeIcon
            icon={faChevronDown}
            color={theme.colors[expandColor]}
            size={theme.spacing(8)}
          />
        );
      }}
    />
  );
};

const useStyles = (
  type: SelectProps['variant'] | 'active',
  disabled: SelectProps['disabled'],
) => {
  const borderColor =
    type == 'default'
      ? 'background-subtle'
      : type == 'active'
      ? 'action-selected'
      : type == 'error'
      ? 'text-error'
      : 'background-subtle';
  const elevation = !disabled ? 2 : 1;

  return StyleSheet.create({
    container: {
      flex: 1,
      margin: theme.spacing(2),
      backgroundColor: theme.colors['background-primary'],
      borderRadius: theme.spacing(1),
      borderWidth: 1,
      borderColor: theme.colors[borderColor],
      elevation: elevation,
      paddingHorizontal: theme.spacing(2),
    },
  });
};
