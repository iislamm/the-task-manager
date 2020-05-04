import React, {Component} from 'react'
import { Typography } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import {updateTask} from "../../store/actions/tasksActions";
import {compose} from 'redux';
import {connect} from 'react-redux';

const styles = theme => ({
	root: {},
});

class TaskSummary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			...this.props.task
		}
	}

	componentWillUnmount = () => {
		if (this.state !== this.props.task) {
			this.props.updateTask(this.state.id, this.state)
		}
	}

	renderChargedUsers = task => {
		const chargedUsers = task.chargedUsersEmails;
		if (chargedUsers.length > 0) {
			let chargedUsersLeft = chargedUsers.length;
			return (
				<div>
					<Typography color="inherit" variant="caption" display="inline">Assigned to: </Typography>
					{chargedUsers.map(m => (
						<Typography key={m} variant="caption"
												display="inline">{m} {--chargedUsersLeft === 0 ? '' : ', '}</Typography>
					))}
				</div>
			)

		}
	}

	handleChange = e => {
		this.setState({ [e.target.id]: e.target.value })
	}

	render() {
		const {task, classes} = this.props;
		return (
			<div className={classes.root}>
				<TextField id="taskName"
									 value={this.state.taskName}
									 onChange={this.handleChange}
									 fullWidth
									 label="Task title"/>
				<TextField id="taskDescription"
									 label="Description..."
									 multiline
									 rows={4}
									 fullWidth
									 value={this.state.taskDescription}
									 onChange={this.handleChange}/>
				<div>
					<Typography variant="caption">Creator: {task.creatorEmail}</Typography>
				</div>
				{this.renderChargedUsers(task)}
				<br/>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateTask: (taskId, updates) => dispatch(updateTask(taskId, updates))
	}
}

export default compose(
	connect(null, mapDispatchToProps),
	withStyles(styles)
)(TaskSummary);