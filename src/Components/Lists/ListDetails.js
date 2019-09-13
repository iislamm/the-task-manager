import React from 'react';
import { connect } from 'react-redux';
import { compose  } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { redirectUnAuthorized } from '../../store/actions/authActions';
import { Container, Grid, withStyles, Typography, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { updateTask } from '../../store/actions/tasksActions';
import TaskList from '../Tasks/TaskList';


const styles = theme => ({
    title: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    task: {
        width: '100%',
    }
})

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

    renderModeratorView = (auth, list, classes) => {
        const userExists = list.moderatorsIds.filter(m => m === auth.uid);
        if (userExists.length) {
            return (
                <div>
                    <ExpansionPanel expanded={this.state.expanded} onChange={this.handleExpansionToggle}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="manage-panel-content"
                            id="manage-panel-header"
                            >
                            <Typography className={classes.heading}>Manage List</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails> 
                            <Container maxWidth="lg">
                                <Typography variant="h4" className={classes.title}>Manage list</Typography>
                                <Grid container spacing={2}>
                                    <Grid item md={6} xs={12}>
                                            <Typography variant="h6">Name: {this.props.list.listName}</Typography>
                                            <Typography variant="h6">Moderators: {this.props.list.moderatorsEmails.join(', ')}</Typography>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Typography variant="h6">Tasks: {this.props.list.tasksCount}</Typography>
                                        <Typography variant="h6">Unchecked Tasks: {this.props.list.tasksCount - this.props.list.checkedTasks}</Typography>
                                    </Grid>
                                </Grid>
                                <div>
                                    <Button variant="contained" color="primary" className={classes.button}>Change list name</Button>
                                    <Button variant="contained" color="primary" className={classes.button}>Edit moderators</Button>
                                    <Button variant="contained" color="primary" className={classes.button}>Remove list</Button>
                                </div>
                            </Container>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            )
        }
    }

    render() {
        const { auth, classes, list } = this.props;
        if (redirectUnAuthorized(auth)) return redirectUnAuthorized(auth);
        return (
            <div>
                {/* {this.renderModeratorView(auth, list, classes)} */}
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
    withStyles(styles)
)(ListDetails);