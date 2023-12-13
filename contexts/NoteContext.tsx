import React, { createContext, useState, useContext, ReactNode } from 'react';
import { NoteData } from "../types/NoteData";

interface NoteContextType {
    notes: NoteData[];
    addNote: (note: NoteData) => void;
    editNote: (note: NoteData) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

interface NoteProviderProps {
    children: ReactNode;
}

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {
    const [notes, setNotes] = useState<NoteData[]>([]);

    const addNote = (note: NoteData) => {
        setNotes((prevNotes) => [...prevNotes, note]);
    };

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

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote }}>
            {children}
        </NoteContext.Provider>
    );
};

export const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNoteContext must be used within a NoteProvider');
    }
    return context;
};
