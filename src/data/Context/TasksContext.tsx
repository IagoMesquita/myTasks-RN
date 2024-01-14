import React, {createContext} from 'react';
import {ITask} from '../../Types/ITasks';

interface IProps {
  children: React.ReactNode;
}

export interface ITasksContext extends ITask {
  addTask(): void;
}

const TasksContext = createContext<ITasksContext>({} as ITasksContext);

export const TasksProvider = ({children}: IProps) => {

  return <TasksContext.Provider value={}>{children}</TasksContext.Provider>;
};

export default TasksContext;
