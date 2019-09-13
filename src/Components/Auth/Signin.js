import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { singIn, redirectAuthorized } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { Paper, Typography, TextField, Container, Button, Snackbar, SnackbarContent } from '@material-ui/core';
import { showError } from '../../store/actions/globalActions';

const styles = theme => ({
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
})
class SignIn extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }

  render() {
    const { classes, auth, error } = this.props;

    if (redirectAuthorized(auth)) return redirectAuthorized(auth);

    return (
      <Container maxWidth="sm">
        <Paper className={classes.root}>
            <Typography variant="h6" className={classes.title}>Sign in</Typography>
            {error ? showError(error.message) : null}
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              label="Email"
              type="email"
              onChange={this.handleChange}
              fullWidth
              className={classes.input}
              required
              />
            <TextField
              id="password"
              label="Password"
              type="password"
              onChange={this.handleChange}
              fullWidth
              className={classes.input}
              required
              />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              className={classes.button}>
                Sign in
              </Button>
          </form>
        </Paper>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.auth)
  return {
    error: state.auth.singInError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => dispatch(singIn(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));