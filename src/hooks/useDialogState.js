import { useCallback } from "react";
import { useToggle } from "./useToggle";

export function useDialogState(defaultIsOpen){
  const [isOpen, toggleIsOpen] = useToggle(defaultIsOpen);

  const open = useCallback(() => {
    toggleIsOpen(true);
  }, [toggleIsOpen])

  const close = useCallback(() => {
    toggleIsOpen(false);
  }, [toggleIsOpen])

  return [isOpen, {open, close}]
}