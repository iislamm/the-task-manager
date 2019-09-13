import React from 'react'
import { Snackbar, SnackbarContent, makeStyles } from '@material-ui/core';
import { ErrorStyles } from '../../styles/feedBackStyles';
import { withStyles } from '@material-ui/styles';

const ErrorComponent = props => {
  let error = props.error ? props.error : 'An error occured, please try again later.';
  if (typeof error === 'object') {
    error = error.toString();
  }
  const { classes } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={true}
      ClickAwayListenerProps={{mouseEvent: false, touchEvent: false}}>
      <SnackbarContent className={classes.errorSnackbar} message={<span>{error}</span>} />
    </Snackbar>
  )
}

export default withStyles(ErrorStyles)(ErrorComponent);