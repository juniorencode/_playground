const isDefined = value => {
  return value !== undefined && value !== null;
};

const typeOf = (value, type) => {
  return isDefined(value) && typeof value === type;
};

const isNumber = value => {
  return typeOf(value, 'number');
};

const isString = value => {
  return typeOf(value, 'string');
};

const isBoolean = value => {
  return typeOf(value, 'boolean');
};

const isFunction = value => {
  return typeOf(value, 'function');
};

const isArray = value => {
  return Array.isArray(value);
};

const isObject = value => {
  return typeOf(value, 'object') && !isFunction(value) && !isArray(value);
};

export {
  isDefined,
  typeOf,
  isNumber,
  isString,
  isBoolean,
  isFunction,
  isArray,
  isObject
};
