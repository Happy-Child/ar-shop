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

  const { onSubmit, setLoading, loading, formErrors, getFieldErrorText } = useForm({
    formValidationRules,
    defaultFormData,
    callbackSuccessValidation: handleSubmitForm,
  });

  function handleSubmitForm() {
    try {
      setLoading(true);
      alert('Login');
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
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

export default PLogin;
