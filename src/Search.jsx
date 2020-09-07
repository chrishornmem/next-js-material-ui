// Render Prop
import React from 'react';

import {
  Formik, Form, Field,
} from 'formik';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 0,
    paddingInlineStart: 0,
    padding: 0,
    position: 'relative',
  },
  form: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(232, 234, 246, 1) !important',
    height: 49,
  },
  search: {
    backgroundColor: 'rgba(232, 234, 246, 1) !important',
    height: 51,
    flex: '80% 1 0',
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    flex: '20% 1 0',
    height: 51,
    // marginTop: 7,
  //  marginTop: theme.spacing(2),
  },
  input: {
    // paddingTop: 0,
    // paddingBottom: 7,
    fontSize: '1rem',
    //  backgroundColor: 'rgba(232, 234, 246, 0.9) !important',
    transition: 'none',
    '&:hover': {
      //    backgroundColor: 'rgba(232, 234, 246, 0.9)',
    },
    '&:active': {
      //    backgroundColor: 'rgba(232, 234, 246, 0.9)',
    },
    '&:focus': {
      //    backgroundColor: 'rgba(232, 234, 246, 0.9)',
    },
    '&:invalid': {
      //    backgroundColor: 'rgba(232, 234, 246, 0.9)',
    },
    // '&:invalid': {
    //   border: `3px solid ${theme.palette.secondary.main}`
    // },
    // width: '33%',
  },
  searchInput: {
    // marginTop: '0 !important',
    // backgroundColor: 'rgba(232, 234, 246, 0.9) !important',
    paddingTop: 16,
    paddingBottom: 8,
  },
  inputDense: {
    // marginTop: 8,
    paddingTop: 16,
    paddingBottom: 16,
  },
  inputAdornment: {
    marginTop: '4px !important',
    marginBottom: '4px !important',
  },
  inputLabel: {
    fontSize: '1rem',
  },
  helperText: {
    color: theme.palette.error.main,
    left: 0,
    top: 52,
    height: 24,
    position: 'absolute',
    right: 0,
    backgroundColor: 'white',
    margin: 0,
    padding: 4,
  },
});
const Search = React.forwardRef((props, ref) => {
  const {
    classes,
    className,
    component: Component = 'ul',
    dense = false,
    disablePadding = false,
    //    handleSubmit,
    style,
    initialValue,
    handleSubmit,
    ...other
  } = props;

  const requireFieldError = 'Required field';
  const [isLoading, setIsLoading] = React.useState(false);
  const MAXLENGTH = 500;

  async function getPath(keywords) {
    return true;
  }

  async function handleFormikSubmit(values, props) {
    try {
      let { keywords } = values;
      keywords = keywords.slice(0, MAXLENGTH);
      if (handleSubmit) {
        const result = await getPath(keywords);
        handleSubmit(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={clsx(classes.root, className)} style={style}>
      <Formik
        initialValues={{
          keywords: initialValue || '',
        }}
        enableReinitialize
        initialErrors={{}}
        validate={async (values) => {
          const errors = {};
          if (!values.keywords) {
            errors.keywords = requireFieldError;
          }
          return errors;
        }}
        onSubmit={handleFormikSubmit}
      >
        {({
          isSubmitting, errors, dirty, isValid, setFieldValue, values,
        }) => (
          <>
            <Form className={classes.form}>
              {/* <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              badge="bottomleft"
              sitekey={GOOGLE_RECAPTCHA_SITEKEY}
              onChange={async (response) => {
                setFieldValue('recaptchaResponse', response);
              }}
            /> */}
              <div className={classes.search}>
                <Field
                  type="text"
                  name="keywords"
                  autoComplete="search"
                  as={TextField}
	             // color="secondary"
                  required
                  helperText={errors.keywords}
                  label=""
                  placeholder="e.g. 'farmer co-operative philippines' or co-operative name"
                  id="keywords"
                  margin="none"
                  variant="filled"
                  fullWidth
                  InputLabelProps={{
                    required: false,
                    className: classes.inputLabel,
                  }}
                  InputProps={{
                    disableUnderline: true,
                    // className: classes.input,
                    classes: {
                      root: classes.input,
                      input: classes.inputDense,
                      inputMarginDense: classes.searchInput,
                    },
                    startAdornment: (
                      <InputAdornment classes={{ filled: classes.inputAdornment }} position="start">
                        <SearchIcon color="disabled" />
                      </InputAdornment>
                    ),
                  }}
	              // eslint-disable-next-line react/jsx-no-duplicate-props
                  inputProps={{ 'aria-label': 'Search words', maxLength: MAXLENGTH, required: true }}
                  FormHelperTextProps={{ className: classes.helperText }}
                />
              </div>
              <Button
                variant="contained"
                color="secondary"
                classes={{
	                root: classes.button,
	              }}
                type="submit"
                disabled={false}
              >
                Search
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
});

export default withStyles(styles, { name: 'Search' })(Search);
