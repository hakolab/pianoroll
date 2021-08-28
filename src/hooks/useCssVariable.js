import { useState, useEffect } from 'react'

export function useCssVariable(propertyName, defaultValue){
  const [cssVariable, setCssVariable] = useState(defaultValue);
  
  useEffect(() => {
    document.documentElement.style.setProperty(propertyName, cssVariable);
  },[propertyName, cssVariable])

  return [
    cssVariable, 
    setCssVariable
  ]
}