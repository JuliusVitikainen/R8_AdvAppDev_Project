import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NotesScreen from './screens/NotesScreen';
import NewNoteScreen from './screens/NewNoteScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NotesScreen"
          component={NotesScreen}
          options={{
            headerTitleAlign: "center"
          }} />
        <Stack.Screen
          name= "NewNoteScreen"
          component={NewNoteScreen}
          options={{
            headerTitleAlign: "center"
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;