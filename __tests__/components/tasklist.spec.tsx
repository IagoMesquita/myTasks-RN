import React from 'react';
import {render, renderHook} from '@testing-library/react-native';
import {TasksProvider} from '../../src/data/Context/TasksContext';
import {TaskList} from '../../src/components/TaskList';
import {useTaskList} from '../../src/data/Hooks/useTaskList';
import {act} from 'react-test-renderer';

describe('Tasklist Component', () => {
  it('Verifica se um item é removido da lista de tarefas', async () => {
    render(<TaskList />, {
      wrapper: TasksProvider,
    });

    const {result} = renderHook(() => useTaskList(), {wrapper: TasksProvider});

    const data = {id: 'task01', title: 'task01'};
    await act(() => result.current.addTask(data));

    expect(result.current.tasks[0].title).toEqual('task01');
    expect(result.current.tasks.length).toEqual(1);

    await act(() => result.current.removeTask(data.id));

    expect(result.current.tasks.length).toEqual(0);

  });
});
