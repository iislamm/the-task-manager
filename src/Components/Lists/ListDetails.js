import React from 'react';
import { connect } from 'react-redux';
import { compose  } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { redirectUnAuthorized } from '../../store/actions/authActions';
import { updateTask } from '../../store/actions/tasksActions';
import TaskList from '../Tasks/TaskList';

class ListDetails extends React.Component {
	state = {
		expanded: false,
	}

	handleTaskCheckToggle = task => {
		this.props.updateTask(task.id, { checked: !task.checked });
	}

	handleExpansionToggle = e => {
		this.setState({ expanded: !this.state.expanded })
	}

	render() {
		const { auth, list } = this.props;
		if (redirectUnAuthorized(auth)) return redirectUnAuthorized(auth);
		return (
			<div>
				<TaskList list={list.id} />
			</div>
		)

	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		tasks: state.firestore.ordered.tasks,
		lists: state.firestore.ordered.lists,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateTask: (taskId, updates) => dispatch(updateTask(taskId, updates))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((props, store) => [{
		collection: 'tasks',
		where: ['list', '==', props.list.id]
	}]),
)(ListDetails);