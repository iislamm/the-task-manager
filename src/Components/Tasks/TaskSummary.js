import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { updateTask } from '../../store/actions/tasksActions';
import { useDispatch } from 'react-redux';

export default function TaskSummary(props) {
  const [task, setTask] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!task) {
      setTask(props.task);
    }
    return () => {
      if (task !== props.task) {
        dispatch(updateTask(task.id, task));
      }
    };
  }, [task, setTask, dispatch, props]);

  const handleChange = e => {
    const updatedTask = task;
    if (e.target.id === 'taskName') {
      updatedTask.taskName = e.target.value;
    } else if (e.target.id === 'taskDescription') {
      updatedTask.taskDescription = e.target.value;
    }
    setTask(updatedTask);
  };

  return (
    <div>
      <TextField
        id='taskName'
        value={task.taskName}
        onChange={handleChange}
        fullWidth
        label='Task title'
      />
      <TextField
        id='taskDescription'
        label='Description...'
        multiline
        rows={4}
        fullWidth
        value={task.taskDescription}
        onChange={handleChange}
      />
      <div>
        <Typography variant='caption'>Creator: {task.creatorEmail}</Typography>
      </div>
    </div>
  );
}
