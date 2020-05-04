import React from 'react';
import { Fab, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
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
  }

  handleClick = e => {
    this.props.openCreateListDialog();
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
        <Fab
            color="primary"
            aria-label='add'
            onClick={this.handleClick}
            title="Add list">
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
    openCreateListDialog: () => dispatch(openListCreateDialog())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Add));