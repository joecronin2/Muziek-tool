import GuitarStringComponent from "./GuitarStringComponent.tsx";
import Fretboard from "../models/Fretboard";
import Note from "../models/Note.ts";
import NoteGroup from "../models/NoteGroup.ts";
import Scale from "../models/Scale.ts";

// interface FretboardProps {
//     Tuning: Note[],
//     NoteGroup: NoteGroup;
// }

function ASCIIFretboardComponent(Tuning: Note[], NoteGroup: NoteGroup) {
    function parseNotes(notes: string): Note[] {
        const noteArray: Note[] = notes.split(" ").map((note) => new Note (note))

        return noteArray.reverse()
    }
    const tuning = parseNotes("D A E A C# E")
    const noteGroup: NoteGroup = new Scale(new Note("C"), Scale.MAJOR)
    
    const fretboard = new Fretboard(tuning, undefined, noteGroup)
    // console.log(fretboard.getFretboard())
    // console.log(fretboard.toString())
    return (
        <div>
            <pre>0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22  23</pre>
            <pre>─────────────────────────────────────────────────────────────────────────────────────────────────</pre>
            {fretboard.getFretboard().map((guitarString) => (
                <pre>{guitarString.toString()}</pre>
            ))}
        </div>
    )
}

export default ASCIIFretboardComponent;