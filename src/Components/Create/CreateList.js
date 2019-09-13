import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Paper, Typography, TextField, Container, Button } from '@material-ui/core';
import { createList, closeListCreateDialog } from '../../store/actions/listsActions';
import { redirectUnAuthorized } from '../../store/actions/authActions';
import { showError, showSuccessMessage } from '../../store/actions/globalActions';


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

class CreateList extends Component {
  state = {
    listName: '',
    listDescription: '',
    moderatorsEmails: [],
  }

  handleModChange = e => {
    const moderatorsEmails = e.target.value.replace(/\s/g, '').split(',');
    const lastElement = moderatorsEmails.length - 1;
    if (moderatorsEmails[lastElement].length === 0) {
      moderatorsEmails.pop();
    }
    this.setState({ moderatorsEmails });
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.createList(this.state);
    this.props.closeCreateListDialog();
  }
  
  render() {
    const { classes, auth, error, success } = this.props;
    
    if (redirectUnAuthorized(auth)) return redirectUnAuthorized(auth);

    return (
      <Container maxWidth="sm">
        <Paper className={classes.root}>
            <Typography variant="h6" className={classes.title}>Create a list</Typography>
            {error ? showError(error) : null}
            { success ? showSuccessMessage("List created successfully") : null }
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="listName"
              label="List name"
              onChange={this.handleChange}
              fullWidth
              required
              className={classes.input}
              value={this.state.listName}
              />
            <TextField
              id="listDescription"
              label="List description"
              onChange={this.handleChange}
              fullWidth
              required
              value={this.state.listDescription}
              className={classes.input}
              />
            
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              className={classes.button}>
                Create
              </Button>
          </form>
        </Paper>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    error: state.lists.error,
    success: state.lists.success,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createList: listData => dispatch(createList(listData)),
    closeCreateListDialog: () => dispatch(closeListCreateDialog()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateList));