import { useCallback, useEffect } from "react";
import { useDialogState } from "./useDialogState";
import { useToggle } from "./useToggle";

/* export  */function useConfirmDialogState(defaultIsOpen){
  const [isOpen, toggleIsOpen] = useDialogState(defaultIsOpen);
  const [isConfirmed, toggleIsConfirmed] = useToggle(false);

  const open = useCallback(() => {
    toggleIsOpen.open();
  }, [toggleIsOpen])

  const close = useCallback(() => {
    toggleIsOpen.close();
  }, [toggleIsOpen])

  const confirmed = useCallback(() => {
    toggleIsConfirmed(true);
  }, [toggleIsConfirmed])

  useEffect(() => {
    isConfirmed && close();
  }, [isConfirmed, close])

  return [{isOpen, isConfirmed}, {open, confirmed}]
}