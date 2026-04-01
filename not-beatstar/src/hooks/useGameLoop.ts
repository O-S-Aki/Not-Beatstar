import { useEffect, useRef } from "react";

export default function useGameLoop(update: () => void) {
  const callbackRef = useRef(update);
  
    useEffect(() => {
      callbackRef.current = update;
    });

  useEffect(() => {
    let frame: number;

    const loop = () => {
      update();
      frame = requestAnimationFrame(loop);
    }

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [update])
}