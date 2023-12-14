import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Note from '../components/Note';
import { useNoteContext } from '../contexts/NoteContext';
import StickyNoteHeader from '../components/StickyNoteHeader';

const NotesScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const { notes } = useNoteContext();

    const renderNote = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('EditNoteScreen', { note: item });
            }}
        >
            <Note title={item.title} content={item.content} color={item.color} />
        </TouchableOpacity>
    );

    useEffect(() => {
        navigation.setOptions({
            title: "Notes",
            headerLeft: () => (
                <StickyNoteHeader imageUrl={{ uri: "https://static.vecteezy.com/system/resources/previews/021/880/376/original/colored-post-it-note-paper-rounded-edges-sticky-notes-for-reminders-png.png" }} />
            ),
            headerRight: () => (
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