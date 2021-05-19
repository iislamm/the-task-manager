import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import {
  List,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { updateTask, createTask } from '../../store/actions/tasksActions';
import Dialog from '@material-ui/core/Dialog';
import TaskSummary from './TaskSummary';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles(theme => ({
  task: {
    width: '100%',
  },
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  dialog: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function TaskList(props) {
  const [newTaskName, setNewTaskName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openTask, setOpenTask] = useState(null);

  const classes = useStyles();

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.firestore.ordered.tasks);
  const currentList = useSelector(state => state.lists.currentList);

  useFirestoreConnect([
    {
      collection: 'tasks',
      where: ['list', '==', props.list],
    },
  ]);

  const handleTaskCheckToggle = task => {
    dispatch(updateTask(task.id, { checked: !task.checked }));
  };

  const handleNewTaskChange = e => {
    setNewTaskName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (newTaskName.length && currentList) {
      const taskData = {
        list: currentList.id,
        taskName: newTaskName,
        taskDescription: '',
        chargedUsersEmails: [],
      };
      dispatch(createTask(taskData));
    }
  };

  const handleDialogOpen = task => {
    setDialogOpen(true);
    setOpenTask(task);
  };

  const handleDialogClose = _ => {
    setDialogOpen(false);
    setOpenTask(null);
  };

  const renderTaskSummary = () => {
    if (dialogOpen) {
      return (
        <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth='lg'>
          <DialogContent className={classes.dialog}>
            <TaskSummary task={openTask} />
          </DialogContent>
        </Dialog>
      );
    }
  };

  return (
    <List className={classes.task}>
      {renderTaskSummary(classes)}
      {tasks &&
        tasks.map(task => {
          const labelId = `checkbox-list-label-${task.id}`;

          return (
            <ListItem
              key={task.id}
              dense
              button
              onClick={() => handleDialogOpen(task)}
            >
              <ListItemText id={labelId} primary={`${task.taskName}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge='start'
                  checked={task.checked}
                  onChange={() => handleTaskCheckToggle(task)}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      {!tasks || (tasks && !tasks.length) ? <div>No tasks yet...</div> : ''}
      <form onSubmit={handleSubmit}>
        <TextField
          id='taskName'
          name='taskName'
          label='Add a task...'
          onChange={handleNewTaskChange}
          fullWidth
          className={classes.input}
          value={newTaskName}
        />
      </form>
    </List>
  );
}
