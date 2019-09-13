import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, withStyles, IconButton, Drawer } from '@material-ui/core';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import MenuIcon from '@material-ui/icons/Menu';
import { signOut } from '../../store/actions/authActions';
import { ExitToApp } from '@material-ui/icons';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  },
  lgContent: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  },
  smContent: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  menuButton: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  drawer: {
    width: '80%',
  }
});

class Navbar extends Component {
  state = {
    drawer: false,
  }
  openDrawer = () => {
    this.setState({
      drawer: true
    })
  }
  closeDrawer = () => {
    this.setState({
      drawer: false
    })
  }

  signOut = () => {
    this.props.signOut();
  }

  render() { 
    const { classes } = this.props;
    const { auth } = this.props;

    return (
      <AppBar color="inherit" position="static" className={classes.root}>
        <Toolbar>
          {!auth.uid ?
            <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
            onClick={this.openDrawer}
            >
            <MenuIcon />
          </IconButton> : ''
          }
          <Typography className={classes.title} variant="h6">The Task Manager</Typography>
          {auth.uid ? 
          <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="Sign out"
              onClick={this.signOut}
            >
              <ExitToApp />
          </IconButton>
          : ''
          }
          <div className={classes.lgContent}>
            {auth.uid ? <LoggedInLinks mobile='false' /> : <LoggedOutLinks mobile='false' />}
          </div>
          <div className={classes.smContent}>
            <Drawer open={this.state.drawer} onClose={this.closeDrawer} className={classes.drawer} >
              {auth.uid ?
                <LoggedInLinks mobile='true' closeDrawer={this.closeDrawer} /> :
                <LoggedOutLinks mobile='true' closeDrawer={this.closeDrawer} />}
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));