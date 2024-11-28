import { useEffect, useState } from 'react';

const useOnScreen = (ref, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (ref.current == null) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => {
      if (ref.current == null) return;
      // eslint-disable-next-line
      observer.unobserve(ref.current);
    };
    // eslint-disable-next-line
  }, [ref.current, rootMargin]);

  return isVisible;
};

export { useOnScreen };