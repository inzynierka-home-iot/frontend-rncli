import { mtproto } from './mtprotoClient';

export type CountryDiallingCode = {
  display: string;
  value: string;
};

export const getCountriesCodes = async () => {
  const res = await mtproto.call('help.getCountriesList');
  const countryDiallingCodes: CountryDiallingCode[] = res.countries.map(
    (element: any) => {
      return {
        display: element.default_name,
        value: element.country_codes[0].country_code,
      };
    },
  );
  const polandIndex = countryDiallingCodes.findIndex((country: any) => {
    return country.display == 'Poland';
  });
  if (polandIndex != -1) {
    moveElementToBeginning(countryDiallingCodes, polandIndex);
  }
  return countryDiallingCodes;
};

const moveElementToBeginning = (
  array: CountryDiallingCode[],
  index: number,
) => {
  const element = array[index];
  array.splice(index, 1);
  array.splice(0, 0, element);
};
