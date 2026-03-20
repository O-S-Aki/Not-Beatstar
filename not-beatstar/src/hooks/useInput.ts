import { useEffect } from 'react';

export function useInput(onLanePress: (lane: number) => void) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      if (event.key === "a") {
        onLanePress(0);
      }

      if (event.key == "s") {
        onLanePress(1);
      }

      if (event.key == "d") {
        onLanePress(2);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [onLanePress])
}