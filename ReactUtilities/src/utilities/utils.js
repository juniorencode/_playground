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

const isDate = value => {
  return isObject(value) && value instanceof Date && !isNaN(value);
};

const isEmpty = value => {
  return isObject(value) && Object.keys(value).length === 0;
};

const isEqual = (a, b) => {
  if (a === b) return true;

  if (!isObject(a) || !isObject(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !isEqual(a[key], b[key])) return false;
  }

  return true;
};

const deepClone = obj => {
  if (!isObject(obj)) return obj;

  const clone = isArray(obj) ? [] : {};

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
    }
  }

  return clone;
};

const deepMerge = (target, source) => {
  if (!isObject(target) || !isObject(source)) return target;

  for (const key in source) {
    if (isObject(source[key]) && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }

  Object.assign(target, source);
  return target;
};

export {
  isDefined,
  typeOf,
  isNumber,
  isString,
  isBoolean,
  isFunction,
  isArray,
  isObject,
  isDate,
  isEmpty,
  isEqual,
  deepClone,
  deepMerge
};
