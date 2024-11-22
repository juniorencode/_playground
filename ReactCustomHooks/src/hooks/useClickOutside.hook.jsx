import { useRef } from 'react';
import { useEventListener } from './useEventListener.hook';

const useClickOutside = func => {
  const refs = useRef([]);

  const handler = event => {
    if (refs.current.every(ref => ref && !ref.contains(event.target))) func();
  };

  useEventListener('mousedown', handler, document);

  const register = domNode => {
    if (domNode && !refs.current.includes(domNode)) {
      refs.current.push(domNode);
    }
    return domNode;
  };

  return { register };
};

export { useClickOutside };
