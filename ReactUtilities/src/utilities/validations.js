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

  if (value && Array.isArray(value)) {
    if (validation.maxElem && value.length > validation.maxElem) {
      return {
        type: 'maxElem',
        message: `El valor debe tener máximo ${validation.maxElem} elementos.`
      };
    }
  }

  if (value && typeof value === 'string') {
    if (validation.minLength && value.length < validation.minLength) {
      return {
        type: 'minLength',
        message: `El valor debe tener mínimo ${validation.minLength} caracteres.`
      };
    }
    if (validation.maxLength && value.length > validation.maxLength) {
      return {
        type: 'maxLength',
        message: `El valor debe tener máximo ${validation.maxLength} caracteres.`
      };
    }
  }

  return null;
};
