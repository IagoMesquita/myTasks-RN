import {useContext} from 'react';
import TasksContext from '../Context/TasksContext';

export function useTaskList() {
  const {addTask, tasks} = useContext(TasksContext);

  return {
    addTask,
    tasks,
  };
}
