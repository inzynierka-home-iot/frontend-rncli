import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';
import { Typography } from '../Typography/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type AlertBannerProps = {
  text: string;
  variant?: 'success' | 'informative' | 'error';
  onClose: () => void;
};

export const AlertBanner: FC<AlertBannerProps> = ({
  text,
  variant = 'informative',
  onClose,
}) => {
  const backgroundColor =
    variant == 'success'
      ? 'text-success'
      : variant == 'informative'
      ? 'text-informative'
      : 'text-error';
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors[backgroundColor],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing(6),
        paddingVertical: theme.spacing(2),
        margin: theme.spacing(2),
        borderRadius: theme.spacing(1),
      }}>
      <View style={{ flex: 1 }}>
        <Typography
          variant={'body-medium'}
          text={text}
          color="text-invertedPrimary"
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.2}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing(3),
        }}
        onPress={onClose}>
        <FontAwesomeIcon
          style={{
            transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }],
          }}
          icon={faXmark}
          color={theme.colors['text-invertedPrimary']}
        />
      </TouchableOpacity>
    </View>
  );
};
