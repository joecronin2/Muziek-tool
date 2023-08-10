import Fretboard from './models/Fretboard';

import React, {useEffect, useState} from "react";

import FretboardComponent from "./components/FretboardComponent.tsx";
import Note from "./models/Note.ts";


function App() {
    // const tuning = Note.parseNotes("D A E A")
    const fretboard = new Fretboard(undefined, 22)
    return (
        <div>
            <FretboardComponent fretboard={fretboard} width={1800} height={300} />
            {/*<h1 style={{ border: '1px solid black'}}>teststasd</h1>*/}
        </div>
    )
}

export default App
