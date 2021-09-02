import { useCallback } from 'react'
import { useEventListener } from "./useEventListener";

export function usePianoRollMouse(touchMode, scrollMode, callbacks){

  const handleMouseDown = useCallback((event) => {
    // タッチモードオンのときは return
    if (touchMode) {
      return
    }
    //スクロールモードオンのときは return
    if (scrollMode) {
      return
    }

    callbacks.start(event);
  }, [touchMode, scrollMode, callbacks])

  const handleMouseUp = useCallback(() => {
    // タッチモードオンのときは return
    if (touchMode) {
      return
    }
    //スクロールモードオンのときは return
    if (scrollMode) {
      return
    }

    callbacks.end();
  }, [touchMode, scrollMode, callbacks])

  const handleMouseMove = useCallback((event) => {
    // タッチモードオンのときは return
    if (touchMode) {
      return
    }
    //スクロールモードオンのときは return
    if (scrollMode) {
      return
    }
    if (event.buttons !== 1) {
      return;
    }
    
    callbacks.move(event);
  }, [touchMode, scrollMode, callbacks])

  useEventListener("mousedown", handleMouseDown, document, { passive: false });
  useEventListener("mouseup", handleMouseUp, document, { passive: false });
  useEventListener("mousemove", handleMouseMove, document, { passive: false });
}