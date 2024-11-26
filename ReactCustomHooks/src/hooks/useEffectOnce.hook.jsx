import { useEffect } from 'react';

const useEffectOnce = cb => {
  // eslint-disable-next-line
  useEffect(cb, []);
};

export { useEffectOnce };
