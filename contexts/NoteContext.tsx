import React, { createContext, useState, useContext, ReactNode } from 'react';
import { NoteData } from "../types/NoteData";

interface NoteContextType {
    notes: NoteData[];
    addNote: (note: NoteData) => void;
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

    return (
        <NoteContext.Provider value={{ notes, addNote }}>
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
