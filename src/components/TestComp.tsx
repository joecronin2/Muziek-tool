import React, {useState} from "react";
import ASCIIFretboardComponent from "./ASCIIFretboardComponent.tsx";

export default function TestComp() {

    const [tuning, setTuning] = useState('');
    const [noteGroup, setNoteGroup] = useState('');



    //
    // new Note("C").getNextNoteBySemitones(4)
    //
    // const CMajorScale = new Scale(new Note("C"), Scale.MAJOR)
    //
    // console.log(CMajorScale.toString())
    //
    // const fretboard = new Fretboard(parseNotes("D A E A C# E"), undefined, new Scale(new Note ("C"), Scale.MAJOR))
    // console.log(fretboard.toString())
    // console.log(parseNotes("D A E A C# E"))



    return (
        <div>

            <h1>Tuning:</h1>
            <input type={"text"} id={"tuning"}/>
            <button id={"sumbitTuning"}>Submit</button>

            <h1>Scale:</h1>
            {/* select with chromatic notes*/}
            <select id={"scale"}>
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

            <input type={"text"} id={"Scale"} />
            <button id={"sumbitScale"}>Submit</button>

            <h1>Chord:</h1>
            <select id={"scale"}>
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
            <select>
                <option value={"Major"}>Major</option>
                <option value={"Minor"}>Minor</option>
                <option value={"Diminished"}>Diminished</option>
                <option value={"Augmented"}>Augmented</option>
                <option value={"Major 7th"}>Major 7th</option>
                <option value={"Minor 7th"}>Minor 7th</option>
                <option value={"Dominant 7th"}>Dominant 7th</option>
                <option value={"Diminished 7th"}>Diminished 7th</option>
                <option value={"Half Diminished 7th"}>Half Diminished 7th</option>
                <option value={"Augmented 7th"}>Augmented 7th</option>
                <option value={"Augmented Major 7th"}>Augmented Major 7th</option>
            </select>
            <button id={"sumbitChord"}>Submit</button>

            <h1>Notes:</h1>
            <input type={"text"} id={"Notes"} />
            <button id={"sumbitNotes"}>Submit</button>

            <ASCIIFretboardComponent Tuning={tuning} NoteGroup={noteGroup} />
        </div>
    )
}