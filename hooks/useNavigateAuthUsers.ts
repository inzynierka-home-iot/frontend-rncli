import { useEffect, useState } from 'react';
import { ReadStoredValue } from '../utils';
import { useAppNavigation } from './useAppNavigation';
import { useFocusEffect } from '@react-navigation/native';

export const useNavigateAuthUsers = () => {
  const navigation = useAppNavigation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const resLogging = await ReadStoredValue('SignedIn');
      if (resLogging) {
        navigation.navigate('LocationList');
      }
      setIsLoading(false);
    })();
  }, [navigation]);

  return isLoading;
};
