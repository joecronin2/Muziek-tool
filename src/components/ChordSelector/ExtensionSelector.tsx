import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, {useEffect, useState} from "react";

export default function ExtensionSelector({ onSelectExtension }) {
    const [selectedExtensions, setSelectedExtensions] = useState([]);

    const extensions = {
        "m6": 8,
        "6": 9,
        "m7": 10,
        "7": 11,
        "m9": 13,
        "9": 14,
        "m11": 15,
        "11": 17,
        "m13": 20,
        "13": 21,
    };

    const handleExtensionChange = (event, newExtensions) => {
        setSelectedExtensions(newExtensions);
    };

    useEffect(() => {
        onSelectExtension(selectedExtensions);
    }, [selectedExtensions]);

    return (
        <ToggleButtonGroup
            orientation="vertical"
            value={selectedExtensions}
            onChange={handleExtensionChange}
            aria-label="Extension"
        >
            {Object.entries(extensions).map(([extension, semitones]) => (
                <ToggleButton key={extension} value={semitones}>
                    {extension}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}
