import { useEffect, useRef } from 'react'

export const useTouchToMouse = (children) => {
    const ref = useRef(null)

    useEffect(() => {
        console.log(ref)
        const target = children
                            ? ref.current.children[0]
                            : ref.current

        const touchStartToMouseDown = (e) => {

            const touchMoveToMouseMove = (e) => {
                e.clientX = e.changedTouches[0].clientX
                e.clientY = e.changedTouches[0].clientY

                document.dispatchEvent(new MouseEvent('mousemove', e))
            }
        
            const touchEndToMouseUp = (e) => {
                document.dispatchEvent(new MouseEvent('mouseup', e))
                document.removeEventListener('touchmove', touchMoveToMouseMove, {passive: true})
                document.removeEventListener('touchend', touchEndToMouseUp, {passive: false})
                // Suppresses mouse events that fire after tapping.
                e.preventDefault()
            }
    
            document.addEventListener('touchmove', touchMoveToMouseMove, {passive: true})
            document.addEventListener('touchend', touchEndToMouseUp, {passive: false})

            e.clientX = e.changedTouches[0].clientX
            e.clientY = e.changedTouches[0].clientY

            target.dispatchEvent(new MouseEvent('mousedown', e))

        }

        target.addEventListener('touchstart', touchStartToMouseDown, {passive: true})
        

        return () => {
            target.removeEventListener('touchstart', touchStartToMouseDown, {passive: true})
        }
    },[])
    
    return ref
}