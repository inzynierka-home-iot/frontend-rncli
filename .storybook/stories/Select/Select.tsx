import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { theme } from '../../theme';
import { Typography } from '../Typography/Typography';

export type SelectProps = {
  selectData: Array<{ display: string; value: string }>;
  variant?: 'default' | 'error';
  disabled?: boolean;
  index: number;
  defaultText?: string;
  onSelect: (index: number) => void;
};

export const Select: FC<SelectProps> = ({
  selectData,
  variant = 'default',
  disabled = false,
  index,
  defaultText = 'Select',
  onSelect,
}) => {
  const [type, setType] = useState<SelectProps['variant'] | 'active'>(variant);
  const onFocus = useCallback(() => setType('active'), []);
  const onBlur = useCallback(() => setType(variant), [variant]);
  const styles = useStyles(type, disabled);
  const textColor =
    index == -1
      ? 'text-secondary'
      : !disabled
      ? 'text-primary'
      : 'background-subtle';
  const expandColor = !disabled ? 'text-secondary' : 'background-subtle';
  const text = index != -1 ? selectData[index].display : defaultText;

  return (
    <SelectDropdown
      data={selectData.map(e => e.display)}
      onSelect={(selectedItem, index) => onSelect(index)}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      buttonStyle={styles.container}
      renderCustomizedButtonChild={() => (
        <Typography variant="body-large" text={text} color={textColor} />
      )}
      renderDropdownIcon={() => (
        <FontAwesomeIcon
          icon={faChevronDown}
          color={theme.colors[expandColor]}
          size={theme.spacing(8)}
        />
      )}
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
      width: '100%',
      backgroundColor: theme.colors['background-primary'],
      borderRadius: theme.spacing(1),
      borderWidth: 1,
      borderColor: theme.colors[borderColor],
      elevation,
      paddingHorizontal: theme.spacing(2),
    },
  });
};
