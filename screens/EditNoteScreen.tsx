import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useNoteContext } from '../contexts/NoteContext';

const EditNotesScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { editNote, deleteNote } = useNoteContext();
    const route = useRoute();
    const { note }  = route.params;

    const colorOptions = [
        { label: "Blue", value: "lightblue" },
        { label: "Green", value: "lightgreen" },
        { label: "Yellow", value: "#fff69b" },
        { label: "Pink", value: "#f6c2d9" },
    ];

    const handleColorSelect = (color) => {
        // Update the selected color for the edited note
        setEditedColor(color);
    };

    const renderColorOption = (colorOption) => (
        <TouchableOpacity
            key={colorOption.value}
            style={[
                styles.colorOption,
                { backgroundColor: colorOption.value },
                editedColor === colorOption.value && styles.selectedColorOption,
            ]}
            onPress={() => handleColorSelect(colorOption.value)}
        />
    );

    useEffect(() => {
        // Set options for the navigation header
        navigation.setOptions({
            title: "Edit Note",
        });
    }, [navigation]);

    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedContent, setEditedContent] = useState(note.content);
    const [editedColor, setEditedColor] = useState(note.color);

    useEffect(() => {
        // Update state variables when the note prop changes
        setEditedTitle(note.title);
        setEditedContent(note.content);
        setEditedColor(note.color);
    }, [note]);

    const handleUpdateNote = () => {
        // Update the note with the edited information
        editNote({
            id: note.id,
            title: editedTitle,
            content: editedContent,
            color: editedColor,
        });
        // Navigate back to the NotesScreen
        navigation.navigate("NotesScreen");
    };

    const handleDeleteNote = () => {
        // Display an alert to confirm the deletion of the note
        Alert.alert(
            "Delete Note",
            "Are you sure you want to delete this note?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        // Delete the note and navigate back to the NotesScreen
                        deleteNote(note.title);
                        navigation.navigate("NotesScreen");
                    },
                    style: "destructive",
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            {/* Input field for the title of the edited note */}
            <TextInput
                style={styles.titleInput}
                placeholder="Title"
                value={editedTitle}
                onChangeText={(text) => setEditedTitle(text)}
            />
            {/* Input field for the content of the edited note */}
            <TextInput
                style={styles.largeInput}
                placeholder="Content"
                value={editedContent}
                onChangeText={(text) => setEditedContent(text)}
                multiline
            />
            {/* Container for rendering color options for the edited note */}
            <View style={styles.colorOptionsContainer}>
                {colorOptions.map(renderColorOption)}
            </View>
            {/* Container for update and delete buttons */}
            <View style={styles.buttonContainer}>
                {/* Button to trigger the update of the edited note */}
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdateNote}>
                    <Text style={styles.buttonText}>Update Note</Text>
                </TouchableOpacity>
                {/* Button to trigger the deletion of the edited note */}
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteNote}>
                    <Text style={styles.buttonText}>Delete Note</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Define styles for the EditNotesScreen component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
        justifyContent: 'space-between',
    },
    titleInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 8,
    },
    largeInput: {
        flex: 1,
        height: 120,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 30,
        paddingHorizontal: 12,
        textAlignVertical: 'top',
    },
    colorOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "gray"
    },
    selectedColorOption: {
        borderColor: 'blue',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    updateButton: {
        backgroundColor: '#71aef2',
        padding: 10,
        borderRadius: 8,
    },
    deleteButton: {
        backgroundColor: '#ea5645',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default EditNotesScreen;
