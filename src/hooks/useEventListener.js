import { useEffect, useRef } from 'react'

/**
 * https://usehooks.com/useEventListener/
 * added 'option' param by hakodatetaro.
 */
export function useEventListener(eventName, handler, element = window, option = false) {
  // Create a ref that stores handler
  const savedHandler = useRef();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);
      // Add event listener
      element.addEventListener(eventName, eventListener, option);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener, option);
      };
    },
    [eventName, element, option] // Re-run if eventName or element changes
  );
}