import { useState, useEffect, useCallback } from 'react'

export function useCssVariable(propertyName, defaultValue, min = 2, max = 10){
  const [cssVariable, setCssVariable] = useState(defaultValue);

  const increment = useCallback(() => {
    setCssVariable(prevValue => {
      if (prevValue < max) {
        return prevValue + 1
      }
      return prevValue
    })
  }, [max])

  const decrement = useCallback(() => {
    setCssVariable(prevValue => {
      if (prevValue > min) {
        return prevValue - 1
      }
      return prevValue
    })
  }, [min])

  const set = useCallback((newValue) => {
    setCssVariable(newValue)
  }, [])

  const isMin = useCallback(() => {
    return cssVariable === min
  }, [cssVariable, min])

  const isMax = useCallback(() => {
    return cssVariable === max   
  }, [cssVariable, max])
  
  useEffect(() => {
    document.documentElement.style.setProperty(propertyName, cssVariable);
  },[propertyName, cssVariable])

  return [cssVariable, { increment, decrement, set, isMin, isMax }]
}