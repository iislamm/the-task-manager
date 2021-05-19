import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { openListCreateDialog } from '../../store/actions/listsActions';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
  },
}));

export default function Add() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleClick = e => {
    dispatch(openListCreateDialog());
  };

  return (
    <div className={classes.root}>
      <Fab
        color='primary'
        aria-label='add'
        onClick={handleClick}
        title='Add list'
      >
        <AddIcon fontWeight='bold' />
      </Fab>
    </div>
  );
}
