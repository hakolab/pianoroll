import { useCallback, useState } from 'react'

export function useToggle(bool){
  const [state, setState] = useState(bool);

  const toggle = useCallback((bool = undefined) => {
    if (bool === undefined) {
      setState(prev => !prev);
    } else {
      setState(bool);
    }
  }, [])

  return [state, toggle]
}