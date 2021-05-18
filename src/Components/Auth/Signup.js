import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  TextField,
  Container,
  Button,
} from '@material-ui/core';
import { signUp } from '../../store/actions/authActions';
import { showError } from '../../store/actions/globalActions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.signUpError);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signUp({ name, email, password }));
  };

  return (
    <Container maxWidth='sm'>
      <Paper className={classes.root}>
        <Typography variant='h6' className={classes.title}>
          Sign up
        </Typography>
        {error ? showError(error.message) : null}
        <form onSubmit={handleSubmit}>
          <TextField
            id='name'
            label='Name'
            onChange={e => setName(e.target.value)}
            className={classes.input}
            fullWidth
            required
          />
          <TextField
            id='email'
            label='Email'
            type='email'
            onChange={e => setEmail(e.target.value)}
            className={classes.input}
            fullWidth
            required
          />
          <TextField
            id='password'
            label='Password'
            type='password'
            onChange={e => setPassword(e.target.value)}
            className={classes.input}
            fullWidth
            required
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
