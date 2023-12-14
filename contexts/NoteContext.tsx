// Imports
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { NoteData } from "../types/NoteData";
interface NoteContextType {
    notes: NoteData[];
    addNote: (note: NoteData) => void;
    editNote: (note: NoteData) => void;
    deleteNote: (title: string) => void;
}
// Create a context for managing notes, initially set to undefined
const NoteContext = createContext<NoteContextType | undefined>(undefined);

// Define the properties for the NoteProvider component
interface NoteProviderProps {
    children: ReactNode;
}

// Define the NoteProvider component that provides the NoteContext
export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {
    // State to manage the list of notes
    const [notes, setNotes] = useState<NoteData[]>([]);

    // Function to add a new note to the list
    const addNote = (note: NoteData) => {
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    // Function to edit an existing note in the list
    const editNote = (updatedNote: NoteData) => {
        setNotes((prevNotes) => {
            const index = prevNotes.findIndex((note) => note.id === updatedNote.id);

            if (index !== -1) {
                const updatedNotes = [...prevNotes];
                updatedNotes[index] = { ...updatedNotes[index], ...updatedNote };
                return updatedNotes;
            }

            return prevNotes;
        });
    };

    // Function to delete a note from the list based on its title
    const deleteNote = (titleToDelete: string) => { // This does not do anything currently.
        setNotes((prevNotes) => prevNotes.filter((note) => note.title !== titleToDelete));
    };

    // Provide the NoteContext with the defined values and pass down the children components
    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
            {children}
        </NoteContext.Provider>
    );
};

// Custom hook to use the NoteContext within components
export const useNoteContext = () => {
    // Access the NoteContext
    const context = useContext(NoteContext);

    // Throw an error if useNoteContext is not used within a NoteProvider
    if (!context) {
        throw new Error('useNoteContext must be used within a NoteProvider');
    }

    // Return the context values
    return context;
};
