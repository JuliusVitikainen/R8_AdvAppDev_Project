import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface NoteProps {
    title: string;
    content: string;
    color?: string;
}

const { width } = Dimensions.get('window');
const noteSize = (width - 32) / 2 - 16;
const maxLines = 6;

const Note: React.FC<NoteProps> = ({ title, content, color = "lightblue" }) => {
    return (
        <View style={[styles.note, { width: noteSize, height: noteSize, backgroundColor: color }]}>
            <Text style={styles.title}>{title}</Text>
            <Text numberOfLines={maxLines} style={styles.content}>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    note: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        marginBottom: 16,
        aspectRatio: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        fontSize: 16,
    },
});

export default Note;