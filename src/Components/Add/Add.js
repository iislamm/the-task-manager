import React from 'react';
import { Container, Grid, Fab, withStyles, Paper, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openCreateTaskDialog, closeCreateTaskDialog } from '../../store/actions/tasksActions';
import { openListCreateDialog } from '../../store/actions/listsActions';
const styles = theme => ({
  root: {
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
  }
});

class Add extends React.Component {
  state = {
    open: false,
    anchorEl: null
  }

  handleClick = e => {
    // this.setState({ open: !this.state.open, anchorEl: e.currentTarget });
    this.props.openCreateTaskDialog();

  }

  handleClose = () => {
    this.setState({ open: false });
  }

  openCreateList = () => {
    this.props.openCreateListDialog();
    this.handleClose();
  }

  openCreateTask = () => {
    this.props.openCreateTaskDialog();
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Menu
          id="add-menu"
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{vertical: 'top', horizontal: 'left'}}
          className={classes.menu}
          color="primary"
          onClose={this.handleClose}>
            <MenuItem onClick={this.openCreateList}>Create list</MenuItem>
            <MenuItem onClick={this.openCreateTask} >Create task</MenuItem>
          </Menu>
        <Fab
            color="primary"
            aria-label='add'
            className={classes.fab}
            onClick={this.handleClick}
            title="Add task">
            <AddIcon fontWeight='bold' />
        </Fab>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openCreateTaskDialog: () => dispatch(openCreateTaskDialog()),
    // openCreateListDialog: () => dispatch(openListCreateDialog())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Add));