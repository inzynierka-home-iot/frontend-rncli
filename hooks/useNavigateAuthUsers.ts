import { useState } from 'react';
import { ReadStoredValue } from '../utils';
import { useAppNavigation } from './useAppNavigation';
import { useFocusEffect } from '@react-navigation/native';

export const useNavigateAuthUsers = () => {
  const navigation = useAppNavigation();

  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(() => {
    setIsLoading(true);
    (async () => {
      const resLogging = await ReadStoredValue('SignedIn');
      if (resLogging) {
        navigation.navigate('LocationList');
      }
      setIsLoading(false);
    })();
  });

  return isLoading;
};
