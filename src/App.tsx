import Fretboard from './models/Fretboard';
import FretboardComponent from "./components/FretboardComponent.tsx";
import Note from "./models/Note.ts";
import TestControls from "./components/TestControls.tsx";
import React, {useState} from "react";
import NoteGroup from "./models/NoteGroup.ts";
import ButtonLayout from "./components/ButtonLayout.tsx";
import Scale from "./models/Scale.ts";
import {Button, createTheme, Slider, ThemeProvider, ToggleButton, ToggleButtonGroup} from '@mui/material';
import MUIControls from "./components/MUIControls.tsx";

function App() {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(300)

    const [fretboard, setFretboard] = useState(
        new Fretboard()
    )

    function updateFretboard(fretboard: Fretboard) {

        console.log(fretboard)
        console.log(fretboard.getFretCount())
        setFretboard(fretboard);
        console.log(fretboard)
    }

    // const fretboard: Fretboard = new Fretboard(Note.parseNotes("D A E A C# E"), undefined, new Scale(new Note ("C"), Scale.MAJOR))
    // const fretboard = new Fretboard()

    const scales = Object.keys(Scale.SCALE_INTERVALS)

    const onWidthChange = (event) => {
        setWidth(event.target.value)
        updateFretboard(fretboard)
        console.log(event.target.value)
    }

    const onHeightChange = (event) => {
        setHeight(event.target.value)
        updateFretboard(fretboard)
        console.log(event.target.value)

    }

    return (
        <>
            <MUIControls fretboard={fretboard} updateFretboard={updateFretboard}/>

            <FretboardComponent
                fretboard={fretboard}
                width={width}
                height={height}
                style={{ border: "1px solid black" }}
                
            />
            {/*<TestControls updateFretboard={updateFretboard} />*/}
            {/*<h1 className={"text-2xl text-blue-500"}>TEST</h1>*/}

            {/*<div className={"flex gap-5"}>*/}
            {/*    <ButtonLayout options={Note.notes} />*/}
            {/*    <ButtonLayout options={scales}/>*/}
            {/*</div>*/}


            <div className={"w-1/2"}>
                <h2>Width:</h2>
                <Slider
                    min={1000}
                    max={2000}
                    size="medium"
                    defaultValue={1900}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    onChange={onWidthChange}
                />

                <h2>Height:</h2>
                <Slider
                    min={260}
                    max={600}
                    size="medium"
                    defaultValue={300}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    onChange={onHeightChange}
                />
            </div>



        </>
    )
}


export default App
