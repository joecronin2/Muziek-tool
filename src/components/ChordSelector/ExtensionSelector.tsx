import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";

export default function ExtensionSelector({ onSelectExtension }) {
    const [selectedExtensions, setSelectedExtensions] = useState([]);

    const extensions = {
        "+m6": 9,
        "+M7": 11,
        "+m9": 14,
        "+M9": 16,
        "+11": 17,
        "+13": 21
    };

    const handleExtensionChange = (event, newExtensions) => {
        setSelectedExtensions(newExtensions);
    };

    return (
        <ToggleButtonGroup
            orientation="vertical"
            value={selectedExtensions}
            onChange={handleExtensionChange}
            aria-label="Extension"
        >
            {Object.entries(extensions).map(([extension, semitones]) => (
                <ToggleButton key={extension} value={extension}>
                    {extension}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}
