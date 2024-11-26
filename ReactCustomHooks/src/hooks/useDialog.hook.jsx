import { useState, useCallback } from 'react';
import { useClickOutside } from './useClickOutside.hook';

const useDialog = (initialVisibility = false) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);
  const domRef = useClickOutside(() => setIsVisible(false));

  const showDialog = useCallback(() => setIsVisible(true), []);
  const hideDialog = useCallback(() => setIsVisible(false), []);
  const toggleDialog = useCallback(() => setIsVisible(prev => !prev), []);

  const register = { domRef, isVisible, hideDialog };

  return { register, isVisible, showDialog, hideDialog, toggleDialog };
};

export { useDialog };
