import React from 'react';
import { startValidation, TCurFieldsValidationRules, TResultFieldsValidation } from '../lib/validation/startValidation';
import { valuesErrorCodes } from '../lib/valuesErrorCodes';

export type TDefaultFormData = { [key: string]: any };

interface IUseForm {
  defaultFormData: TDefaultFormData;
  formValidationRules: TCurFieldsValidationRules;
  callbackSuccessValidation: () => void;
}

const useForm = <T>({ defaultFormData, formValidationRules, callbackSuccessValidation }: IUseForm) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formErrors, setFormErrors] = React.useState<TResultFieldsValidation>({});

  const onSubmit = React.useCallback(async (data: T) => {
    setFormErrors({});

    const resultValidation = startValidation(
      {
        ...defaultFormData,
        ...data,
      },
      formValidationRules,
    );

    if (Object.keys(resultValidation).length > 0) {
      setFormErrors(resultValidation);
      return;
    }

    await callbackSuccessValidation();
  }, []);

  const getFieldErrorText = React.useCallback((errorCode: string) => {
    return valuesErrorCodes[errorCode];
  }, []);

  return {
    loading,
    setLoading,
    formErrors,
    onSubmit,
    getFieldErrorText,
  };
};

export { useForm };
