import { green } from '@material-ui/core/colors';

export const ErrorStyles = theme => ({
  errorSnackbar: {
    backgroundColor: theme.palette.error.dark,
  }
});

export const SuccessStyles = theme => ({
  successSnackbar: {
    backgroundColor: green[600]
  }
})