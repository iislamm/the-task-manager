import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, IconButton, Drawer, makeStyles } from '@material-ui/core';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import MenuIcon from '@material-ui/icons/Menu';
import { signOut } from '../../store/actions/authActions';
import { ExitToApp } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  lgContent: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  smContent: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  menuButton: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    width: '80%',
  },
}));

export default function Navbar() {
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();

  const auth = useSelector(state => state.firebase.auth);
  const dispatch = useDispatch();

  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <AppBar color='inherit' position='static' className={classes.root}>
      <Toolbar>
        {!auth.uid ? (
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='Open drawer'
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          ''
        )}
        <Typography className={classes.title} variant='h6'>
          The Task Manager
        </Typography>
        {auth.uid ? (
          <IconButton
            edge='end'
            className={classes.menuButton}
            color='inherit'
            aria-label='Sign out'
            onClick={handleSignOut}
          >
            <ExitToApp />
          </IconButton>
        ) : (
          ''
        )}
        <div className={classes.lgContent}>
          {auth.uid ? (
            <LoggedInLinks mobile='false' />
          ) : (
            <LoggedOutLinks mobile='false' />
          )}
        </div>
        <div className={classes.smContent}>
          <Drawer
            open={drawer}
            onClose={closeDrawer}
            className={classes.drawer}
          >
            {auth.uid ? (
              <LoggedInLinks mobile='true' closeDrawer={closeDrawer} />
            ) : (
              <LoggedOutLinks mobile='true' closeDrawer={closeDrawer} />
            )}
          </Drawer>
        </div>
      </Toolbar>
    </AppBar>
  );
}
