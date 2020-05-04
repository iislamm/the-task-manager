import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {redirectUnAuthorized} from '../../store/actions/authActions';
import {
	withStyles, List, ListItem, Checkbox, ListItemText,
	ListItemSecondaryAction, TextField
} from '@material-ui/core';
import {updateTask, deleteTask, createTask} from '../../store/actions/tasksActions';
import Dialog from "@material-ui/core/Dialog";
import TaskSummary from "./TaskSummary";
import DialogContent from "@material-ui/core/DialogContent";

const styles = theme => ({
	task: {
		width: '100%',
	},
	input: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	dialog: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4)
	}
})

class TaskList extends React.Component {
	state = {
		expanded: true,
		newTaskName: '',
		dialogOpen: false,
		openTask: null
	}
	handleTaskCheckToggle = task => {
		this.props.updateTask(task.id, {checked: !task.checked});
	}

	handleDeleteClick = taskId => {
		this.props.deleteTask(taskId);
	}

	handleNewTaskChange = e => {
		this.setState({newTaskName: e.target.value})
	}

	handleSubmit = e => {
		e.preventDefault();

		if (this.state.newTaskName.length && this.props.currentList) {
			const taskData = {
				list: this.props.currentList.id,
				taskName: this.state.newTaskName,
				taskDescription: '',
				chargedUsersEmails: []
			}
			this.props.createTask(taskData);
		}
	}

	handleDialogOpen = (task) => {
		console.log(task)
		this.setState({dialogOpen: true, openTask: task})
	}

	handleDialogClose = (e) => {
		this.setState({dialogOpen: false, openTask: null})
	}

	renderTaskSummary = (classes) => {
		if (this.state.dialogOpen) {
			return (
				<Dialog open={this.state.dialogOpen}
								onClose={this.handleDialogClose}
								maxWidth='lg'>
					<DialogContent className={classes.dialog}>
						<TaskSummary task={this.state.openTask}/>
					</DialogContent>
				</Dialog>
			)
		}
	}

	render() {
		const {auth, classes, tasks} = this.props;
		if (redirectUnAuthorized(auth)) return redirectUnAuthorized(auth);
		return (
			<List className={classes.task}>
				{this.renderTaskSummary(classes)}
				{tasks && tasks.map(task => {
					const labelId = `checkbox-list-label-${task.id}`;

					return (
						<ListItem key={task.id} dense button onClick={() => this.handleDialogOpen(task)}>

							<ListItemText id={labelId} primary={`${task.taskName}`}/>
							<ListItemSecondaryAction>
								<Checkbox
									edge="start"
									checked={task.checked}
									onChange={() => this.handleTaskCheckToggle(task)}
									disableRipple
									inputProps={{'aria-labelledby': labelId}}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
				{!tasks || (tasks && !tasks.length) ? <div>No tasks yet...</div> : ''}
				<form onSubmit={this.handleSubmit}>
					<TextField id="taskName"
										 name="taskName"
										 label="Add a task..."
										 onChange={this.handleNewTaskChange}
										 fullWidth
										 className={classes.input}
										 value={this.state.newTaskName}
					/>
				</form>
			</List>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		tasks: state.firestore.ordered.tasks,
		currentList: state.lists.currentList
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createTask: taskData => dispatch(createTask(taskData)),
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