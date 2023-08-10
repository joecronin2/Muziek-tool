import Fretboard from './models/Fretboard';

import React, {useEffect, useState} from "react";

import FretboardComponent from "./components/FretboardComponent.tsx";


function App() {
    const fretboard = new Fretboard()
    return (
        <div>
            <FretboardComponent fretboard={fretboard} width={1800} height={300} />
            <h1 style={{ border: '1px solid black'}}>teststasd</h1>
        </div>
    )
}

export default App
