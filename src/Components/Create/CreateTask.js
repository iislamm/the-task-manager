import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  TextField,
  Container,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import {
  showError,
  showSuccessMessage,
} from '../../store/actions/globalActions';
import {
  createTask,
  closeCreateTaskDialog,
} from '../../store/actions/tasksActions';
import { openListCreateDialog } from '../../store/actions/listsActions';

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

export default function CreateTask(props) {
  const [list, setList] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const { lists, currentList } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const error = useSelector(state => state.tasks.create.error);
  const success = useSelector(state => state.tasks.create.success);

  useEffect(() => {
    if (!list && currentList) {
      setList(currentList);
    }
  }, [list, setList, currentList]);

  const handleListChange = e => {
    if (e.target.value !== 'create') {
      setList(e.target.value);
    } else {
      dispatch(openListCreateDialog());
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (list) {
      setList(list.id);
      console.log(this.state);
      dispatch(
        createTask({
          list,
          taskName,
          taskDescription,
        })
      );
      dispatch(closeCreateTaskDialog());
    }
  };

  return (
    <Container maxWidth='sm'>
      <Paper className={classes.root}>
        <Typography variant='h6' className={classes.title}>
          Create a task
        </Typography>
        {error ? showError(error) : null}
        {success ? showSuccessMessage('Task created successfully') : null}
        <form onSubmit={handleSubmit}>
          <FormControl className={classes.formControl} required fullWidth>
            <InputLabel htmlFor='list'>List</InputLabel>
            <Select
              value={list}
              id='list'
              inputProps={{
                name: 'list',
                id: 'list',
              }}
              onChange={handleListChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {lists.map(l => (
                <MenuItem key={l.id} value={l}>
                  {l.listName}
                </MenuItem>
              ))}
              <MenuItem value='create'>Create a new list</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id='taskName'
            name='taskName'
            label='Task name'
            onChange={e => setTaskName(e.target.value)}
            fullWidth
            required
            className={classes.input}
            value={taskName}
          />
          <TextField
            id='taskDescription'
            name='taskDescription'
            label='Task description'
            onChange={e => setTaskDescription(e.target.value)}
            fullWidth
            value={taskDescription}
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
