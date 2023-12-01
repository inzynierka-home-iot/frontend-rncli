import React, { FC } from 'react';
import { DeviceType } from '../../../types';
import {
  DistanceDetectorControls,
  FanControls,
  HumidityDetectorControls,
  LightControls,
  LightDetectorControls,
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
  return deviceType == DeviceType.S_BINARY ? (
    <LightControls deviceType={deviceType} botHash={botHash} botId={botId} />
  ) : deviceType == DeviceType.S_DISTANCE ? (
    <DistanceDetectorControls
      deviceType={deviceType}
      botHash={botHash}
      botId={botId}
    />
  ) : deviceType == DeviceType.S_FAN ? (
    <FanControls deviceType={deviceType} botHash={botHash} botId={botId} />
  ) : deviceType == DeviceType.S_HUM ? (
    <HumidityDetectorControls
      deviceType={deviceType}
      botHash={botHash}
      botId={botId}
    />
  ) : deviceType == DeviceType.S_LIGHT_LEVEL ? (
    <LightDetectorControls
      deviceType={deviceType}
      botHash={botHash}
      botId={botId}
    />
  ) : deviceType == DeviceType.S_MOTION ? (
    <MotionDetectorControls
      deviceType={deviceType}
      botHash={botHash}
      botId={botId}
    />
  ) : deviceType == DeviceType.S_RGB_LIGHT ? (
    <RgbLightControls deviceType={deviceType} botHash={botHash} botId={botId} />
  ) : deviceType == DeviceType.S_TEMP ? (
    <TempSensorControls
      deviceType={deviceType}
      botHash={botHash}
      botId={botId}
    />
  ) : null;
};
