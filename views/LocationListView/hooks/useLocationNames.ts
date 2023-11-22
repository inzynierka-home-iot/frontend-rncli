import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { resolveUserID } from '../../../utils';
import { addAlert } from '../../../redux/alertsSlice';
import { AlertBannerProps } from '../../../.storybook/stories';
import { Alert, LocationCredential } from '../../../types';

export const useLocationNames = () => {
  const dispatch = useAppDispatch();

  const { botsNames } = useAppSelector(state => state.admin);

  const [isLoading, setIsLoading] = useState(true);
  const [showRefresh, setShowRefresh] = useState(false);
  const [locationCredentials, setLocationCredentials] = useState<
    LocationCredential[]
  >([]);

  const createLocationAlert = (
    variant: AlertBannerProps['variant'],
    text: string,
  ) => {
    const alert: Alert = {
      variant,
      text,
    };
    dispatch(addAlert(alert));
  };

  useEffect(() => {
    if (!botsNames) {
      return;
    }
    if (botsNames.length) {
      const locations = botsNames.map((name: string) => resolveUserID(name));
      Promise.all(locations)
        .then(credentials => {
          createLocationAlert('success', 'Pobrano lokacje');
          setLocationCredentials(credentials);
        })
        .catch(e => {
          createLocationAlert('error', 'Nie udało się pobrać lokacji');
          setShowRefresh(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      createLocationAlert('error', 'Brak zapisanych lokacji');
      setIsLoading(false);
    }
  }, [botsNames]);

  const startRetrieving = () => {
    setIsLoading(true);
    setShowRefresh(false);
  };

  return { isLoading, locationCredentials, showRefresh, startRetrieving };
};
