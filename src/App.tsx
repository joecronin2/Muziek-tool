import Fretboard from './models/Fretboard';
import FretboardComponent from "./components/FretboardComponent.tsx";
import Note from "./models/Note.ts";
import Scale from "./models/Scale.ts";
import Chord from "./models/Chord.ts";


function App() {
    const scale = new Scale(new Note ("C"), Scale.MAJOR)
    const chord = new Chord(new Note ("C"), Chord.MAJOR_7)
    const tuning = Note.parseNotes("D A E A C# E")

    const fretboard = new Fretboard(tuning, undefined, chord)
    return (
        <div className={"canvasCont"}>
            <FretboardComponent fretboard={fretboard} width={1800} height={300} />
            {/*<h1 style={{ border: '1px solid black'}}>teststasd</h1>*/}


        </div>
    )
}

export default App
