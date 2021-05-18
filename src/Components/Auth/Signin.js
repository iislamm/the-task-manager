import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { singIn } from '../../store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  TextField,
  Container,
  Button,
} from '@material-ui/core';
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

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.singInError);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(singIn({ email, password }));
  };

  return (
    <Container maxWidth='sm'>
      <Paper className={classes.root}>
        <Typography variant='h6' className={classes.title}>
          Sign in
        </Typography>
        {error ? showError(error.message) : null}
        <form onSubmit={handleSubmit}>
          <TextField
            id='email'
            label='Email'
            type='email'
            onChange={e => setEmail(e.target.value)}
            fullWidth
            className={classes.input}
            required
          />
          <TextField
            id='password'
            label='Password'
            type='password'
            onChange={e => setPassword(e.target.value)}
            fullWidth
            className={classes.input}
            required
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
