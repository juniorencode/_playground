export const getValidationError = (value, validation) => {
  if (validation.required && !value) {
    return { type: 'required', message: 'Este campo es requerido.' };
  }

  if (value && typeof value === 'number') {
    if (validation.minValue && value < validation.minValue) {
      return {
        type: 'minValue',
        message: `El número debe ser mayor o igual a ${validation.minValue}.`
      };
    }
    if (validation.maxValue && value > validation.maxValue) {
      return {
        type: 'maxValue',
        message: `El número debe ser menor o igual a ${validation.maxValue}.`
      };
    }
  }

  return null;
};
