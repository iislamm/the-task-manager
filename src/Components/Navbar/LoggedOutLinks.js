import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, withStyles, ListItemText, List, ListItem } from '@material-ui/core';
import { signOut } from '../../store/actions/authActions';
import { getLoggedOutLinks } from './links';


const styles = theme => ({
  root: {
  },
  link: {
    marginLeft: theme.spacing(2)
  },
  list: {
    width: '250px',
  }
});

class LoggedInLinks extends Component {
  renderDesktopContent = classes => {
    return (
      <div>
        {getLoggedOutLinks().map(link => (
          <Button key={link.to} color="inherit" component={RouterLink} to={link.to}>{link.name}</Button>
        ))}
      </div>
    )
  }

  renderMobileContent = classes => {
    return(
      <List className={classes.list}>
        {getLoggedOutLinks().map(link => (
          <ListItem key={link.to} button component={RouterLink} to={link.to} onClick={this.props.closeDrawer}>
            <ListItemText>{link.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    )
  }
  render() {
    const { classes, mobile } = this.props;
    return (
      <div className={classes.root}>
        {mobile === 'true' ? this.renderMobileContent(classes) : this.renderDesktopContent(classes)}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(LoggedInLinks));