import { useToggle } from "./useToggle";

export function useDialogState(defaultIsOpen){
  const [isOpen, toggleDispatcher] = useToggle(defaultIsOpen);

  const open = () => {
    toggleDispatcher.set(true);
  }

  const close = () => {
    toggleDispatcher.set(false);
  }

  return [isOpen, {open, close}]
}