import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, withStyles, ListItemText, List, ListItem } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { signOut } from '../../store/actions/authActions';
import { getLoggedInLinks } from './links';


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
  state = {
    anchorEl: null
  }

  setMenuAnchor = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
  }

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  }

  signOut = () => {
    if (this.props.closeDrawer) {
      this.props.closeDrawer();
    }
    this.props.signOut();
  }

  renderDesktopContent = classes => {
    return (
      <div>
        {getLoggedInLinks().map(link => (
          <Button key={link.to} color="inherit" component={RouterLink} to={link.to}>{link.name}</Button>
        ))}
        <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={this.signOut}>
          <ExitToApp />
        </Button>
        {/* <Menu
          open={this.state.menuOpen}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          getContentAnchorEl={null}
          onClose={this.handleMenuClose}>
          <MenuItem onClick={this.signOut}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>

        </Menu> */}
      </div>
    )
  }

  renderMobileContent = classes => {
    return(
      <List className={classes.list}>
        {getLoggedInLinks().map(link => (
          <ListItem key={link.to} button component={RouterLink} to={link.to} onClick={this.props.closeDrawer}>
            <ListItemText>{link.name}</ListItemText>
          </ListItem>
        ))}
        <ListItem button onClick={this.signOut}>
          <ListItemText>Log out</ListItemText>
        </ListItem>
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