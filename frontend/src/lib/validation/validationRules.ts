export type TValidationRulesItem = {
  run: (value: string, ...params: any) => boolean;
  errorCode: string;
};
export type TValidationRules = { [key: string]: TValidationRulesItem };

const regExp = {
  required: /\S+/,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
};

export const validationRules: TValidationRules = {
  required: {
    run: (value: string) => regExp.required.test(value.toLowerCase()),
    errorCode: 'E_FIELD_REQUIRED',
  },
  email: {
    run: (value: string) => regExp.email.test(value.toLowerCase()),
    errorCode: 'E_EMAIL_INVALID',
  },
  password: {
    run: (value: string) => regExp.password.test(value.toLowerCase()),
    errorCode: 'E_PASSWORD_INVALID',
  },
  range: {
    run: (value: string, a: string, b: string) => value.length >= Number(a) && value.length <= Number(b),
    errorCode: 'E_RANGE_INVALID',
  },
};
