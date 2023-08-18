import RootNoteSelector from "./RootNoteSelector.tsx";
import SecondIntervalSelector from "./SecondIntervalSelector.tsx";
import ThirdIntervalSelector from "./ThirdIntervalSelector.tsx";
import ExtensionSelector from "./ExtensionSelector.tsx";

export default function ChordSelector() {
    return (
        <div>
            <RootNoteSelector />
            <SecondIntervalSelector />
            <ThirdIntervalSelector />
            <ExtensionSelector />
        </div>
    )
}