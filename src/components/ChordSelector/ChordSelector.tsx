import RootNoteSelector from "./RootNoteSelector.tsx";
import SecondIntervalSelector from "./SecondIntervalSelector.tsx";
import ThirdIntervalSelector from "./ThirdIntervalSelector.tsx";
import ExtensionSelector from "./ExtensionSelector.tsx";
import {useEffect, useState} from "react";
import Note from "../../models/Note.ts";
import Chord from "../../models/Chord.ts";

export default function ChordSelector({ onSelectChord }) {
    const [rootNoteString, setRootNoteString] = useState("");
    const [secondInterval, setSecondInterval] = useState("");
    const [thirdInterval, setThirdInterval] = useState("");
    const [extensions, setExtensions] = useState([]);

    useEffect(() => {
        console.log(rootNoteString)
        console.log(secondInterval)
        console.log(thirdInterval)
        console.log(extensions)

        // return if there is no root note
        if (!rootNoteString) return;

        const rootNote = new Note(rootNoteString);
        let chord = new Chord(rootNote)


        if (secondInterval) {
            switch (secondInterval.toLowerCase()) {
                case "major":
                    chord.addNoteByIntervalFromRoot(4)
                    break;
                case "minor":
                    chord.addNoteByIntervalFromRoot(3)
                    break;
                case "suspended 4th":
                    chord.addNoteByIntervalFromRoot(5)
                    break;
                case "suspended 2nd":
                    chord.addNoteByIntervalFromRoot(2)
                    break;
            }
        }

        if (thirdInterval) {
            switch (thirdInterval.toLowerCase()) {
                case "fifth":
                    chord.addNoteByIntervalFromRoot(7)
                    break;
                case "augmented":
                    chord.addNoteByIntervalFromRoot(8)
                    break;
                case "diminished":
                    chord.addNoteByIntervalFromRoot(6)
                    break;
            }
        }

        if (extensions) {
            for (const extension of extensions) {
                chord.addNoteByIntervalFromRoot(extension)
            }
        }

        console.log(chord.toString())

        onSelectChord(chord);

    }, [rootNoteString, secondInterval, thirdInterval, extensions])

    return (
        <div className={"flex w-screen gap-10 h-80"}>
            <RootNoteSelector onSelectRootNote={setRootNoteString}/>
            <SecondIntervalSelector onSelectSecondInterval={setSecondInterval} />
            <ThirdIntervalSelector onSelectThirdInterval={setThirdInterval} />
            <ExtensionSelector onSelectExtension={setExtensions} />
        </div>
    )
}