import Fretboard from './models/Fretboard';
import FretboardComponent from "./components/FretboardComponent.tsx";
import Note from "./models/Note.ts";
import TestControls from "./components/TestControls.tsx";
import React, {useState} from "react";
import NoteGroup from "./models/NoteGroup.ts";
import NoteSelector from "./components/ButtonLayout.tsx";
import ButtonLayout from "./components/ButtonLayout.tsx";
import Scale from "./models/Scale.ts";
import {Button, ToggleButton, ToggleButtonGroup} from '@mui/material';

function App() {
    const tuning: Note[] = Note.parseNotes("D A E A C# E")
    const amountFrets = 24


    const [fretboard, setFretboard] = useState(
        new Fretboard()
    )

    function updateFretboard(fretboard: Fretboard) {
        // console.log(fretboard)
        setFretboard(fretboard);
        // console.log(fretboard)
    }

    // const fretboard: Fretboard = new Fretboard(Note.parseNotes("D A E A C# E"), undefined, new Scale(new Note ("C"), Scale.MAJOR))
    // const fretboard = new Fretboard()

    const scales = Object.keys(Scale.SCALE_INTERVALS)

    return (
        <>
            {/*<FretboardComponent fretboard={fretboard} width={1900} height={300} />*/}
            {/*<TestControls updateFretboard={updateFretboard} />*/}
            {/*<h1 className={"text-2xl text-blue-500"}>TEST</h1>*/}

            {/*<div className={"flex gap-5"}>*/}
            {/*    <ButtonLayout options={Note.notes} />*/}
            {/*    <ButtonLayout options={scales}/>*/}
            {/*</div>*/}

            <ToggleButtonGroup
                orientation={"vertical"}
                color="primary"
                // value={alignment}
                exclusive
                // onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
            </ToggleButtonGroup>



        </>
    )
}


export default App
