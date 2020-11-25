import React, { ReactNode } from 'react';
import TDefault from '../../ui/templates/TDefault';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import { TCurFieldsValidationRules } from '../../lib/validation/startValidation';
import { usePageStyles } from '../../assets/styles/pages/login';
import { TDefaultFormData, useForm } from '../../hooks/useForm';
import { authAPI } from '../../services/api';
import { IRegistrationParams } from '../../services/api/auth';
import { TErrorResponse } from '../../services/api/types';
import { E_VALIDATION_FAILURE } from '../../lib/errors/errorsCodes';
import { convertValidationErrors } from '../../lib/dataConversion/convertValidationErrors';
import { errorsCodesValues } from '../../lib/errors/errorsCodesValues';
import { messagesCodesValues } from '../../lib/messages/messagesCodesValues';
import { SUCCESS_REGISTRATION } from '../../lib/messages/messagesCodes';
import { toastNotification } from '../../plugins/toast';
import { useRoute } from '../../hooks/useRoute';

const formValidationRules: TCurFieldsValidationRules = {
  name: {
    rules: ['required', 'range:2:40'],
  },
  email: {
    rules: ['required', 'email'],
  },
  password: {
    rules: ['required', 'range:8:20', 'password'],
  },
  password_confirmation: {
    rules: ['required', 'range:8:20', 'password'],
  },
};

const defaultFormData: TDefaultFormData = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const PRegistration: React.FC<ReactNode> = () => {
  const classes = usePageStyles();
  const { pushRoute } = useRoute();

  const { onSubmit, setLoading, loading, formErrors, setFormErrors, getFieldErrorText } = useForm({
    formValidationRules,
    defaultFormData,
    callbackSuccessValidation: (formData: object) => handleSubmitForm(formData),
  });

  const successHandling = () => {
    toastNotification('success', messagesCodesValues[SUCCESS_REGISTRATION]);
    pushRoute('/login');
  };

  const errorHandling = (e: TErrorResponse) => {
    if (e.error.code === E_VALIDATION_FAILURE) {
      setFormErrors(convertValidationErrors(e.error.data));
    } else {
      toastNotification('error', errorsCodesValues[e.error.code]);
    }
  };

  function handleSubmitForm(formData: object): void {
    setLoading(true);
    authAPI
      .registration(formData as IRegistrationParams)
      .then((response) => {
        if (response?.error) errorHandling(response);
        else if (response.status === 200) {
          successHandling();
        }
      })
      .catch(errorHandling)
      .finally(() => setLoading(false));
  }

  return (
    <TDefault>
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.title}>
          Registration
        </Typography>

        <Form
          onSubmit={onSubmit}
          initialValues={defaultFormData}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                className={classes.formItem}
                label="Name"
                name="name"
                placeholder="Alex"
                error={formErrors?.name?.length > 0}
                helperText={formErrors?.name && getFieldErrorText(formErrors?.name[0])}
                disabled={loading}
              />
              <TextField
                className={classes.formItem}
                label="Email"
                name="email"
                placeholder="example@gmail.com"
                error={formErrors?.email?.length > 0}
                helperText={formErrors?.email && getFieldErrorText(formErrors?.email[0])}
                disabled={loading}
              />
              <TextField
                className={classes.formItem}
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                error={formErrors?.password?.length > 0}
                helperText={formErrors?.password && getFieldErrorText(formErrors?.password[0])}
                disabled={loading}
              />
              <TextField
                className={classes.formItem}
                label="Password confirmation"
                name="password_confirmation"
                type="password"
                placeholder="********"
                error={formErrors?.password_confirmation?.length > 0}
                helperText={
                  formErrors?.password_confirmation && getFieldErrorText(formErrors?.password_confirmation[0])
                }
                disabled={loading}
              />
              <Button type="submit" fullWidth variant="contained" color="secondary" disabled={loading}>
                Submit
              </Button>
            </form>
          )}
        />
      </Container>
    </TDefault>
  );
};

export default PRegistration;
