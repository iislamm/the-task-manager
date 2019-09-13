import React, { Component } from 'react'
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class TaskSummary extends Component  {

  renderChargedUsers = task => {
    const chargedUsers = task.chargedUsersEmails;
    if (chargedUsers.length > 0) {
      let chargedUsersLeft = chargedUsers.length;
      return (
        <div>
          <Typography color="inherit" variant="caption" display="inline">Assigned to: </Typography>
          {chargedUsers.map(m => (
            <Typography key={m} variant="caption" display="inline">{m} {--chargedUsersLeft === 0 ? '' : ', '}</Typography>
          ))}
        </div>
      )

    }
  }

  render() {
    const { task } = this.props;
    console.log(task);
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h6">{task.taskName}</Typography>
            <Typography variant="body1">{task.taskDescription}</Typography>
            <div>
              <Typography variant="caption">Creator: {task.creatorEmail}</Typography>
            </div>
            {this.renderChargedUsers(task)}
            <br></br>
            <Button variant="contained" color="primary" component={Link} to={`tasks/${task.id}`}>More</Button>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default TaskSummary;