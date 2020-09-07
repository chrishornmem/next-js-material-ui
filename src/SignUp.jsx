// Render Prop
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
//import dynamic from 'next/dynamic';

import {
  Formik, Form, Field,
} from 'formik';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import clsx from 'clsx';
import Button from './Button';

const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    listStyle: 'none',
    margin: 0,
    paddingInlineStart: 0,
    padding: 0,
    position: 'relative',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  form: {
    width: '33%',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    margin: '0 auto',
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    fontSize: '1rem',
    backgroundColor: indigo['50'],
    transition: 'none',
    '&:hover': {
      backgroundColor: 'rgba(232, 234, 246, 0.9)',
    },
    '&:active': {
      backgroundColor: 'rgba(232, 234, 246, 0.9)',
    },
    '&:invalid': {
      border: `3px solid ${theme.palette.secondary.main}`
    },
    // width: '33%',
  },
  inputLabel: {
    fontSize: '1rem',
  },
  helperText: {
    color: theme.palette.secondary.main,
  },
});
const SignUp = React.forwardRef((props, ref) => {
  const {
    children,
    classes,
    className,
    component: Component = 'ul',
    dense = false,
    disablePadding = false,
    handleSubmit,
    ...other
  } = props;

  const [isVerifying, setIsVerifying] = React.useState(false);

  const requireFieldError = 'Required field';
  const GOOGLE_RECAPTCHA_SITEKEY = '6LcvTqkZAAAAAMLqsXYZffgomSTw88W-eQ3afbTT';
  const recaptchaRef = React.createRef();

  return (
    <div>
      <Formik
        initialValues={{ recaptchaResponse: '', recaptcha: '', email: '', firstName: '', lastName: '' }}
        initialErrors={{}}
        validate={async (values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = requireFieldError;
          } else if (!values.lastName) {
            errors.lastName = requireFieldError;
          } else if (!values.email) {
            errors.email = requireFieldError;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          } else if (!values.recaptchaResponse && !isVerifying) {
            setIsVerifying(true);
            try {
              await recaptchaRef.current.executeAsync();
            } catch (error) {
              console.error(error);
            }
            setIsVerifying(false);
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting, errors, dirty, isValid, setFieldValue,
        }) => (
          <Form className={clsx(classes.form)}>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              badge="bottomleft"
              sitekey={GOOGLE_RECAPTCHA_SITEKEY}
              onChange={async (response) => {
                setFieldValue('recaptchaResponse', response);
              }}
            />
            <Field
              type="text"
              name="firstName"
              autoComplete="given-name"
              as={TextField}
             // color="secondary"
              required
              helperText={errors.firstName}
              label="First name"
              id="first-name"
              margin="normal"
              variant="filled"
              InputLabelProps={{className: classes.inputLabel}}
              InputProps={{ className: classes.input }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={{ className: classes.input }}
              FormHelperTextProps={{className: classes.helperText}}
            />
            <Field
              type="text"
              name="lastName"
              autoComplete="family-name"
              as={TextField}
              required
              id="last-name"
              helperText={errors.lastName}
              label="Last name"
              margin="normal"
              variant="filled"
              InputLabelProps={{className: classes.inputLabel}}
              InputProps={{ className: classes.input }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={{ className: classes.input }}
              FormHelperTextProps={{className: classes.helperText}}
            />
            <Field
              type="email"
              name="email"
              autoComplete="email"
              as={TextField}
              required
              helperText={errors.email}
              id="email"
              label="Email"
              margin="normal"
              variant="filled"
              InputLabelProps={{className: classes.inputLabel}}
              InputProps={{ className: classes.input }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={{ className: classes.input }}
              FormHelperTextProps={{className: classes.helperText}}
             />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              type="submit"
              disabled={isSubmitting || isVerifying || (!dirty || !isValid)}
            >
              Subscribe
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default withStyles(styles, { name: 'SignUp' })(SignUp);
