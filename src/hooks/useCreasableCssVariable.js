import { useCssVariable } from './useCssVariable';

// cSpell: ignore Creasable
// crease: 増加する、成長する
// crease + able で「増減可能」という意味で用いる
export function useCreasableCssVariable(propertyName, defaultValue, min = 2, max = 10){
  const [cssVariable, setCssVariable] = useCssVariable(propertyName, defaultValue);

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