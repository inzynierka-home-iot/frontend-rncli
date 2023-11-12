export const getNumericValue = (
  parsingFunc: (number: string) => number,
  number: string,
) => parsingFunc(number).toString();
