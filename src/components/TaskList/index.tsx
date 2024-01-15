import {StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import TasksContext from '../../data/Context/TasksContext';

export function TaskList() {
  const {tasks} = useContext(TasksContext);

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity key={item.id} style={styles.buttonTask}>
          <Text style={styles.textTask}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  buttonTask: {
    backgroundColor: '#29292E',
    padding: 10,
    marginTop: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  textTask: {
    color: '#F1F1F1',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
