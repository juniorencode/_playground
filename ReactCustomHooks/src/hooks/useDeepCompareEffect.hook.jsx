import { useEffect, useRef } from 'react';

function isEqual(value, other) {
  return (
    value === other ||
    (typeof value === 'object' &&
      typeof other === 'object' &&
      deepEqual(value, other))
  );
}

function deepEqual(a, b) {
  if (a === b) return true;

  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

const useDeepCompareEffect = (callback, dependencies) => {
  const currentDependenciesRef = useRef();

  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  // eslint-disable-next-line
  useEffect(callback, [currentDependenciesRef.current]);
};

export { useDeepCompareEffect };
