// Import necessary components from React Native and navigation libraries
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import the custom types for navigation parameters
import { StackParamList } from './types/Navigation';

// Import screens and context provider for notes
import NotesScreen from './screens/NotesScreen';
import NewNoteScreen from './screens/NewNoteScreen';
import EditNoteScreen from './screens/EditNoteScreen';
import { NoteProvider } from './contexts/NoteContext';

// Create a stack navigator using the specified parameter list type
const Stack = createStackNavigator<StackParamList>();

// Define the main React functional component for the app
const App: React.FC = () => {
  return (
    // Wrap the entire app in a NavigationContainer for navigation functionality
    <NavigationContainer>
      {/* Provide the NoteContext to the entire app using NoteProvider */}
      <NoteProvider>
        {/* Define the stack navigator with initial options and routes */}
        <Stack.Navigator
          // Set common options for all screens in the navigator
          screenOptions={() => ({
            headerTitleAlign: 'center',
          })}
          // Set the initial route for the navigator
          initialRouteName={"NotesScreen"}
        >
          {/* Define individual screens in the stack navigator */}
          <Stack.Screen name="NotesScreen" component={NotesScreen} />
          <Stack.Screen name="NewNoteScreen" component={NewNoteScreen} />
          <Stack.Screen name="EditNoteScreen" component={EditNoteScreen} />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
};

export default App;
