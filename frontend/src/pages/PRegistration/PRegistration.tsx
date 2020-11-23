import React, { ReactNode } from 'react';
import TDefault from '../../ui/templates/TDefault';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import { TCurFieldsValidationRules, TValidationFields } from '../../lib/validation/startValidation';
import { usePageStyles } from '../../assets/styles/pages/login';
import { TDefaultFormData, useForm } from '../../hooks/useForm';

interface IRegistrationForm extends TValidationFields {
  name: string;
  email: string;
  password: string;
}

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
};

const defaultFormData: TDefaultFormData = {
  name: '',
  email: '',
  password: '',
};

const PRegistration: React.FC<ReactNode> = () => {
  const classes = usePageStyles();

  const { onSubmit, setLoading, loading, formErrors, getFieldErrorText } = useForm<IRegistrationForm>({
    formValidationRules,
    defaultFormData,
    callbackSuccessValidation: handleSubmitForm,
  });

  async function handleSubmitForm() {
    try {
      setLoading(true);
      await alert('Registration');
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

export default PRegistration;
