import React, { FC, useMemo } from 'react';
import {
  Button,
  CheckBox,
  Input,
  Select,
  Typography,
  useCheckBoxValue,
  useInputValue,
  useSelectValue,
} from '../../../.storybook/stories';
import { selectDevicesWithType } from '../../../redux/devicesSlice';
import { useAppSelector } from '../../../redux/hooks';
import { DeviceType, SprinklerSchedule } from '../../../types';
import { sendAPIRequest } from '../../../utils';

type TurnOnSprinklerSelectProps = {
  sprinklerBaseParams: any;
  sprinklerSchedule?: SprinklerSchedule;
};

export const TurnOnSprinklerSelect: FC<TurnOnSprinklerSelectProps> = ({
  sprinklerBaseParams,
  sprinklerSchedule,
}) => {
  const [isSprinklerTurnOnAutomatically, onToggle] = useCheckBoxValue(
    Object.keys(sprinklerSchedule || []).length !== 0,
  );
  const [humValue, onChangeHumValue] = useInputValue(sprinklerSchedule?.V_HUM);
  const [lightValue, onChangeLightValue] = useInputValue(
    sprinklerSchedule?.V_LIGHT_LEVEL,
  );
  const [humSelectedValue, onHumSelect] = useSelectValue();

  const humSensors = useAppSelector(state =>
    selectDevicesWithType(state, DeviceType.S_HUM),
  );

  const humSensorsIds = useMemo(
    () =>
      humSensors.map(humSensor => ({
        display: humSensor.name,
        value: {
          location: humSensor.location,
          nodeId: humSensor.nodeId,
          id: humSensor.id,
        },
      })),
    [humSensors],
  );

  const [lightSelectedValue, onLightSelect] = useSelectValue();

  const lightSensors = useAppSelector(state =>
    selectDevicesWithType(state, DeviceType.S_LIGHT_LEVEL),
  );
  const lightSensorsIds = useMemo(
    () =>
      lightSensors.map(lightSensor => ({
        display: lightSensor.name,
        value: {
          location: lightSensor.location,
          nodeId: lightSensor.nodeId,
          id: lightSensor.id,
        },
      })),
    [lightSensors],
  );

  const onTurnOnSprinklerAutomatically = () => {
    sendAPIRequest({
      ...sprinklerBaseParams,
      action: 'setSchedule',
      additionalParams: {
        action: 'automaticSprinkler',
        humLocation: humSensorsIds[humSelectedValue].value.location,
        humNodeId: humSensorsIds[humSelectedValue].value.nodeId,
        humId: humSensorsIds[humSelectedValue].value.id,
        V_HUM: humValue,
        lightLocation: lightSensorsIds[lightSelectedValue].value.location,
        lightNodeId: lightSensorsIds[lightSelectedValue].value.nodeId,
        lightId: lightSensorsIds[lightSelectedValue].value.id,
        V_LIGHT_LEVEL: lightValue,
      },
    });
  };

  const onCheckboxPress = () => {
    if (isSprinklerTurnOnAutomatically) {
      sendAPIRequest({
        ...sprinklerBaseParams,
        action: 'setSchedule',
        additionalParams: {
          action: 'remove',
        },
      });
    }
    onToggle();
  };

  return (
    <>
      <CheckBox
        checked={isSprinklerTurnOnAutomatically}
        onPress={onCheckboxPress}
        label="Włączaj automatycznie zraszacz, jeżeli czujniki światła i wilgotności uzyskają ustawione wartości."
      />
      {isSprinklerTurnOnAutomatically && (
        <>
          <Typography
            text="Wybierz czujnik wilgotności:"
            variant="body-medium"
          />
          <Select
            selectData={humSensorsIds}
            index={humSelectedValue}
            onSelect={onHumSelect}
          />
          <Typography
            text="Włącz jezeli wilgotność spadnie do:"
            variant="body-medium"
          />
          <Input
            keyboardType="numeric"
            text={humValue}
            onChange={onChangeHumValue}
          />
          <Typography text="Wybierz czujnik światła:" variant="body-medium" />
          <Select
            selectData={lightSensorsIds}
            index={lightSelectedValue}
            onSelect={onLightSelect}
          />
          <Typography
            text="Włącz jeżeli natężenie światła spadnie do:"
            variant="body-medium"
          />
          <Input
            keyboardType="numeric"
            text={lightValue}
            onChange={onChangeLightValue}
          />
          <Button text="Włącz" onPress={onTurnOnSprinklerAutomatically} />
        </>
      )}
    </>
  );
};
