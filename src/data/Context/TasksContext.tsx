import React, {createContext} from 'react';
import {ITask} from '../../Types/ITasks';

interface IProps {
  children: React.ReactNode;
}

export interface ITasksContext {
  tasks: ITask[];
  addTask(task: ITask): void;
}

const TasksContext = createContext<ITasksContext>({} as ITasksContext);

const tasks = [{id: '1', title: 'Task 01'}];

export const TasksProvider = ({children}: IProps) => {
  const addTask = (task: ITask) => {
    console.log('nova task added');
  };

  return (
    <TasksContext.Provider value={{tasks, addTask}}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
