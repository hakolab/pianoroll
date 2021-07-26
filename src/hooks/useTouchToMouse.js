import { useEffect, useRef } from 'react'

export const useTouchToMouse = (children) => {
    const ref = useRef(null)

    useEffect(() => {
      console.log(ref.current)
        const target = children
                            ? ref.current.children[0]
                            : ref.current

        const touchStartToMouseDown = (event) => {

            const touchMoveToMouseMove = (event) => {
                event.clientX = event.changedTouches[0].clientX
                event.clientY = event.changedTouches[0].clientY

                document.dispatchEvent(new MouseEvent('mousemove', event))
            }
        
            const touchEndToMouseUp = (event) => {
                event.clientX = event.changedTouches[0].clientX
                event.clientY = event.changedTouches[0].clientY
                document.dispatchEvent(new MouseEvent('mouseup', event))

                document.removeEventListener('touchmove', touchMoveToMouseMove, {passive: true})
                document.removeEventListener('touchend', touchEndToMouseUp, {passive: false})
                // Suppresses mouse events that fire after tapping.
                event.preventDefault()
            }
    
            document.addEventListener('touchmove', touchMoveToMouseMove, {passive: true})
            document.addEventListener('touchend', touchEndToMouseUp, {passive: false})

            event.clientX = event.changedTouches[0].clientX
            event.clientY = event.changedTouches[0].clientY

            target.dispatchEvent(new MouseEvent('mousedown', event))

        }

        target.addEventListener('touchstart', touchStartToMouseDown, {passive: true})
        

        return () => {
            target.removeEventListener('touchstart', touchStartToMouseDown, {passive: true})
        }
    },[])
    
    return ref
}