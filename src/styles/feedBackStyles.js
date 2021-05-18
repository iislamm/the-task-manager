import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

export const useErrorStyles = makeStyles(theme => ({
  errorSnackbar: {
    backgroundColor: theme.palette.error.dark,
  },
}));

export const useSuccessStyles = makeStyles(theme => ({
  successSnackbar: {
    backgroundColor: green[600],
  },
}));
