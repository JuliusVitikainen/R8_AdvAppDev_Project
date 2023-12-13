import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
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

    const colorOptions = [
        { label: "Blue", value: "lightblue" },
        { label: "Green", value: "lightgreen" },
        { label: "Yellow", value: "#fff69b" },
        { label: "Pink", value: "#f6c2d9" },
    ];

    const handleColorSelect = (color) => {
        setColor(color);
    };

    const renderColorOption = (colorOption) => (
        <TouchableOpacity
            key={colorOption.value}
            style={[
                styles.colorOption,
                { backgroundColor: colorOption.value },
                color === colorOption.value && styles.selectedColorOption,
            ]}
            onPress={() => handleColorSelect(colorOption.value)}
        />
    );

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
            <View style={styles.colorOptionsContainer}>
                {colorOptions.map(renderColorOption)}
            </View>
            <Button title="Add Note" onPress={handleAddNote} />
        </View>
    );
};

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
        marginBottom: 30,
        paddingHorizontal: 8,
    },
    largeInput: {
        flex: 1,
        height: 120,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 30,
        paddingHorizontal: 8,
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
});

export default NewNoteScreen;