import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose  } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { redirectUnAuthorized } from '../../store/actions/authActions';
import { Container, Select, MenuItem, Dialog, Slide, AppBar, Toolbar, IconButton } from '@material-ui/core';
import ListDetails from '../Lists/ListDetails';
import Add from '../Add/Add';
import CreateList from '../Create/CreateList';
import CreateTask from '../Create/CreateTask';
import CloseIcon from '@material-ui/icons/Close';
import { closeCreateTaskDialog } from '../../store/actions/tasksActions';
import { closeListCreateDialog, updateLastVisit, openListCreateDialog } from '../../store/actions/listsActions';
import { showError, showSuccessMessage } from '../../store/actions/globalActions';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  select: {
    width: '100%'
  },
  appBar: {
    marginBottom: theme.spacing(2)
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Dashboard extends React.Component {
  state = {
    currentList: {},
    currentListId: '',
  }
  
  handleChange = e => {
    if (e.target.value !== 'create' && this.props.lists) {
      const newList = this.props.lists.filter(l => l.id === e.target.value)[0];
      this.setState({ currentListId: e.target.value, currentList: newList }, () => {
        console.log('changed', this.state.currentList)
        this.props.updateLastVisit(e.target.value);
      });
    } else if (e.target.value === 'create') {
      this.props.openCreateListDialog();
    }
  }

  handleCreateListClose = () => {
    this.props.closeCreateListDialog();
  }

  handleCreateTaskClose = () => {
    this.props.closeCreateTaskDialog();
  }
  render() {
    console.log("current list", this.state.currentList);
    const { auth, lists, classes, taskCreateError, taskCreateSuccess, 
      listCreateError, listCreateSuccess } = this.props;
    console.log(lists);
    let currentList = 0;
    if (redirectUnAuthorized(auth)) return redirectUnAuthorized(auth);
    return (
      <div>
        { listCreateError ? showError(listCreateError) : null }
        { listCreateSuccess ? showSuccessMessage("List created successfully") : null }
        { taskCreateError ? showError(listCreateError) : null }
        { taskCreateSuccess ? showSuccessMessage("Task created successfully") : null }
        <Container maxWidth="lg" className={classes.root}>
          <Select
            className={classes.select}
            value={this.state.currentListId}
            onChange={this.handleChange}
            inputProps={{
              name: 'list',
              id: 'list-select',
            }}
          >
            {lists && lists.map(list => {
              currentList++;
              if (currentList === 1 && !this.state.currentListId.length) {
                this.setState({ currentListId: list.id, currentList: list });
              }
              return (
                <MenuItem key={list.id} value={list.id}>{list.listName}</MenuItem>
                )
            })}
            <MenuItem value='create'>Create a new list</MenuItem>
          </Select>
        </Container>
        {this.state.currentList.id ? (<ListDetails list={this.state.currentList} />) : null}
        <Dialog fullScreen open={this.props.listsState.createDialog} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleCreateListClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <CreateList />
        </Dialog>
        <Dialog fullScreen open={this.props.tasksState.createDialog} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleCreateTaskClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <CreateTask lists={lists} currentList={this.state.currentList} />
        </Dialog>
        <Add />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    lists: state.firestore.ordered.lists,
    listsState: state.lists,
    tasksState: state.tasks,
    taskCreateError: state.tasks.create.error,
    taskCreateSuccess: state.tasks.create.success,
    listCreateError: state.lists.error,
    listCreateSuccess: state.lists.success,
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    openCreateListDialog: () => dispatch(openListCreateDialog()),
    closeCreateTaskDialog: () => dispatch(closeCreateTaskDialog()),
    closeCreateListDialog: () => dispatch(closeListCreateDialog()),
    updateLastVisit: listId => dispatch(updateLastVisit(listId)),
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchTopProps),
  firestoreConnect((props, store) => [{
    collection: 'lists',
    where: ['moderatorsIds', 'array-contains', props.auth.uid ? props.auth.uid : ''],
    orderBy: ['lastVisit', 'desc'],
  }]),
  withStyles(styles)
)(Dashboard);