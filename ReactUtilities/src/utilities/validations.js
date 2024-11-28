export const getValidationError = (value, validation) => {
  if (validation.required && !value) {
    return { type: 'required', message: 'Este campo es requerido.' };
  }

  return null;
};
