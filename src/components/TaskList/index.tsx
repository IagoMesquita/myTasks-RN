import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import {useTaskList} from '../../data/Hooks/useTaskList';

export function TaskList() {
  const {tasks, removeTask} = useTaskList();

  const handleRemoveTask = (id: string) => {
    Alert.alert('Tem certeza?', 'Deseja remover essa terefa?', [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Excluir',
        onPress: () => removeTask(id),
      },
    ]);
  };

  return (
    <View style={styles.containerList}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleRemoveTask(item.id)}
            key={item.id}
            style={styles.buttonTask}>
            <Text style={styles.textTask}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerList: {
    // borderWidth: 1,
    // borderColor: 'red',
    marginVertical: 'auto',
    paddingTop: 10,
    height: 500,
  },
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
