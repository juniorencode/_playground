const isDefined = value => {
  return value !== undefined && value !== null;
};

const typeOf = (value, type) => {
  return isDefined(value) && typeof value === type;
};

export { isDefined, typeOf };
