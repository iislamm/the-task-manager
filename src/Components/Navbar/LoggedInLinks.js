import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  ListItemText,
  List,
  ListItem,
  makeStyles,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { signOut } from '../../store/actions/authActions';
import { getLoggedInLinks } from './links';

const useStyles = makeStyles(theme => ({
  link: {
    marginLeft: theme.spacing(2),
  },
  list: {
    width: '250px',
  },
}));

function LoggedInLinks(props) {
  const classes = useStyles();
  const { mobile } = props;

  const dispatch = useDispatch();

  const signOut = () => {
    if (props.closeDrawer) {
      props.closeDrawer();
    }
    dispatch(signOut());
  };

  const renderDesktopContent = () => {
    return (
      <div>
        {getLoggedInLinks().map(link => (
          <Button
            key={link.to}
            color='inherit'
            component={RouterLink}
            to={link.to}
          >
            {link.name}
          </Button>
        ))}
        <Button
          color='inherit'
          aria-controls='simple-menu'
          aria-haspopup='true'
          onClick={signOut}
        >
          <ExitToApp />
        </Button>
      </div>
    );
  };

  const renderMobileContent = () => {
    return (
      <List className={classes.list}>
        {getLoggedInLinks().map(link => (
          <ListItem
            key={link.to}
            button
            component={RouterLink}
            to={link.to}
            onClick={props.closeDrawer}
          >
            <ListItemText>{link.name}</ListItemText>
          </ListItem>
        ))}
        <ListItem button onClick={signOut}>
          <ListItemText>Log out</ListItemText>
        </ListItem>
      </List>
    );
  };

  return (
    <div className={classes.root}>
      {mobile === 'true' ? renderMobileContent() : renderDesktopContent()}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(LoggedInLinks);
