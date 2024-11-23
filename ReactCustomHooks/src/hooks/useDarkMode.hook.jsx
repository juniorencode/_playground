import { useEffect } from 'react';
import { useLocalStorage } from './useStorage.hook';
import { useMediaQuery } from './useMediaQuery.hook';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useLocalStorage('useDarkMode');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const enabled = darkMode ?? prefersDarkMode;

  useEffect(() => {
    document.body.classList.toggle('dark-mode', enabled);
  }, [enabled]);

  return [enabled, setDarkMode];
};

export { useDarkMode };
