import { useState, useCallback, useRef, useEffect } from 'react';

const getValidationError = (value, validation) => {
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
    if (validation.isEmail && !validateEmail(value)) {
      return {
        type: 'isEmail',
        message: 'Por favor ingrese un correo electrónico válido.'
      };
    }
  }
  return null;
};

const validateEmail = email => {
  const [localPart, domainPart] = email.split('@');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) return false;
  if (localPart.length > 64 || domainPart.length > 255) return false;

  return true;
};

const formatOutput = (value, output) => {
  switch (output) {
    case 'STRING':
      return typeof value === 'number' ? value.toString() : value;
    case 'NUMBER':
      return typeof value === 'string' ? parseFloat(value) : value;
    case 'BOOLEAN':
      return value === 'true' || value === 1;
    default:
      return value;
  }
};

const useForm = (initialForm = {}) => {
  const [formData, setFormData] = useState(initialForm);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({});
  const fieldsValidation = useRef({});
  const fieldsOutput = useRef({});
  const onSubmit = useRef(null);

  useEffect(() => {});

  const register = useCallback(
    (name, validations = {}, output) => {
      if (!fieldsValidation.current[name])
        fieldsValidation.current[name] = validations;
      if (!fieldsOutput.current[name] && output)
        fieldsOutput.current[name] = output;

      return {
        errors: errors,
        value: formData[name],
        handleChange: value => setFormData(prev => ({ ...prev, [name]: value }))
      };
    },
    [errors, formData]
  );

  const isInvalidValue = value => {
    if (value === null || value === undefined || value === '') {
      return true;
    }
    if (Array.isArray(value)) {
      return value.every(isInvalidValue);
    }
    return false;
  };

  const deepFilter = obj => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(deepFilter).filter(item => !isInvalidValue(item));
    }

    return Object.entries(obj)
      .filter(([, value]) => !isInvalidValue(value))
      .reduce((acc, [key, value]) => {
        acc[key] = deepFilter(value);
        return acc;
      }, {});
  };

  const reset = useCallback(() => {
    setFormData(initialForm);
  }, [initialForm]);

  const setForm = useCallback(data => {
    setFormData(deepFilter(data));
    //eslint-disable-next-line
  }, []);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      e.stopPropagation();

      const validationResult = validateFields(formData);
      if (validationResult.haveErrors) return;
      if (!onSubmit.current) return;

      const formattedData = formatFormData(validationResult.data);
      setPending(true);

      try {
        await onSubmit.current(formattedData);
      } finally {
        setPending(false);
      }
    },
    // eslint-disable-next-line
    [formData]
  );

  const formatFormData = useCallback(data => {
    const formattedData = { ...data };
    Object.keys(fieldsOutput.current).forEach(name => {
      if (fieldsOutput.current[name]) {
        formattedData[name] = formatOutput(
          data[name],
          fieldsOutput.current[name]
        );
      }
    });
    return formattedData;
  }, []);

  const validateFields = useCallback(data => {
    let haveErrors = false;
    const errors = {};

    Object.keys(fieldsValidation.current).forEach(name => {
      const validation = fieldsValidation.current[name];
      const value = data[name];

      const error = getValidationError(value, validation);
      if (error) {
        haveErrors = true;
        errors[name] = error;
      }
    });

    setErrors(errors);
    return { haveErrors, data };
  }, []);

  const handleAssistant = useCallback(
    async e => e.key === 'Enter' && (await handleSubmit(e)),
    [handleSubmit]
  );

  const registerSubmit = useCallback(func => {
    onSubmit.current = func;
  }, []);

  return {
    register,
    registerSubmit,
    handleSubmit,
    handleAssistant,
    reset,
    setForm,
    setFormData,
    pending: pending,
    watch: formData,
    errors: errors
  };
};

export { useForm };
