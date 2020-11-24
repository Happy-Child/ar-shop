import { TResultFieldsValidation } from '../validation/startValidation';

type TErrorsData = { rule: string; field: string; message: string }[];

export const convertValidationErrors = (errorsData: TErrorsData): TResultFieldsValidation => {
  const result: TResultFieldsValidation = {};

  errorsData.forEach((error) => {
    if (Array.isArray(result[error.field])) {
      result[error.field].push(error.rule);
    } else {
      result[error.field] = [];
      result[error.field].push(error.rule);
    }
  });

  return result;
};
