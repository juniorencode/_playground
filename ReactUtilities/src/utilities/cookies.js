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

export { get, set, remove };
