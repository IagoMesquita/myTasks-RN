import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {TaskList} from '../../components/TaskList';
import {useTaskList} from '../../data/Hooks/useTaskList';

export function Home() {
  const [newTask, setNewTask] = useState('');

  const {addTask} = useTaskList();

  const handleNewTask = () => {
    const data = {
      id: String(new Date().getTime()),
      title: newTask ? newTask : 'Task Vazia',
    };

    addTask(data);
    setNewTask('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Dev!</Text>
        <TextInput
          onChangeText={setNewTask}
          style={styles.input}
          value={newTask}
          selectionColor="#EBA417"
          placeholder="Nova tarefa..."
          placeholderTextColor="#555"
        />
        <TouchableOpacity
          onPress={handleNewTask}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <Text style={styles.titleTask}>Minhas Tarefas</Text>
        <TaskList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121214',
  },
  container: {
    // flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  title: {
    color: '#F1F1F1',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleTask: {
    color: '#F1F1F1',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  input: {
    backgroundColor: '#29292E',
    color: '#F1F1F1',
    padding: Platform.OS === 'ios' ? 15 : 12,
    marginTop: 30,
    borderRadius: 7,
  },
  button: {
    backgroundColor: '#EBA417',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#121214',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
