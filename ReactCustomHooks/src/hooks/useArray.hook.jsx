import { useState } from 'react';

const useArray = defaultValue => {
  const [array, setArray] = useState(defaultValue);

  const push = element => {
    setArray(a => [...a, element]);
  };

  const insert = (index, element) => {
    setArray(a => [...a.slice(0, index), element, ...a.slice(index)]);
  };

  const filter = callback => {
    setArray(a => {
      const filtered = a.filter(callback);
      return filtered.length !== a.length ? filtered : a;
    });
  };

  const update = (index, newElement) => {
    setArray(a =>
      index >= 0 && index < a.length
        ? [...a.slice(0, index), newElement, ...a.slice(index + 1)]
        : a
    );
  };

  const remove = index => {
    setArray(a =>
      index >= 0 && index < a.length
        ? [...a.slice(0, index), ...a.slice(index + 1)]
        : a
    );
  };

  const reverse = () => {
    setArray(a => [...a].reverse());
  };

  const clone = () => {
    return [...array];
  };

  const clear = () => {
    setArray([]);
  };

  return {
    array,
    set: setArray,
    push,
    insert,
    filter,
    update,
    remove,
    reverse,
    clone,
    clear
  };
};

export { useArray };
