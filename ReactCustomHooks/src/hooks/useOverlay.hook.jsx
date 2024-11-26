import { useState, useCallback } from 'react';
import { useClickOutside } from './useClickOutside.hook';

const useOverlay = (initialVisibility = false) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);
  const domRef = useClickOutside(() => setIsVisible(false));

  const showOverlay = useCallback(() => setIsVisible(true), []);
  const hideOverlay = useCallback(() => setIsVisible(false), []);
  const toggleOverlay = useCallback(() => setIsVisible(prev => !prev), []);

  const register = { domRef, isVisible, hideOverlay };

  return { register, isVisible, showOverlay, hideOverlay, toggleOverlay };
};

export { useOverlay };
