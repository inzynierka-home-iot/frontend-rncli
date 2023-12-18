import { Device, DeviceType } from '../../types';

export const mockedData = {
  devices: [
    {
      location: 'home-1',
      nodeId: '1',
      id: '0',
      type: DeviceType.S_BINARY,
      name: 'Green LED',
      values: {
        V_STATUS: '0',
        V_WATT: null,
      },
    },
    {
      location: 'home-1',
      nodeId: '2',
      id: '0',
      type: DeviceType.S_BINARY,
      name: 'Red LED',
      values: {
        V_STATUS: '1',
        V_WATT: null,
      },
    },
    {
      location: 'home-1',
      nodeId: '1',
      id: '1',
      type: DeviceType.S_TEMP,
      name: 'Temp sensor 1',
      values: {
        V_TEMP: '23.375',
        V_ID: null,
      },
      schedule: {
        action: 'getTemp',
        hours: '22',
        minutes: '32',
        days: '4,5',
      },
    },
    {
      location: 'home-1',
      nodeId: '2',
      id: '1',
      type: DeviceType.S_TEMP,
      name: 'Temp sensor 2',
      values: {
        V_TEMP: '23.375',
        V_ID: null,
      },
      schedule: {},
    },
    {
      location: 'home-1',
      nodeId: '1',
      id: '2',
      type: DeviceType.S_RGB_LIGHT,
      name: 'RGB Light',
      values: {
        V_RGB: '60ffa2',
      },
    },
    {
      location: 'home-1',
      nodeId: '1',
      id: '3',
      type: DeviceType.S_FAN,
      name: 'Fan',
      values: {
        V_STATUS: '1',
        V_TEMP: '24.5',
        V_PERCENTAGE: '34',
        V_DIRECTION: '128',
      },
      schedule: {
        action: 'maintain',
        location: 'home-1',
        nodeId: '1',
        id: '1',
        V_TEMP: '25',
      },
    },
    {
      location: 'home-1',
      nodeId: '2',
      id: '2',
      type: DeviceType.S_FAN,
      name: 'Fan',
      values: {
        V_STATUS: '0',
        V_TEMP: '24.5',
        V_PERCENTAGE: '34',
        V_DIRECTION: '128',
      },
      schedule: {},
    },
    {
      location: 'home-1',
      nodeId: '1',
      id: '4',
      type: DeviceType.S_DISTANCE,
      name: 'Czujnik odległości',
      values: {
        V_DISTANCE: '50',
      },
    },
    {
      location: 'home-1',
      nodeId: '1',
      id: '5',
      type: DeviceType.S_HUM,
      name: 'Czujnik wilgotności',
      values: {
        V_HUM: '30',
      },
    },
    {
      location: 'home-1',
      nodeId: '1',
      id: '6',
      type: DeviceType.S_LIGHT_LEVEL,
      name: 'Czujnik światła',
      values: {
        V_LIGHT_LEVEL: '27',
      },
    },
    {
      location: 'home-1',
      nodeId: '1',
      id: '7',
      type: DeviceType.S_MOTION,
      name: 'Czujnik ruchu',
      values: {
        V_LIGHT_LEVEL: '0',
      },
    },
    {
      location: 'home-1',
      nodeId: '1',
      id: '8',
      type: DeviceType.S_CUSTOM,
      name: 'Buzzer',
      values: {
        V_STATUS: '0',
      },
    },
    {
      location: 'home-1',
      nodeId: '1',
      id: '9',
      type: DeviceType.S_LOCK,
      name: 'Lock',
      values: {
        V_LOCK_STATUS: '0',
      },
    },
    {
      location: 'home-1',
      nodeId: '1',
      id: '5',
      type: DeviceType.S_SPRINKLER,
      name: 'Sprinkler',
      values: {
        V_STATUS: '0',
      },
      schedule: {},
    },
  ] as Device[],
};
