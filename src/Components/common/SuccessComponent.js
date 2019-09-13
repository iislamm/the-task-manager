import React from 'react'
import { Snackbar, SnackbarContent, withStyles } from '@material-ui/core';
import { SuccessStyles } from '../../styles/feedBackStyles';

const SuccessComponent = props => {
  const message = props.message ? props.message : 'Operation succeeded';
  const { classes } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={true}
      ClickAwayListenerProps={{mouseEvent: false, touchEvent: false}}>
      <SnackbarContent className={classes.successSnackbar} message={<span>{message}</span>} />
    </Snackbar>
  )
}

export default withStyles(SuccessStyles)(SuccessComponent);