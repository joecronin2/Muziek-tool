import RootNoteSelector from "./RootNoteSelector.tsx";
import SecondIntervalSelector from "./SecondIntervalSelector.tsx";
import ThirdIntervalSelector from "./ThirdIntervalSelector.tsx";
import ExtensionSelector from "./ExtensionSelector.tsx";
import {useState} from "react";
import Note from "../../models/Note.ts";

export default function ChordSelector() {
    const [rootNote, setRootNote] = useState();
    const [secondInterval, setSecondInterval] = useState();
    const [thirdInterval, setThirdInterval] = useState();
    const [extensions, setExtensions] = useState();



    return (
        <div className={"flex w-screen gap-10 h-80"}>
            <RootNoteSelector onSelectRootNote={setRootNote}/>
            <SecondIntervalSelector />
            <ThirdIntervalSelector />
            <ExtensionSelector />
        </div>
    )
}