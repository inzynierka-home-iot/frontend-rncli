import { useCallback, useState } from 'react';

export const useSelectIndex = (
  defaultValue = 0,
): [number, (value: number) => void] => {
  const [selectIndex, setSelectIndex] = useState(defaultValue);

  const onChange = useCallback(
    (value: number) => setSelectIndex(value),
    [setSelectIndex],
  );

  return [selectIndex, onChange];
};
