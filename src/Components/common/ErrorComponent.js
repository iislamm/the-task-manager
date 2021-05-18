import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { useErrorStyles } from '../../styles/feedBackStyles';

export default function ErrorComponent(props) {
  let error = props.error
    ? props.error
    : 'An error occured, please try again later.';

  if (typeof error === 'object') {
    error = error.toString();
  }

  const classes = useErrorStyles();

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={true}
      ClickAwayListenerProps={{ mouseEvent: false, touchEvent: false }}
    >
      <SnackbarContent
        className={classes.errorSnackbar}
        message={<span>{error}</span>}
      />
    </Snackbar>
  );
}
