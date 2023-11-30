import { useState } from "react"

export const useCheckboxValue = (defaultValue = false): [boolean, () => void] => {
  const [value, setValue] = useState(defaultValue);

  const onToggle = () => setValue(oldValue => !oldValue);

  return [value, onToggle]
}