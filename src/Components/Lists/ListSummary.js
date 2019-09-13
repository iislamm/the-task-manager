import React, { Component } from 'react'
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class ListSummary extends Component  {

  renderModerators = list => {
    const moderators = list.moderatorsEmails;
    if (moderators.length > 0) {
      let moderatorsLeft = moderators.length;
      return (
        <div>
          <Typography color="inherit" variant="caption" display="inline">Moderators: </Typography>
          {moderators.map(m => (
            <Typography key={m} variant="caption" display="inline">{m} {--moderatorsLeft === 0 ? '' : ', '}</Typography>
          ))}
        </div>
      )
    }
  }

  render() {
    const { list } = this.props;
    console.log(list);
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h6">{list.listName}</Typography>
            <Typography variant="body1">{list.listDescription}</Typography>
            <div>
              <Typography variant="caption">Tasks: {list.tasksCount}</Typography>
            </div>
            <div>
              <Typography variant="caption">Owner: {list.ownerEmail}</Typography>
            </div>
            {this.renderModerators(list)}
            <br></br>
            <Button variant="contained" color="primary" component={Link} to={`lists/${list.id}`}>More</Button>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default ListSummary;