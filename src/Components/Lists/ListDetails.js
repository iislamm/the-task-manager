import TaskList from '../Tasks/TaskList';

export default function ListDetails(props) {
  const { list } = props;

  return (
    <div>
      <TaskList list={list.id} />
    </div>
  );
}
