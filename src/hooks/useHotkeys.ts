import { useEffect } from 'react';

type HotkeyMap = {
  [key: string]: () => void;
};

export function useHotkeys(hotkeys: HotkeyMap) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = hotkeys[event.key];
      if (handler) {
        event.preventDefault();
        handler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hotkeys]);
}