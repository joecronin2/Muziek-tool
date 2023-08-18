import Note from "../../models/Note.ts";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useEffect, useState} from "react";

export default function RootNoteSelector({ onSelectRootNote }) {
    const notes = Note.notes;
    const handleNoteChange = (selectedNote) => {
        console.log(selectedNote)
        onSelectRootNote(new Note(selectedNote));
    }

    return (
        <div className="bg-secondary w-full self-center">
            <ToggleButtonGroup
                className="flex flex-wrap gap-4 justify-center"
                exclusive
                orientation="horizontal"
                aria-label="Note"
                onChange={handleNoteChange}
                value={selectedNote}
            >
                {notes.map((note) => (
                    <ToggleButton key={note} value={note} style={{ width: "25%" }}>
                        {note}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </div>
    );

}