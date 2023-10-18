import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';
import { Typography } from '../Typography/Typography';

type ListItemProps = {
  text: string;
  icon?: IconDefinition;
  onPress: () => void;
};

export const ListItem: FC<ListItemProps> = ({ text, icon, onPress }) => {
  const color = theme.colors['text-invertedPrimary'];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.4}>
      <View style={styles.leftPanel}>
        <Typography
          variant={'header-small'}
          text={text}
          color="text-invertedPrimary"
        />
        {icon && (
          <FontAwesomeIcon icon={icon} color={color} size={theme.spacing(8)} />
        )}
      </View>
      <FontAwesomeIcon
        icon={faChevronRight}
        color={color}
        size={theme.spacing(8)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors['background-neutral'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(5),
    borderRadius: theme.spacing(2),
    elevation: 2,
  },
  leftPanel: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
