import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Container, Button } from '@material-ui/core';
import { signUp, redirectAuthorized } from '../../store/actions/authActions';
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
  }
})
class SignUp extends Component {
  state = {
    name: '',
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
    this.props.signUp(this.state);
  }

  render() {
    const { classes, auth, error } = this.props;
    console.log(error);
    
    if (redirectAuthorized(auth)) return redirectAuthorized(auth);

    return (
      <Container maxWidth="sm">
        <Paper className={classes.root}>
            <Typography variant="h6" className={classes.title}>Sign up</Typography>
            {error ? showError(error.message) : null}
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="name"
              label="Name"
              onChange={this.handleChange}
              className={classes.input}
              fullWidth
              required
              />
            <TextField
              id="email"
              label="Email"
              type="email"
              onChange={this.handleChange}
              className={classes.input}
              fullWidth
              required
              />
            <TextField
              id="password"
              label="Password"
              type="password"
              onChange={this.handleChange}
              className={classes.input}
              fullWidth
              required
              />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              className={classes.button}>
                Sign up
              </Button>
          </form>
        </Paper>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.signUpError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: credentials => dispatch(signUp(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));