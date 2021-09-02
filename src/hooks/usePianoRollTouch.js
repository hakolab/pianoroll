import { useCallback } from 'react'
import { useEventListener } from "./useEventListener";

export function usePianoRollTouch(touchMode, scrollMode, callbacks){

  const handleTouchStart = useCallback((event) => {
    // タッチモードオフのときは return
    if (!touchMode) {
      return
    }
    //スクロールモードオンのときは return
    if (scrollMode) {
      return
    }

    callbacks.start(event);
  }, [touchMode, scrollMode, callbacks])

  const handleTouchEnd = useCallback(() => {
    // タッチモードオフのときは return
    if (!touchMode) {
      return
    }
    //スクロールモードオンのときは return
    if (scrollMode) {
      return
    }

    callbacks.end();
  }, [touchMode, scrollMode, callbacks])

  const handleTouchMove = useCallback((event) => {
    // タッチモードオフのときは return
    if (!touchMode) {
      return
    }
    //スクロールモードオンのときは return
    if (scrollMode) {
      return
    }

    callbacks.move(event);
  }, [touchMode, scrollMode, callbacks])

  useEventListener("touchstart", handleTouchStart, document, { passive: false });
  useEventListener("touchend", handleTouchEnd, document, { passive: false });
  useEventListener("touchmove", handleTouchMove, document, { passive: false });
}