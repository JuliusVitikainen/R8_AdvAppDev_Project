import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Note from '../components/Note';

const NotesScreen: React.FC = () => {
    const notesData = [
        { id: '1', title: 'Note 1', content: 'Note text 1' },
        { id: '2', title: 'Note 2', content: 'Note text 2' },
        { id: '3', title: 'Note 3', content: 'Note text 3' },
        { id: '4', title: 'Note 4', content: 'Note text 4' },
        { id: '5', title: 'Note 1', content: 'Note text 1' },
        { id: '6', title: 'Note 2', content: 'Note text 2' },
        { id: '7', title: 'Note 7', content: 'Note text 7' },
        { id: '8', title: 'Note 8', content: 'Note text 8' },
    ];

    const renderNote = ({ item }) => <Note title={item.title} content={item.content} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={notesData}
                renderItem={renderNote}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.noteList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    noteList: {
        paddingHorizontal: 8,
        paddingTop: 8,
    },
});

export default NotesScreen;