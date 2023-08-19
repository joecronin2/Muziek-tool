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
import Color from "colorjs.io";
import ChordSelector from "./components/ChordSelector/ChordSelector.tsx";

function App() {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(300)


    const [fretboard, setFretboard] = useState(
        new Fretboard()
    )

    function updateFretboard(fretboard: Fretboard) {
        setFretboard(fretboard);
    }


    const onWidthChange = (event: { target: { value: React.SetStateAction<number>; }; }) => {
        setWidth(event.target.value)
        updateFretboard(fretboard)
        console.log(event.target.value)
    }

    const onHeightChange = (event: { target: { value: React.SetStateAction<number>; }; }): void => {
        setHeight(event.target.value)
        updateFretboard(fretboard)
        console.log(event.target.value)

    }

    const onSelectChord = (chord: NoteGroup) => {
        setFretboard(new Fretboard(undefined, undefined, chord))
    }

    return (
        <>
            {/*<MUIControls fretboard={fretboard} updateFretboard={updateFretboard}/>*/}

            <ChordSelector onSelectChord={onSelectChord}/>

            <br/>
            <br/>
            <br/>


            <FretboardComponent
                fretboard={fretboard}
                width={width}
                height={height}
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
