import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Note from '../components/Note';
import { useNoteContext } from '../contexts/NoteContext';

const EditNotesScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const { notes } = useNoteContext();

    useEffect(() => {
        navigation.setOptions({
            title: "Edit Note"
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>Add Functionality Here</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
});

export default EditNotesScreen;