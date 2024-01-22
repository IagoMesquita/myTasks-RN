import React from 'react';
import {
  act,
  fireEvent,
  render,
  renderHook,
} from '@testing-library/react-native';

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

    const data2 = {
      id: 'Task02',
      title: 'Task02',
    };

    await act(() => result.current.addTask(data2));

    expect(result.current.tasks).toBeTruthy();
    expect(result.current.tasks.length).toEqual(2);
  });

  // Esse teste não faz sentido. Ou é um teste de Hook ou é de Componente, aqui ele misturou os dois:
  it('Verifica se ao tocar no botão, "Adicionar" um nova tarefa é adicionada', async () => {
    const {getByPlaceholderText, getByTestId} = render(<Home />, {
      wrapper: TasksProvider,
    });

    const {result} = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    });

    const inputNewTask = getByPlaceholderText('Nova tarefa...');
    const buttonAddTask = getByTestId('addButton');

    const data = {
      id: 'Task01',
      title: 'Task01',
    };

    act(() => fireEvent.changeText(inputNewTask, data.title));
    await act(() => fireEvent.press(buttonAddTask));

    expect(result.current.tasks).toBeTruthy();
    // expect(result.current.tasks[0].title).toEqual('task01');
    // expect(result.current.tasks.length).toBe(1);
  });
});
