import { useState } from 'react'

export function useToggle(bool){
  const [state, setState] = useState(bool);

  const toggle = () => {
    setState(prev => !prev);
  }

  const set = (bool) => {
    setState(bool);
  }

  return [state, { toggle, set }]
}