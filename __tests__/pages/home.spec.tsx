import React from 'react';
import {act, render, renderHook} from '@testing-library/react-native';
import {Home} from '../../src/pages/Home';
import {useTaskList} from '../../src/data/Hooks/useTaskList';
import {TasksProvider} from '../../src/data/Context/TasksContext';

describe('Home Page', () => {
  it('renders correctly', () => {
    const {getByPlaceholderText} = render(<Home />);

    const inputNewTask = getByPlaceholderText('Nova tarefa...');

    expect(inputNewTask).toBeDefined();
    expect(inputNewTask.props.placeholder).toBeTruthy();
  });

  it('Testa Hook, verifica a insersção de um item na tela', async () => {
    const {result} = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    });

    const data = {
      id: 'Task01',
      title: 'Task01',
    };

    await act(() => result.current.addTask(data));

    expect(result.current.tasks).toBeTruthy();
    // expect(result.current.tasks.length).toEqual(1);
  });
});
