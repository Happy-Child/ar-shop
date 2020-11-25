import React, { ReactNode } from 'react';
import TDefault from '../../ui/templates/TDefault';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import { TCurFieldsValidationRules, TValidationFields } from '../../lib/validation/startValidation';
import { usePageStyles } from '../../assets/styles/pages/login';
import { useForm } from '../../hooks/useForm';
import { toastNotification } from '../../plugins/toast';
import { messagesCodesValues } from '../../lib/messages/messagesCodesValues';
import { SUCCESS_LOGIN } from '../../lib/messages/messagesCodes';
import { TErrorResponse } from '../../services/api/types';
import { E_VALIDATION_FAILURE } from '../../lib/errors/errorsCodes';
import { convertValidationErrors } from '../../lib/dataConversion/convertValidationErrors';
import { errorsCodesValues } from '../../lib/errors/errorsCodesValues';
import { TResponseLogin } from '../../services/api/auth/types';
import { useDispatch, useSelector } from 'react-redux';
import { actionLoginUser } from '../../lib/store/auth/actions';
import { AppState } from '../../lib/store/types';
import { selectorAuthUserLoading } from '../../lib/store/auth/selectors';

interface ILoginForm extends TValidationFields {
  email: string;
  password: string;
}

const formValidationRules: TCurFieldsValidationRules = {
  email: {
    rules: ['required', 'email'],
  },
  password: {
    rules: ['required', 'range:8:20', 'password'],
  },
};

const defaultFormData = {
  email: '',
  password: '',
};

const PLogin: React.FC<ReactNode> = () => {
  const classes = usePageStyles();
  const dispatch = useDispatch();
  const authUserLoading = useSelector<AppState, boolean>(selectorAuthUserLoading);

  const { onSubmit, formErrors, setFormErrors, getFieldErrorText } = useForm({
    formValidationRules,
    defaultFormData,
    callbackSuccessValidation: handleSubmitForm,
  });

  const successHandling = ({ data }: TResponseLogin) => {
    toastNotification('success', messagesCodesValues[SUCCESS_LOGIN]);
    console.log(data);
  };

  const errorHandling = (e: TErrorResponse) => {
    if (e.error.code === E_VALIDATION_FAILURE) {
      setFormErrors(convertValidationErrors(e.error.data));
    } else {
      toastNotification('error', errorsCodesValues[e.error.code]);
    }
  };

  function handleSubmitForm(formData: object): void {
    dispatch(actionLoginUser(formData as ILoginForm));
    // authAPI
    //   .login(formData as ILoginForm)
    //   .then((response) => {
    //     if (response?.error) errorHandling(response);
    //     else if (response.status === 200) {
    //       successHandling(response);
    //     }
    //   })
    //   .catch(errorHandling)
    //   .finally(() => setLoading(false));
  }

  return (
    <TDefault>
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.title}>
          Login
        </Typography>

        <Form
          onSubmit={onSubmit}
          initialValues={defaultFormData}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                className={classes.formItem}
                label="Email"
                name="email"
                placeholder="example@gmail.com"
                error={formErrors?.email?.length > 0}
                helperText={formErrors?.email && getFieldErrorText(formErrors?.email[0])}
                disabled={authUserLoading}
              />
              <TextField
                className={classes.formItem}
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                error={formErrors?.password?.length > 0}
                helperText={formErrors?.password && getFieldErrorText(formErrors?.password[0])}
                disabled={authUserLoading}
              />
              <Button type="submit" fullWidth variant="contained" color="secondary" disabled={authUserLoading}>
                Submit
              </Button>
            </form>
          )}
        />
      </Container>
    </TDefault>
  );
};

export default PLogin;
