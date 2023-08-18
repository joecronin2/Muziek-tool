import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useEffect, useState} from "react";


export default function ThirdIntervalSelector() {
    const [selectedInterval, setSelectedInterval] = useState("");

    const handleIntervalChange = (event, newInterval) => {
        setSelectedInterval(newInterval);
    };

    useEffect(() => {
        console.log(selectedInterval)

    },[selectedInterval])

    return (
        <ToggleButtonGroup
            orientation={"vertical"}
            value={selectedInterval}
            exclusive
            onChange={handleIntervalChange}
            aria-label="Third Interval"
        >
            <ToggleButton value={"augmented"}>
                Augmented
            </ToggleButton>
            <ToggleButton value={"diminished"}>
                Diminished
            </ToggleButton>
        </ToggleButtonGroup>
    )
}