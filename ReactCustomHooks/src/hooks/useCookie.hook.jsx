import { useState, useCallback } from 'react';

const get = name => {
  if (typeof document === 'undefined' || !name) return;

  const cookies = document.cookie ? document.cookie.split('; ') : [];

  const jar = cookies.reduce((acc, cookie) => {
    const [key, ...valueParts] = cookie.split('=');
    const value = valueParts
      .join('=')
      .replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    acc[decodeURIComponent(key)] =
      value[0] === '"' ? value.slice(1, -1) : value;
    return acc;
  }, {});

  return name ? jar[name] : jar;
};

const set = (name, value, attributes) => {
  if (typeof document === 'undefined') return;

  attributes = { path: '/', ...attributes };

  if (typeof attributes.expires === 'number') {
    attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
  }
  if (attributes.expires) {
    attributes.expires = attributes.expires.toUTCString();
  }

  const encodedName = encodeURIComponent(name).replace(
    /%(2[346B]|5E|60|7C)/g,
    decodeURIComponent
  );
  const encodedValue = encodeURIComponent(value).replace(
    /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
    decodeURIComponent
  );

  const stringifiedAttributes = Object.entries(attributes)
    .filter(([, val]) => val != null)
    .map(([key, val]) => (val === true ? key : `${key}=${val}`))
    .join('; ');

  document.cookie = `${encodedName}=${encodedValue}; ${stringifiedAttributes}`;
};

const remove = (name, attributes) => {
  if (!get(name)) return;
  set(name, '', { ...attributes, expires: -1 });
};

const useCookie = (name, defaultValue) => {
  const [value, setValue] = useState(() => {
    const cookie = get(name);
    if (cookie) return cookie;
    set(name, defaultValue);
    return defaultValue;
  });

  const updateCookie = useCallback(
    (newValue, options) => {
      set(name, newValue, options);
      setValue(newValue);
    },
    [name]
  );

  const deleteCookie = useCallback(() => {
    remove(name);
    setValue(null);
  }, [name]);

  return [value, updateCookie, deleteCookie];
};

export { useCookie };
