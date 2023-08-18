import {Autocomplete, createTheme, TextField, ToggleButton, ToggleButtonGroup, useTheme} from "@mui/material";
import React, {useState} from "react";
import Scale from "../models/Scale.ts";
import Chord from "../models/Chord.ts";
import Note from "../models/Note.ts";
import Fretboard from "../models/Fretboard.ts";
import NoteGroup from "../models/NoteGroup.ts";



export default function MUIControls({ updateFretboard, fretboard }) {
    const [selectedNote, setSelectedNote] = useState("");
    const [selectedScale, setSelectedScale] = useState(null);
    const [selectedChord, setSelectedChord] = useState(null);
    const [fretsAmount, setFretsAmount] = useState(fretboard.getFretCount()); // Set the initial value
    const [selectedTuning, setSelectedTuning] = useState(fretboard.getTuningString()); // Set the initial value

    const noteButtons = Note.notes.map((note, index) => (
        <ToggleButton key={index} value={note}>
            {note}
        </ToggleButton>
    ));

    const chordButtons = Object.keys(Chord.CHORD_INTERVALS).map((chordName, index) => (
        <ToggleButton key={index} value={chordName}>
            {chordName.replace(/_/g, " ")}
        </ToggleButton>
    ));

    const chordAutocompleteOptions = Object.keys(Chord.CHORD_INTERVALS).map((chordName, index) => (
        chordName.replace(/_/g, " ")
    ));

    const scaleButtons = Object.keys(Scale.SCALE_INTERVALS).map((scaleName, index) => (
        <ToggleButton key={index} value={scaleName}>
            {scaleName.replace(/_/g, " ")}
        </ToggleButton>
    ));

    const handleNoteChange = (event, newNote) => {
        setSelectedNote(newNote);
        setSelectedChord(null); // Reset selected chord
        setSelectedScale(null); // Reset selected scale


        console.log(newNote, selectedChord, selectedScale)
    };

    const handleChordChange = (event, newChord) => {
        setSelectedChord(newChord);
        setSelectedScale(null); // Reset selected scale

        console.log(fretsAmount)

        if (selectedNote !== null) {
            const newNoteGroup = new NoteGroup(new Note(selectedNote), Chord.CHORD_INTERVALS[newChord.toLowerCase()])
            console.log(fretsAmount)
            const newFretboard = new Fretboard(fretboard.tuning, fretsAmount, newNoteGroup)
            // console.log(newFretboard.toString())
            updateFretboard(newFretboard)
        }



        console.log(selectedNote, newChord, selectedScale)

    };

    const handleScaleChange = (event, newScale) => {
        setSelectedChord(null); // Reset selected chord
        setSelectedScale(newScale);

        const newNoteGroup = new NoteGroup(new Note(selectedNote), Scale.SCALE_INTERVALS[newScale.toLowerCase()])
        const newFretboard = new Fretboard(fretboard.tuning, fretsAmount, newNoteGroup)
        updateFretboard(newFretboard)

        console.log(selectedNote, selectedChord, newScale)

    };

    const handleFretsAmountChange = (event) => {
        const newFretsAmount = +event.target.value+1; // +1 because the first fret (0) is also counted

        setFretsAmount((newFretsAmount) => {
            return newFretsAmount
        }); // Update the state

        console.log("After: " + fretsAmount);

        const newFretboard = new Fretboard(fretboard.tuning, newFretsAmount, undefined);
        updateFretboard(newFretboard);
    }

    const handleTuningChange = (event) => {
        setSelectedTuning(event.target.value);
        const parsedTuning = Note.parseNotes(event.target.value)
        const octaveAdjustedTuning = Fretboard.adjustExpectedOctavesForTuning(parsedTuning)

        const newFretboard = new Fretboard(octaveAdjustedTuning, fretsAmount, undefined)
        updateFretboard(newFretboard)
    }




    return (
        <div className={"flex flex-col gap-4"}>
            <h1 className={"text-2xl text-tertiary"}>Root Note:</h1>
            <ToggleButtonGroup
                orientation={"horizontal"}
                className={"bg-tertiary"}
                value={selectedNote}
                exclusive
                onChange={handleNoteChange}
                aria-label="Note"
            >
                {noteButtons}
            </ToggleButtonGroup>

            <h1 className={"text-2xl text-tertiary"}>Chord:</h1>
            <ToggleButtonGroup
                className={"flex flex-row flex-wrap w-1/2 bg-tertiary"}
                orientation={"horizontal"}
                value={selectedChord}
                exclusive
                onChange={handleChordChange}
                aria-label="Chord"
            >
                {chordButtons}
            </ToggleButtonGroup>

            {/*<Autocomplete*/}
            {/*    disablePortal*/}
            {/*    id="combo-box-demo"*/}
            {/*    options={chordAutocompleteOptions}*/}
            {/*    sx={{ width: 300 }}*/}
            {/*    renderInput={(params) => <TextField {...params} label="Chord"*/}
            {/*    onChange={handleChordChange}*/}
            {/*    />}*/}
            {/*/>*/}

            <h1 className={"text-2xl text-tertiary"}>Scale:</h1>
            <ToggleButtonGroup
                orientation={"horizontal"}
                className={"bg-tertiary"}
                value={selectedScale}
                exclusive
                onChange={handleScaleChange}
                aria-label="Scale"
            >
                {scaleButtons}
            </ToggleButtonGroup>

            <TextField
                className={"w-20"}
                id="outlined-number"
                label="Frets"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                defaultValue={fretsAmount}
                onChange={handleFretsAmountChange}
            />

            <TextField
                className={"w-32"}
                id="outlined-textarea"
                label="Tuning"
                type="text"
                InputLabelProps={{
                    shrink: true,
                }}
                defaultValue={selectedTuning}
                onChange={handleTuningChange}
            />

        </div>
    )
}
