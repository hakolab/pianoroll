import { useState, useEffect } from 'react'

export function useCssVariable(propertyName, defaultValue, min = 2, max = 10){
  const [cssVariable, setCssVariable] = useState(defaultValue);

  const increment = () => {
    setCssVariable(prevValue => {
      if (prevValue < max) {
        return prevValue + 1
      }
      return prevValue
    })
  }

  const decrement = () => {
    setCssVariable(prevValue => {
      if (prevValue > min) {
        return prevValue - 1
      }
      return prevValue
    })
  }

  const set = (newValue) => {
    setCssVariable(newValue)
  }

  const isMin = () => {
    return cssVariable === min
  }

  const isMax = () => {
    return cssVariable === max   
  }
  
  useEffect(() => {
    document.documentElement.style.setProperty(propertyName, cssVariable);
  },[propertyName, cssVariable])

  /* const cssVariableDispatcher = () => ({
    increment,
    decrement,
    set,
    isMin,
    isMax
  }) */

  return [
    cssVariable, 
    {
      increment,
      decrement,
      set,
      isMin,
      isMax
    }
  ]
}