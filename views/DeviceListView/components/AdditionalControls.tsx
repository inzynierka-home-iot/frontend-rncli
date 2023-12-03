import React, { FC } from 'react';
import { DeviceType } from '../../../types';
import {
  BuzzerControls,
  DistanceDetectorControls,
  FanControls,
  HumidityDetectorControls,
  LightControls,
  LightDetectorControls,
  LockControls,
  MotionDetectorControls,
  RgbLightControls,
  TempSensorControls,
} from './controls';

export type AdditionalControlsProps = {
  deviceType: DeviceType;
  botHash: string;
  botId: string;
};

export const AdditionalControls: FC<AdditionalControlsProps> = ({
  deviceType,
  botHash,
  botId,
}) => {
  switch (deviceType) {
    case DeviceType.S_BINARY:
      return (
        <LightControls
          deviceType={deviceType}
          botHash={botHash}
          botId={botId}
        />
      );
    case DeviceType.S_CUSTOM:
      return (
        <BuzzerControls
          deviceType={deviceType}
          botHash={botHash}
          botId={botId}
        />
      );
    case DeviceType.S_DISTANCE:
      return (
        <DistanceDetectorControls
          deviceType={deviceType}
          botHash={botHash}
          botId={botId}
        />
      );
    case DeviceType.S_FAN:
      return (
        <FanControls deviceType={deviceType} botHash={botHash} botId={botId} />
      );
    case DeviceType.S_HUM:
      return (
        <HumidityDetectorControls
          deviceType={deviceType}
          botHash={botHash}
          botId={botId}
        />
      );
    case DeviceType.S_LIGHT_LEVEL:
      return (
        <LightDetectorControls
          deviceType={deviceType}
          botHash={botHash}
          botId={botId}
        />
      );
    case DeviceType.S_LOCK:
      return (
        <LockControls deviceType={deviceType} botHash={botHash} botId={botId} />
      );
    case DeviceType.S_MOTION:
      return (
        <MotionDetectorControls
          deviceType={deviceType}
          botHash={botHash}
          botId={botId}
        />
      );
    case DeviceType.S_RGB_LIGHT:
      return (
        <RgbLightControls
          deviceType={deviceType}
          botHash={botHash}
          botId={botId}
        />
      );
    case DeviceType.S_TEMP:
      return (
        <TempSensorControls
          deviceType={deviceType}
          botHash={botHash}
          botId={botId}
        />
      );
    default:
      return null;
  }
};
