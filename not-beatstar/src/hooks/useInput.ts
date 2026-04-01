import { useEffect, useRef } from 'react';

export default function useInput(onKeyPress: (lane: number) => void) {
  const callbackRef = useRef(onKeyPress);

  useEffect(() => {
    callbackRef.current = onKeyPress;
  });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key: string = event.key.toUpperCase();
      const laneMap: Record<string, number>  = {
        "A": 0,
        "S": 1,
        "D": 2
      };

      if (key in laneMap) {
        onKeyPress(laneMap[key]);
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [onKeyPress])
}