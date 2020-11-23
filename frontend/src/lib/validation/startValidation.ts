import { validationRules, TValidationRulesItem } from './validationRules';

export type TValidationFields = { [key: string]: string };
export type TCurFieldsValidationRules = { [key: string]: { rules: string[] } };
export type TResultFieldsValidation = { [key: string]: string[] };

export const startValidation = (
  fields: TValidationFields,
  curFieldsValidationRules: TCurFieldsValidationRules,
): TResultFieldsValidation => {
  const resultValidation: TResultFieldsValidation = {};

  try {
    const fieldsNames: string[] = Object.keys(fields);

    fieldsNames.forEach((fieldName) => {
      const curFieldValidationRules = curFieldsValidationRules[fieldName].rules;

      curFieldValidationRules.forEach((targetRule) => {
        const targetRuleSplit = targetRule.split(':');
        const targetRuleName = targetRuleSplit[0];
        const targetRuleParams = targetRuleSplit.splice(1);

        const rule: TValidationRulesItem = validationRules[targetRuleName];
        const fieldValue = fields[fieldName].toLowerCase();

        const isFieldValid = rule.run(fieldValue, ...targetRuleParams);

        if (isFieldValid) return;

        if (Array.isArray(resultValidation[fieldName])) {
          resultValidation[fieldName].push(rule.errorCode);
        } else {
          resultValidation[fieldName] = [];
          resultValidation[fieldName].push(rule.errorCode);
        }
      });
    });

    return resultValidation;
  } catch (e) {
    console.log(e);
    return resultValidation;
  }
};
