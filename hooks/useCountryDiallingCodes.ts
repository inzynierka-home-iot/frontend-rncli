import { useEffect, useState } from 'react';
import {
  CountryDiallingCode,
  getCountriesCodes,
} from '../utils/getCountriesCodes';

export const useCountryDiallingCodes = () => {
  const [countryDiallingCodes, setCountryDiallingCodes] = useState<
    CountryDiallingCode[]
  >([{ display: 'Poland', value: '48' }]);

  useEffect(() => {
    getCountriesCodes().then(countriesCodes => {
      setCountryDiallingCodes(countriesCodes);
    });
  }, []);

  return countryDiallingCodes;
};
