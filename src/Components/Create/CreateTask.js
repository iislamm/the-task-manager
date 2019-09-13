import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Paper, Typography, TextField, Container, Button, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { redirectUnAuthorized } from '../../store/actions/authActions';
import { showError, showSuccessMessage } from '../../store/actions/globalActions';
import { createTask, closeCreateTaskDialog } from '../../store/actions/tasksActions';
import { openListCreateDialog } from '../../store/actions/listsActions';

const styles = theme => ({
    root: {
        padding: theme.spacing(5),
        marginTop: theme.spacing(5),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    input: {
        marginBottom: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(2),
    }
});

class CreateTask extends React.Component {
    state = {
        list: '',
        taskName: '',
        taskDescription: '',
        chargedUsersEmails: []
    }

    handleUserChange = e => {
        const chargedUsersEmails = e.target.value.replace(/\s/g, '').split(',');
        const lastElement = chargedUsersEmails.length - 1;
        if (chargedUsersEmails[lastElement].length === 0) {
          chargedUsersEmails.pop();
        }
        this.setState({ 
            chargedUsersEmails
         });
      }

      handleChange = e => {
        if (e.target.value !== 'create') {
            this.setState({
                [e.target.name]: e.target.value
            });
        } else {
            this.props.openCreateListDialog();
        }
      }

      handleSubmit = e => {
        e.preventDefault();
        if (this.state.list) {
            this.setState({ list: this.state.list.id }, () => {
                console.log(this.state)
                this.props.createTask(this.state);
                this.props.closeCreateTaskDialog();
            });
        }
      }

    render() {
        const { classes, auth, error, success, lists, currentList } = this.props;
        console.log(lists);
        if (redirectUnAuthorized(auth)) return redirectUnAuthorized(auth);
        if (!this.state.list && currentList) {
            this.setState({ list: currentList });
        }
        return (
            <Container maxWidth="sm">
                <Paper className={classes.root}>
                    <Typography variant="h6" className={classes.title}>Create a task</Typography>
                    {error ? showError(error) : null}
                    { success ? showSuccessMessage("Task created successfully") : null }
                <form onSubmit={this.handleSubmit}>
                    <FormControl className={classes.formControl} required fullWidth>
                        <InputLabel htmlFor="list">List</InputLabel>
                        <Select
                        value={this.state.list}
                        id="list"
                        inputProps={{
                            name: 'list',
                            id: 'list'
                        }}
                        onChange={this.handleChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {lists.map(list => (
                            <MenuItem key={list.id} value={list}>{list.listName}</MenuItem>
                        )
                        )}
                            <MenuItem value='create'>Create a new list</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                    id="taskName"
                    name="taskName"
                    label="Task name"
                    onChange={this.handleChange}
                    fullWidth
                    required
                    className={classes.input}
                    value={this.state.taskName}
                    />
                    <TextField
                    id="taskDescription"
                    name="taskDescription"
                    label="Task description"
                    onChange={this.handleChange}
                    fullWidth
                    value={this.state.taskDescription}
                    className={classes.input}
                    />
                    
                    <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    className={classes.button}>
                        Create
                    </Button>
                </form>
                </Paper>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        error: state.tasks.create.error,
        success: state.tasks.create.success,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createTask: taskData => dispatch(createTask(taskData)),
        openCreateListDialog: () => dispatch(openListCreateDialog()),
        closeCreateTaskDialog: () => dispatch(closeCreateTaskDialog()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateTask));