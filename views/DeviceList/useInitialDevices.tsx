import { useEffect, useState } from 'react';
import { Device, getAvailableDevices } from '../../utils/getAvailableDevices';

const mockedDevices = [
  {
    location: 'home-1',
    id: '0',
    node: '1',
    type: 'S_LIGHT',
    name: 'Green LED',
  },
  {
    location: 'home-1',
    id: '1',
    node: '1',
    type: 'S_TEMP',
    name: 'Temperature sensor',
  },
  {
    location: 'home-1',
    id: '2',
    node: '1',
    type: 'S_LIGHT',
    name: 'Yellow LED',
  },
  { location: 'home-1', id: '3', node: '1', type: 'S_LIGHT', name: 'Red LED' },
  { location: 'home-1', id: '4', node: '1', type: 'S_LOCK', name: 'Button' },
  { location: 'home-1', id: '5', node: '1', type: 'S_LOCK', name: 'Button' },
  { location: 'home-1', id: '6', node: '1', type: 'S_LOCK', name: 'Button' },
  { location: 'home-1', id: '7', node: '1', type: 'S_LIGHT', name: 'Red LED' },
  { location: 'home-1', id: '8', node: '1', type: 'S_LIGHT', name: 'Red LED' },
];

export const useInitialDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    (async () => {
      setDevices(await getAvailableDevices());
    })();
  }, []);

  return mockedDevices;
  //   return devices;
};
