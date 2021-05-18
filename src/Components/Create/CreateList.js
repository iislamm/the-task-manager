import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  TextField,
  Container,
  Button,
} from '@material-ui/core';
import {
  createList,
  closeListCreateDialog,
} from '../../store/actions/listsActions';
import {
  showError,
  showSuccessMessage,
} from '../../store/actions/globalActions';

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

export default function CreateList() {
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');

  const classes = useStyles();

  const dispatch = useDispatch();
  const error = useSelector(state => state.lists.error);
  const success = useSelector(state => state.lists.success);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createList({ listName, listDescription }));
    dispatch(closeListCreateDialog());
  };

  return (
    <Container maxWidth='sm'>
      <Paper className={classes.root}>
        <Typography variant='h6' className={classes.title}>
          Create a list
        </Typography>
        {error ? showError(error) : null}
        {success ? showSuccessMessage('List created successfully') : null}
        <form onSubmit={handleSubmit}>
          <TextField
            id='listName'
            label='List name'
            onChange={e => setListName(e.target.value)}
            fullWidth
            required
            className={classes.input}
            value={listName}
          />
          <TextField
            id='listDescription'
            label='List description'
            onChange={e => setListDescription(e.target.value)}
            fullWidth
            required
            value={listDescription}
            className={classes.input}
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Create
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
