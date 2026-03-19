import { useEffect } from "react";

export function useGameLoop(updateGame: () => void) {
  useEffect(() => {
    let frame: number;

    const loop = () => {
      updateGame();
      frame = requestAnimationFrame(loop);
    }

    loop();

    return () => cancelAnimationFrame(frame);
  }, [])
}