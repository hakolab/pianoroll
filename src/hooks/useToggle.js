import { useState } from 'react'

export function useToggle(bool){
  const [state, setState] = useState(bool);

  const toggle = (bool = undefined) => {
    console.log(bool)
    if (bool === undefined) {
      setState(prev => !prev);
    } else {
      setState(bool);
    }
  }

  return [state, toggle]
}