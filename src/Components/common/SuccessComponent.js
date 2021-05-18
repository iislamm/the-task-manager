import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { useSuccessStyles } from '../../styles/feedBackStyles';

export default function SuccessComponent(props) {
  const message = props.message ? props.message : 'Operation succeeded';
  const classes = useSuccessStyles();
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={true}
      ClickAwayListenerProps={{ mouseEvent: false, touchEvent: false }}
    >
      <SnackbarContent
        className={classes.successSnackbar}
        message={<span>{message}</span>}
      />
    </Snackbar>
  );
}
