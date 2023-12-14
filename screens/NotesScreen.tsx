// Imports
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Note from '../components/Note';
import { useNoteContext } from '../contexts/NoteContext';
import StickyNoteHeader from '../components/StickyNoteHeader';

// Define the functional component for the NotesScreen
const NotesScreen: React.FC = () => {
    // Access the navigation object using the useNavigation hook
    const navigation = useNavigation<any>();

    // Access the notes data from the NoteContext using the useNoteContext hook
    const { notes } = useNoteContext();

    // Function to render an individual note in the FlatList
    const renderNote = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                // Navigate to the EditNoteScreen with the selected note as a parameter
                navigation.navigate('EditNoteScreen', { note: item });
                console.log('Keys:', notes.map((item) => item.id));
                console.log(notes[0].id)
            }}
        >
            {/* Render the Note component with title, content, and color from the note */}
            <Note title={item.title} content={item.content} color={item.color} />
        </TouchableOpacity>
    );

    // useEffect hook to set options for the navigation header
    useEffect(() => {
        navigation.setOptions({
            title: "Notes",
            headerLeft: () => (
                <StickyNoteHeader imageUrl={{ uri: "https://static.vecteezy.com/system/resources/previews/021/880/376/original/colored-post-it-note-paper-rounded-edges-sticky-notes-for-reminders-png.png" }} />
            ),
            headerRight: () => (
                // Render a "+" button on the header to navigate to the NewNoteScreen
                <TouchableOpacity
                    style={styles.plusButton}
                    onPress={() => {
                        navigation.navigate("NewNoteScreen");
                    }}
                >
                    <Text style={styles.plusButtonText}>+</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    // Return the main view of the NotesScreen
    return (
        <View style={styles.container}>
            {/* Render a FlatList of notes with 2 columns */}
            <FlatList
                data={notes}
                renderItem={renderNote}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.noteList}
            />
        </View>
    );
};

// Define the styles for the NotesScreen component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    noteList: {
        paddingHorizontal: 8,
        paddingTop: 8,
    },
    plusButton: {
        marginRight: 16,
    },
    plusButtonText: {
        fontSize: 24,
        color: "blue"
    },
});

export default NotesScreen;
