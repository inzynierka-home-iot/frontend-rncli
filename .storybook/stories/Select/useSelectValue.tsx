import { useCallback, useState } from "react"

export const useSelectValue = (defaultValue = 0): [number, (value: number) => void] => {
  const [selectValue, setSelectValue] = useState(defaultValue)

  const onChange = useCallback((value: number) => setSelectValue(value), [setSelectValue])

  return [selectValue, onChange]
}