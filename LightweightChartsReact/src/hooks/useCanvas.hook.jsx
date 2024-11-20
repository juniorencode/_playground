import { useRef, useCallback } from 'react';

const useCanvas = () => {
  const canvasRef = useRef(null);

  const draw = useCallback(callback => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      callback(ctx);
    }
  }, []);

  return [canvasRef, draw];
};

export { useCanvas };
