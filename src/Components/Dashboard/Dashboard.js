import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import {
  Select,
  MenuItem,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import ListDetails from '../Lists/ListDetails';
import Add from '../Add/Add';
import CreateList from '../Create/CreateList';
import CreateTask from '../Create/CreateTask';
import CloseIcon from '@material-ui/icons/Close';
import { closeCreateTaskDialog } from '../../store/actions/tasksActions';
import {
  closeListCreateDialog,
  updateLastVisit,
  openListCreateDialog,
  updateCurrentList,
} from '../../store/actions/listsActions';
import {
  showError,
  showSuccessMessage,
} from '../../store/actions/globalActions';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

import firebase from 'firebase/app';
import 'firebase/firestore';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  select: {
    width: '100%',
  },
  appBar: {
    marginBottom: theme.spacing(4),
  },
  cardContent: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function Dashboard() {
  const [currentList, setCurrentList] = useState({});
  const [currentListId, setCurrentListId] = useState('');

  useFirestoreConnect([{ collection: 'lists' }, { collection: 'users' }]);

  const lists = useSelector(state => state.firestore.ordered.lists);

  const auth = useSelector(state => state.firebase.auth);
  // const lists = useSelector(state => state.firestore.data.lists);
  const users = useSelector(state => state.firestore);
  const listsState = useSelector(state => state.lists);
  const tasksState = useSelector(state => state.tasks);
  const taskCreateError = useSelector(state => state.tasks.create.error);
  const taskCreateSuccess = useSelector(state => state.tasks.create.success);
  const listCreateError = useSelector(state => state.lists.error);
  const listCreateSuccess = useSelector(state => state.lists.success);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(lists);
    console.log(auth.uid);
    console.log(users);
    firebase
      .firestore()
      .collection('users')
      .get()
      .then(snap => console.log(snap.docs));
  });

  const classes = useStyles();

  const handleChange = e => {
    if (e.target.value !== 'create' && lists) {
      const newList = lists.filter(l => l.id === e.target.value)[0];
      setCurrentListId(e.target.value);
      setCurrentList(newList);
      dispatch(updateLastVisit(e.target.value));
      dispatch(updateCurrentList(currentList));
    } else if (e.target.value === 'create') {
      dispatch(openListCreateDialog());
    }
  };

  const handleCreateListClose = () => {
    dispatch(closeListCreateDialog());
  };

  const handleCreateTaskClose = () => {
    dispatch(closeCreateTaskDialog());
  };

  let currentListIterator = 0;
  return (
    <Container maxWidth='md'>
      {listCreateError ? showError(listCreateError) : null}
      {listCreateSuccess
        ? showSuccessMessage('List created successfully')
        : null}
      {taskCreateError ? showError(listCreateError) : null}
      {taskCreateSuccess
        ? showSuccessMessage('Task created successfully')
        : null}

      <Card className={classes.root}>
        <CardHeader title='Tasks' />
        <CardContent className={classes.cardContent}>
          <Select
            className={classes.select}
            value={currentListId}
            onChange={handleChange}
            inputProps={{
              name: 'list',
              id: 'list-select',
            }}
          >
            {lists &&
              lists.map(l => {
                currentListIterator++;
                if (currentListIterator === 1 && !currentListId.length) {
                  setCurrentListId(l.id);
                  setCurrentList(l);
                  dispatch(updateCurrentList(l));
                }
                return (
                  <MenuItem key={l.id} value={l.id}>
                    {l.listName}
                  </MenuItem>
                );
              })}
            <MenuItem value='create'>Create a new list</MenuItem>
          </Select>

          {currentList.id ? <ListDetails list={currentList} /> : null}
        </CardContent>
      </Card>

      <Dialog
        fullScreen
        open={listsState.createDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleCreateListClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <CreateList />
      </Dialog>
      <Dialog
        fullScreen
        open={tasksState.createDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleCreateTaskClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <CreateTask lists={lists} currentList />
      </Dialog>
      <Add />
    </Container>
  );
}
