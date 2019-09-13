import React from 'react';
import { connect } from 'react-redux';
import { compose  } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { redirectUnAuthorized } from '../../store/actions/authActions';
import { withStyles, Typography, ExpansionPanel, ExpansionPanelSummary,
  ExpansionPanelDetails, List, ListItem, ListItemIcon, Checkbox, ListItemText,
  ListItemSecondaryAction, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { updateTask, deleteTask } from '../../store/actions/tasksActions';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  task: {
    width: '100%',
  }
})

class TaskList extends React.Component {
  state = {
    expanded: true,
  }
  handleTaskCheckToggle = task => {
    this.props.updateTask(task.id, { checked: !task.checked });
  }
  handleExpansionToggle = e => {
    this.setState({ expanded: !this.state.expanded });
  }

  handleDeleteClick = taskId => {
    this.props.deleteTask(taskId);
  }
  render() {

    const { auth, classes, tasks} = this.props;
    if (redirectUnAuthorized(auth)) return redirectUnAuthorized(auth);
    return (
      <ExpansionPanel className={classes.panel} expanded={this.state.expanded} onChange={this.handleExpansionToggle}>
        <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        <Typography className={classes.heading}>Tasks</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>   
          <List className={classes.task}>
          {tasks && tasks.map(task => {
            const labelId = `checkbox-list-label-${task.id}`;

            return (
            <ListItem key={task.id} dense button onClick={() => this.handleTaskCheckToggle(task)}>
              <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.checked}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${task.taskName}`} />
              <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => this.handleDeleteClick(task.id)} >
                <DeleteIcon/>
              </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            );
          })}
          { !tasks || (tasks && !tasks.length) ? <div>No tasks yet...</div> : '' }
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

const mapStateToProps = state => {
  return {
      auth: state.firebase.auth,
      tasks: state.firestore.ordered.tasks,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      updateTask: (taskId, updates) => dispatch(updateTask(taskId, updates)),
      deleteTask: taskId => dispatch(deleteTask(taskId))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props, store) => [{
      collection: 'tasks',
      where: ['list', '==', props.list]
  }]),
  withStyles(styles)
)(TaskList);