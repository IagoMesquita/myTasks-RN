import {useContext} from 'react';
import TasksContext from '../Context/TasksContext';

export function useTaskList() {
  const {addTask, removeTask, tasks} = useContext(TasksContext);

  return {
    addTask,
    removeTask,
    tasks,
  };
}
