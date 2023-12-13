import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Note from '../components/Note';
import NewNoteScreen from './NewNoteScreen';

const NotesScreen: React.FC = () => {
    const navigation = useNavigation();
    
    const notesData = [ //These need to be auto-incremented or making new notes is painful. This array might need to be exported for global use to add the new notes to it.
        { id: '1', title: "Note 1", content: "Note text 1", color: "lightgreen" },
        { id: '2', title: "Note 2", content: "Note text 2" },
        { id: '3', title: "Note 3", content: "Note text 3" },
        { id: '4', title: "Note 4", content: "Note text 4", color: "lightgreen" },
        { id: '5', title: "Note 5", content: "Note text 5", color: "lightgreen" },
        { id: '6', title: "Note 6", content: "Note text 6" },
        { id: '7', title: "Note 7", content: "Note text 7" },
        { id: '8', title: "Note 8", content: "Note text 8", color: "lightgreen" },
    ];

    const renderNote = ({ item }) => <Note title={item.title} content={item.content} color={item.color} />;

    useEffect(() => {
        navigation.setOptions({
            title: 'Notes',
            headerRight: () => (
                <TouchableOpacity
                    style={styles.plusButton}
                    onPress={() => {
                        navigation.navigate('NewNoteScreen') //Navigates us to a NewNoteScreen. No idea why it shows overload error.
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