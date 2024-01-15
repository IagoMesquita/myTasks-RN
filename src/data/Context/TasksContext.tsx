import React, {createContext, useEffect, useState} from 'react';
import {ITask} from '../../Types/ITasks';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  children: React.ReactNode;
}

export interface ITasksContext {
  tasks: ITask[];
  addTask(task: ITask): void;
}

const tasksKey = '@MyTasks:Tasks';

const TasksContext = createContext<ITasksContext>({} as ITasksContext);

export const TasksProvider = ({children}: IProps) => {
  const [data, setData] = useState<ITask[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const tasksList = await AsyncStorage.getItem(tasksKey);

      if (tasksList) {
        setData(JSON.parse(tasksList));
      }
      return;
    }

    loadTasks();
  }, []);

  const addTask = async (task: ITask) => {
    try {
      setData([...data, task]);
      await AsyncStorage.setItem(tasksKey, JSON.stringify(task));
    } catch (error) {
      console.log('AddTask', error);
      throw new Error(error as string);
    }
  };

  return (
    <TasksContext.Provider value={{tasks: data, addTask}}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
