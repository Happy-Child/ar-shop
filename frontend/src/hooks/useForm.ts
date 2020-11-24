import React from 'react';
import { startValidation, TCurFieldsValidationRules, TResultFieldsValidation } from '../lib/validation/startValidation';
import { errorsCodesValues } from '../lib/errors/errorsCodesValues';

export type TDefaultFormData = { [key: string]: any };

interface IUseForm {
  defaultFormData: TDefaultFormData;
  formValidationRules: TCurFieldsValidationRules;
  callbackSuccessValidation: (formData: object) => void;
}

const useForm = ({ defaultFormData, formValidationRules, callbackSuccessValidation }: IUseForm) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formErrors, setFormErrors] = React.useState<TResultFieldsValidation>({});

  const onSubmit = React.useCallback((formData) => {
    setFormErrors({});

    const resultValidation = startValidation(
      {
        ...defaultFormData,
        ...formData,
      },
      formValidationRules,
    );

    if (Object.keys(resultValidation).length > 0) {
      setFormErrors(resultValidation);
      return;
    }

    callbackSuccessValidation(formData);
  }, []);

  const getFieldErrorText = React.useCallback((errorCode: string) => {
    return errorsCodesValues[errorCode] || errorsCodesValues.DEFAULT_FIELD_INVALID;
  }, []);

  return {
    loading,
    setLoading,
    formErrors,
    setFormErrors,
    onSubmit,
    getFieldErrorText,
  };
};

export { useForm };
