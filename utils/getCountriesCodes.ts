import { mtproto } from './mtprotoClient';

export type CountryDiallingCode = {
  name: string;
  diallingCode: string;
};

export const getCountriesCodes = async () => {
  const res = await mtproto.call('help.getCountriesList');
  const countryDiallingCodes: CountryDiallingCode[] = res.countries.map(
    (element: any) => {
      return {
        name: element.default_name,
        diallingCode: element.country_codes[0].country_code,
      };
    },
  );
  const polandIndex = countryDiallingCodes.findIndex((country: any) => {
    return country.name == 'Poland';
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
