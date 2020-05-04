import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {redirectUnAuthorized} from '../../store/actions/authActions';
import {Select, MenuItem, Dialog, Slide, AppBar, Toolbar, IconButton} from '@material-ui/core';
import ListDetails from '../Lists/ListDetails';
import Add from '../Add/Add';
import CreateList from '../Create/CreateList';
import CreateTask from '../Create/CreateTask';
import CloseIcon from '@material-ui/icons/Close';
import {closeCreateTaskDialog} from '../../store/actions/tasksActions';
import {
	closeListCreateDialog,
	updateLastVisit,
	openListCreateDialog,
	updateCurrentList
} from '../../store/actions/listsActions';
import {showError, showSuccessMessage} from '../../store/actions/globalActions';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";

const styles = theme => ({
	root: {
		marginBottom: theme.spacing(2)
	},
	select: {
		width: '100%'
	},
	appBar: {
		marginBottom: theme.spacing(4)
	},
	cardContent: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4)
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
			this.setState({currentListId: e.target.value, currentList: newList}, () => {
				this.props.updateLastVisit(e.target.value)
				this.props.updateCurrentList(this.state.currentList)
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
		const {
			auth, lists, classes, taskCreateError, taskCreateSuccess,
			listCreateError, listCreateSuccess
		} = this.props;
		let currentList = 0;
		if (redirectUnAuthorized(auth)) return redirectUnAuthorized(auth);
		return (
			<Container maxWidth="md">
				{listCreateError ? showError(listCreateError) : null}
				{listCreateSuccess ? showSuccessMessage("List created successfully") : null}
				{taskCreateError ? showError(listCreateError) : null}
				{taskCreateSuccess ? showSuccessMessage("Task created successfully") : null}

				<Card className={classes.root}>
					<CardHeader title="Tasks" />
					<CardContent className={classes.cardContent}>
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
									this.setState({currentListId: list.id, currentList: list}, () => {
										this.props.updateCurrentList(list)
									});
								}
								return (
									<MenuItem key={list.id} value={list.id}>{list.listName}</MenuItem>
								)
							})}
							<MenuItem value='create'>Create a new list</MenuItem>
						</Select>

						{this.state.currentList.id ? (<ListDetails list={this.state.currentList}/>) : null}
					</CardContent>
				</Card>


				<Dialog fullScreen open={this.props.listsState.createDialog} TransitionComponent={Transition}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton edge="start" color="inherit" onClick={this.handleCreateListClose} aria-label="close">
								<CloseIcon/>
							</IconButton>
						</Toolbar>
					</AppBar>
					<CreateList/>
				</Dialog>
				<Dialog fullScreen open={this.props.tasksState.createDialog} TransitionComponent={Transition}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton edge="start" color="inherit" onClick={this.handleCreateTaskClose} aria-label="close">
								<CloseIcon/>
							</IconButton>
						</Toolbar>
					</AppBar>
					<CreateTask lists={lists} currentList={this.state.currentList}/>
				</Dialog>
				<Add/>
			</Container>
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
		updateCurrentList: list => dispatch(updateCurrentList(list)),
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