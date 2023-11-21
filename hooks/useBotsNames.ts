import { useEffect, useState } from 'react';
import { resolveUserID } from '../utils';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Alert, LocationCredential } from '../types';
import { addAlert } from '../redux/alertsSlice';

export const useBotsNames = () => {
  const dispatch = useAppDispatch();

  const { botsNames } = useAppSelector(state => state.admin);

  const [isLoading, setIsLoading] = useState(true);
  const [botsAvailable, setBotsAvailable] = useState(false);
  const [locationCredentials, setLocationCredentials] =
    useState<LocationCredential[]>();

  useEffect(() => {
    if (botsNames) {
      if (!!botsNames.length) {
        setBotsAvailable(true);
        const locations = botsNames.map((name: string) => resolveUserID(name));
        Promise.all(locations).then(credentials => {
          const alert: Alert = !!credentials.length
            ? {
                variant: 'success',
                text: 'Pobrano lokacje',
              }
            : {
                variant: 'error',
                text: 'Brak zapisanych lokacji',
              };
          dispatch(addAlert(alert));
          setLocationCredentials(credentials);
          setIsLoading(false);
        });
      } else {
        const alert: Alert = {
          variant: 'error',
          text: 'Brak podpiętych botów',
        };
        dispatch(addAlert(alert));
        setIsLoading(false);
      }
    }
  }, [botsNames]);

  const startRetrieving = () => {
    setIsLoading(true);
    setBotsAvailable(false);
    setLocationCredentials(undefined);
  };

  return { isLoading, botsAvailable, locationCredentials, startRetrieving };
};
