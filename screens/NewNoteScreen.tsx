import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNoteContext } from '../contexts/NoteContext'; 
import { useNavigation } from '@react-navigation/native';

const NewNoteScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    useEffect(() => {
        navigation.setOptions({
            title: "Add Note"
        });
    }, [navigation]);
    
    const { addNote } = useNoteContext();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [color, setColor] = useState('lightblue');

    const handleAddNote = () => {
        if (title.trim() !== '' && content.trim() !== '') {
            addNote({
                title,
                content,
                color,
            });
            navigation.navigate("NotesScreen");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.titleInput}
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <TextInput
                style={styles.largeInput}
                placeholder="Content"
                value={content}
                onChangeText={(text) => setContent(text)}
                multiline
            />
            <TextInput
                style={styles.titleInput}
                placeholder="Color"
                value={color}
                onChangeText={(text) => setColor(text)}
            />
            <Button title="Add Note" onPress={handleAddNote} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    titleInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    largeInput: {
        height: 120,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        textAlignVertical: 'top',
    },
});

export default NewNoteScreen;