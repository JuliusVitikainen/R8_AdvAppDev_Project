import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Note from '../components/Note';

const NewNoteScreen: React.FC = () => {
    const navigation = useNavigation();

    const newNote = [
        {id: '9', title: "Note 9", content: "Note Text 9" }
    ];

    const renderNote = ({ item }) => <Note title={item.title} content={item.content} color={item.color} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={newNote}
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

export default NewNoteScreen;