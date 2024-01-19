import React, {createContext, useEffect, useState} from 'react';
import {ITask} from '../../Types/ITasks';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  children: React.ReactNode;
}

export interface ITasksContext {
  tasks: ITask[];
  addTask(task: ITask): void;
  removeTask(id: String): void;
}

const tasksKey = '@MyTasks:Tasks';

export const TasksContext = createContext<ITasksContext>({} as ITasksContext);

export const TasksProvider = ({children}: IProps) => {
  const [data, setData] = useState<ITask[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const tasksList = await AsyncStorage.getItem(tasksKey);
      console.log('useEffect', tasksList);
      if (tasksList) {
        setData([...JSON.parse(tasksList)]);
      }
    }

    loadTasks();
  }, []);

  const addTask = async (task: ITask) => {
    console.log('Task:', task);
    console.log('Task:', typeof task);
    console.log('Data:', data);
    console.log('Data:', typeof data);
    try {
      const newTaskList = [...data, task];
      setData(newTaskList);
      await AsyncStorage.setItem(tasksKey, JSON.stringify(newTaskList));
    } catch (error) {
      console.log('AddTask', error);
      throw new Error(error as string);
    }
  };

  const removeTask = async (id: String) => {
    const newTaskList = data.filter(task => task.id !== id);
    setData(newTaskList);
    await AsyncStorage.setItem(tasksKey, JSON.stringify(newTaskList));
  };

  return (
    <TasksContext.Provider value={{tasks: data, addTask, removeTask}}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
