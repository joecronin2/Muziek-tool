import Fretboard from './models/Fretboard';
import FretboardComponent from "./components/FretboardComponent.tsx";
import Note from "./models/Note.ts";
import Scale from "./models/Scale.ts";
import Chord from "./models/Chord.ts";


function App() {
    const scale = new Scale(new Note ("C"), Scale.MAJOR)
    const chord = new Chord(new Note ("C"), Chord.MAJOR_7)
    const tuning = Note.parseNotes("D A E A C# E")

    function parseString(string: string) {
        // make array with 3 strings split by space
        let arr = string.split(" ")
        if (arr[0] === "chord") {
            console.log("chord")
        }
    }

    function applyNotes() {
        // get radios
        const customNotesRadio = document.getElementById("customNotesRadio") as HTMLInputElement
        const chordTypeRadio = document.getElementById("chordTypeRadio") as HTMLInputElement
        const scaleTypeRadio = document.getElementById("scaleTypeRadio") as HTMLInputElement

        // get select and input values
        const customNotes = document.getElementById("customNotes") as HTMLInputElement
        const chordType = document.getElementById("chordType") as HTMLSelectElement
        const scaleType = document.getElementById("scaleType") as HTMLSelectElement


        if (customNotesRadio.checked) {
            console.log("custom notes")
            console.log(customNotes.value)

        } else if (chordTypeRadio.checked) {
            console.log("chord type")
            console.log(chordType.value)

        } else if (scaleTypeRadio.checked) {
            console.log("scale type")
            console.log(scaleType.value)
            
        }
    }


    const fretboard = new Fretboard(tuning, undefined, chord)
    return (
        <div className={"canvasCont"}>
            <FretboardComponent fretboard={fretboard} width={1800} height={300} />
            {/*<h1 style={{ border: '1px solid black'}}>teststasd</h1>*/}


            <h1>Root note:</h1>
            <select>
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

            <h1>Custom notes:</h1>
            <input type="radio" id={"customNotesRadio"} name="slct"/>
            <input type="text" id={"customNotes"}/>


            <h1>Chord</h1>
            <input type="radio" id={"chordTypeRadio"} name="slct"/>
            <select id={"chordType"}>
                <option value={"Major"}>Major</option>
                <option value={"Minor"}>Minor</option>
                <option value={"Augmented"}>Augmented</option>
                <option value={"Diminished"}>Diminished</option>
                <option value={"Major 7th"}>Major 7th</option>
                <option value={"Minor 7th"}>Minor 7th</option>
                <option value={"Dominant 7th"}>Dominant 7th</option>
                <option value={"Sus2"}>Sus2</option>
                <option value={"Sus4"}>Sus4</option>
                <option value={"Major 6th"}>Major 6th</option>
                <option value={"Minor 6th"}>Minor 6th</option>
                <option value={"Minor Major 7th"}>Minor Major 7th</option>
                <option value={"Augmented 7th"}>Augmented 7th</option>
                <option value={"Augmented Major 7th"}>Augmented Major 7th</option>
                <option value={"Half Diminished 7th"}>Half Diminished 7th</option>
                <option value={"Diminished 7th"}>Diminished 7th</option>
                <option value={"Dominant 7th Flat 5"}>Dominant 7th Flat 5</option>
                <option value={"Dominant 7th Sharp 5"}>Dominant 7th Sharp 5</option>
                <option value={"Dominant 7th Sharp 9"}>Dominant 7th Sharp 9</option>
                <option value={"Dominant 7th Flat 9"}>Dominant 7th Flat 9</option>
                <option value={"Major 9th"}>Major 9th</option>
                <option value={"Minor 9th"}>Minor 9th</option>
                <option value={"Minor Major 9th"}>Minor Major 9th</option>
                <option value={"Augmented 9th"}>Augmented 9th</option>
                <option value={"Augmented Major 9th"}>Augmented Major 9th</option>
                <option value={"Dominant 9th"}>Dominant 9th</option>
            </select>

            <h1>Scale</h1>
            <input type="radio" id={"scaleTypeRadio"} name="slct"/>
            <select id={"scaleType"}>
                <option value={"Major"}>Major</option>
                <option value={"Minor"}>Minor</option>
                <option value={"Major Bebop"}>Major Bebop</option>
                <option value={"Natural Minor"}>Natural Minor</option>
                <option value={"Harmonic Minor"}>Harmonic Minor</option>
                <option value={"Melodic Minor Ascending"}>Melodic Minor Ascending</option>
                <option value={"Dorian"}>Dorian</option>
                <option value={"Phrygian"}>Phrygian</option>
                <option value={"Lydian"}>Lydian</option>
                <option value={"Mixolydian"}>Mixolydian</option>
                <option value={"Locrian"}>Locrian</option>
                <option value={"Whole Tone"}>Whole Tone</option>
            </select>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <button onClick={applyNotes}>
                OK
            </button>


        </div>
    )
}


export default App
