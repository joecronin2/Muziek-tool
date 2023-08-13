import Note from "../models/Note.ts";
import Chord from "../models/Chord.ts";
import Fretboard from "../models/Fretboard.ts";
import NoteGroup from "../models/NoteGroup.ts";
import Scale from "../models/Scale.ts";
import {useState} from "react";

export default function TestControls({ updateFretboard, fretboard }) {

    const [fretsAmount, setFretsAmount] = useState(24); // Set the initial value



    function applyNotes() {
        // get radios
        const customNotesRadio = document.getElementById("customNotesRadio") as HTMLInputElement
        const chordTypeRadio = document.getElementById("chordTypeRadio") as HTMLInputElement
        const scaleTypeRadio = document.getElementById("scaleTypeRadio") as HTMLInputElement

        // get select and input values
        const customNotes = document.getElementById("customNotes") as HTMLInputElement
        const chordType = document.getElementById("chordType") as HTMLSelectElement
        const scaleType = document.getElementById("scaleType") as HTMLSelectElement

        // get root note
        const rootNoteElement = document.getElementById("rootNote") as HTMLSelectElement
        const rootNote = new Note(rootNoteElement.value)

        // get tuning
        const tuningElement = document.getElementById("tuning") as HTMLInputElement
        let tuningStr = tuningElement.value

        let tuning
        if (tuningStr === "") {
            tuning = Note.parseNotes("E A D G B E")
        } else {
            tuning = Note.parseNotes(tuningStr)
        }

        // get frets amount, if int can be parsed use that, else use default 24
        const fretsAmountElement = document.getElementById("fretsAmount") as HTMLInputElement
        let fretsAmount = parseInt(fretsAmountElement.value)
        if (isNaN(fretsAmount)) {
            fretsAmount = 24
        }

        if (chordTypeRadio.checked) {
            const intervals = Chord.CHORD_INTERVALS[chordType.value.toLowerCase()]
            // console.log(intervals)
            
            const chord: NoteGroup = new NoteGroup(rootNote, intervals);
            const updatedFretboard = new Fretboard(tuning, fretsAmount, chord)
            updateFretboard(updatedFretboard)
        } else if (scaleTypeRadio.checked) {
            const intervals: number = Scale.SCALE_INTERVALS[scaleType.value.toLowerCase()]

            const scale: NoteGroup = new NoteGroup(rootNote, intervals);
            const updatedFretboard = new Fretboard(tuning, fretsAmount, scale)
            updateFretboard(updatedFretboard)

        }
    }

    return (
        <>
            <h1>Tuning:</h1>
            <input type={"text"} id={"tuning"}/>

            <h1>Frets:</h1>
            <input
                type={"number"}
                id={"fretsAmount"}
                value={fretsAmount}
                // onChange={updateFretboard(new Fretboard())}
            />

            <h1>Root note:</h1>
            <select id={"rootNote"}>
                <option value={"A"}>A</option>
                <option value={"A#"}>A#</option>
                <option value={"B"}>B</option>
                <option value={"C"}>C</option>
                <option value={"C#"}>C#</option>
                <option value={"D"}>D</option>
                <option value={"D#"}>D#</option>
                <option value={"E"}>E</option>
                <option value={"F"}>F</option>
                <option value={"F#"}>F#</option>
                <option value={"G"}>G</option>
                <option value={"G#"}>G#</option>
            </select>

            <h1>Chord</h1>
            <input type="radio" id={"chordTypeRadio"} name="slct"/>
            <select id="chordType">
                {Object.keys(Chord.CHORD_INTERVALS).map((chordType) => (
                    <option key={chordType} value={chordType}>
                        {chordType.replace(/_/g, " ")}
                    </option>
                ))}
            </select>

            <h1>Scale</h1>
            <input type="radio" id={"scaleTypeRadio"} name="slct"/>
            <select id="scaleType">
                {Object.keys(Scale.SCALE_INTERVALS).map((scaleType) => (
                    <option key={scaleType} value={scaleType}>
                        {scaleType.replace(/_/g, " ")}
                    </option>
                ))}
            </select>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <button onClick={applyNotes}>
                OK
            </button>
        </>
    )
}