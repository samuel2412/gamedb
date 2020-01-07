import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import { checkValidty } from '../../shared/utility';
import Input from '../../components/UI/Input/Input'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Auth = props => {
  const classes = useStyles();
  const [orderForm, setOrderForm] = useState({
    email: {
      elementType: 'emailInput',
      elementConfig: {
        type: 'email',
        placeholder: 'Email Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'passwordInput',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 7
      },
      valid: false,
      touched: false
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...orderForm };
    const updateFormElement = { ...updatedOrderForm[inputIdentifier] };
    updateFormElement.value = event.target.value;
    updateFormElement.valid = checkValidty(updateFormElement.value, updateFormElement.validation)
    updateFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updateFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      orderForm.email.value,
      orderForm.password.value,
      isSignup);
  }
  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }
  let errorMessage = null;
  if (props.error) {
    errorMessage = (
      <Alert severity="error">{props.error.message}</Alert>
    )
  }
  let redirect = null;
  if (props.isAuth) {
      redirect = (
          <Redirect to={props.authRedirectPath} />
      )
  }
 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? 'Sign up' : 'Login'}
        </Typography>
        {errorMessage}


        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>

            {formElementsArray.map(formElement => (
              <Grid item xs={12} key={formElement.id}>
                <Input
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  invalid={!formElement.config.valid}
                  touched={formElement.config.touched}
                  shouldValidate={formElement.config.validation}
                  changed={(event) => inputChangeHandler(event, formElement.id)}
                />
              </Grid>
            ))}

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled={!formIsValid}
          >
            {isSignup ? 'Sign up' : 'Login'}
          </Button>
          <Grid container>
            <Grid item xs>
              {isSignup ? null : <Button>Forgot password?</Button>}
            </Grid>
            <Grid item>
              <Button onClick={() => {setIsSignup(!isSignup)} }>
                {isSignup ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {redirect}
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuth: state.authReducer.tokenId !== null,
  };
}


const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);