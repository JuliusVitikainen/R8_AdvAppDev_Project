import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackParamList } from './types/Navigation';
import NotesScreen from './screens/NotesScreen';
import NewNoteScreen from './screens/NewNoteScreen';
import { NoteProvider } from './contexts/NoteContext';

const Stack = createStackNavigator<StackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={() => ({
            headerTitleAlign: 'center',
          })}
          initialRouteName={"NotesScreen"}
        >
          <Stack.Screen name="NotesScreen" component={NotesScreen} />
          <Stack.Screen name= "NewNoteScreen" component={NewNoteScreen} />

        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
};

export default App;