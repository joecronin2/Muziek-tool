import Note from './models/Note.ts';
import Fretboard from './models/Fretboard.ts';
import GuitarString from "./models/GuitarString.ts";
import Scale from "./models/Scale.ts";

function App() {

    function parseNotes(notes: string): Note[] {
        let noteArray: Note[] = notes.split(" ").map((note) => new Note (note))

        return noteArray.reverse()
    }

    new Note("C").getNextNoteBySemitones(4)

    let CMajorScale = new Scale(new Note ("C"), Scale.MAJOR)

    console.log(CMajorScale.toString())

    const fretboard = new Fretboard(parseNotes("D A E A C# E"), undefined, new Scale(new Note ("C"), Scale.MAJOR))
    console.log(fretboard.toString())
    console.log(parseNotes("D A E A C# E"))

  return (
      <div>
          <h1>Tuning:</h1>
          <input type={"text"} />
          <button>Submit</button>

          <h1>Scale:</h1>
          <input type={"text"} />
          <button>Submit</button>

          <h1>Chord:</h1>
          <input type={"text"} />
          <button>Submit</button>

      </div>
  )
}

export default App