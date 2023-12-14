import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
import { useNoteContext } from '../contexts/NoteContext'; 
import { useNavigation } from '@react-navigation/native';

const NewNoteScreen: React.FC = () => {
  // Access the navigation object using the useNavigation hook
  const navigation = useNavigation<any>();

  // useEffect hook to set options for the navigation header
  useEffect(() => {
      navigation.setOptions({
          title: "Add Note"
      });
  }, [navigation]);
  
  // Access the addNote function from the NoteContext using the useNoteContext hook
  const { addNote } = useNoteContext();

  // State variables to manage the title, content, color, and ID of the new note
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('lightblue');
  const [id, setId] = useState();

  // Array of color options for the new note
  const colorOptions = [
      { label: "Blue", value: "lightblue" },
      { label: "Green", value: "lightgreen" },
      { label: "Yellow", value: "#fff69b" },
      { label: "Pink", value: "#f6c2d9" },
  ];

  // Function to handle color selection for the new note
  const handleColorSelect = (color) => {
      setColor(color);
  };

  // Function to handle the ID of the new note
  const handleID = (id) => {
      setId(id)
  }

  // Function to render individual color options for the new note
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

  // Initialize the previous ID for the new note
  const previousID = 0;

  // State variable to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle the addition of a new note
  const handleAddNote = () => {
      handleID(previousID + 1);
      if (title.trim() !== '' && content.trim() !== '') {
          addNote({
              id,
              title,
              content,
              color,
          });
          
          // Show the modal after adding the note
          setModalVisible(true);

          // Navigate back to the NotesScreen after adding the note
          navigation.navigate("NotesScreen");
      }
  };

  // Return the main view of the NewNoteScreen
  return (
      <View style={styles.container}>
          {/* Input field for the title of the new note */}
          <TextInput
              style={styles.titleInput}
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
          />
          {/* Input field for the content of the new note */}
          <TextInput
              style={styles.largeInput}
              placeholder="Content"
              value={content}
              onChangeText={(text) => setContent(text)}
              multiline
          />
          {/* Container for rendering color options for the new note */}
          <View style={styles.colorOptionsContainer}>
              {colorOptions.map(renderColorOption)}
          </View>
          {/* Button to trigger the addition of the new note */}
          <Button title="Add Note" onPress={handleAddNote} />
          {/* Render the modal */}
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
               alert('Modal has been closed.');
              }}>
              <View style={{ marginTop: 160 }}>
               <View>
                  <Text style={styles.noteAddedText}>Note Added</Text>
                  <Button
                      title="Close"
                      onPress={() => {
                          setModalVisible(!modalVisible);
                      }}
                  />
               </View>
              </View>
          </Modal>
      </View>
  );
};

// Define styles for the NewNoteScreen component
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
  noteAddedText: {
      fontSize: 24,
      fontWeight: 'bold', 
      textAlign: 'center', 
      marginBottom: 20, 
  },
});

export default NewNoteScreen;
