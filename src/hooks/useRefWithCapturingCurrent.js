import { useEffect, useRef } from 'react'

export function useRefWithCapturingCurrent(element){
  const ref = useRef(element);

  // element の現在値を捕捉
  useEffect(() => {
    ref.current = element
  },[element])

  return ref
}