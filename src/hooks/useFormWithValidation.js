import { useState, useCallback } from 'react';
import isEmail from 'validator/es/lib/isEmail';

export const useFormWithValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      !isEmail(value)
        ? event.target.setCustomValidity('Некорректый адрес почты.')
        : event.target.setCustomValidity('')
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, errors, isValid, handleChange, resetForm };
}
