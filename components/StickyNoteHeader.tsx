import React from 'react';
import { Image, StyleSheet } from 'react-native';

const StickyNoteHeader: React.FC<{ imageUrl?: any }> = ({ imageUrl }) => {
    return (
        <Image
            source={imageUrl}
            style={styles.stickyNote}
            resizeMode="contain"
        />
    );
};

const styles = StyleSheet.create({
    stickyNote: {
        width: 40,
        height: 40,
        marginLeft: 16, 
    },
});

export default StickyNoteHeader;