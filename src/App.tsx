import Fretboard from './models/Fretboard';
import FretboardComponent from "./components/FretboardComponent.tsx";
import Note from "./models/Note.ts";
import TestControls from "./components/TestControls.tsx";
import {useState} from "react";
import NoteGroup from "./models/NoteGroup.ts";


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

    return (
        <>
            <FretboardComponent fretboard={fretboard} width={1900} height={300} />
            <TestControls updateFretboard={updateFretboard} />
        </>
    )
}


export default App
