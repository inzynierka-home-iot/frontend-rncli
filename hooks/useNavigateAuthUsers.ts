import { useEffect } from 'react';
import { ReadStoredValue } from '../utils/EncryptedStorage';
import { useAppNavigation } from './useAppNavigation';

export const useNavigateAuthUsers = () => {
  const navigation = useAppNavigation();

  useEffect(() => {
    (async () => {
      const resLogging = await ReadStoredValue('SignedIn');
      if (resLogging) {
        navigation.navigate('DeviceList');
      }
    })();
  }, [navigation]);
};
