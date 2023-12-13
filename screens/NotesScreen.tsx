import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Note from '../components/Note';
import { useNoteContext } from '../contexts/NoteContext';

const NotesScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const { notes, addNote } = useNoteContext();

    const renderNote = ({ item }) => <Note title={item.title} content={item.content} color={item.color} />;

    useEffect(() => {
        navigation.setOptions({
            title: "Notes",
            headerRight: () => (
                <TouchableOpacity
                    style={styles.plusButton}
                    onPress={() => {
                        addNote({
                            title: "Test note",
                            content: "Text"
                        })
                    }}
                >
                    <Text style={styles.plusButtonText}>+</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                renderItem={renderNote}
                keyExtractor={(item) => item.name}
                numColumns={2}
                contentContainerStyle={styles.noteList}
            />
        </View>
    );
};

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