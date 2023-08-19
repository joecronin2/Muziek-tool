import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function SecondIntervalSelector({ onSelectSecondInterval }) {
    const [selectedInterval, setSelectedInterval] = React.useState("");

    const options = ["Major", "Suspended 4th", "Minor", "Suspended 2nd"];

    const handleIntervalChange = (_event, newInterval: string) => {
        setSelectedInterval(newInterval);
        onSelectSecondInterval(newInterval);
    }

    return (
        <div className={"bg-secondary w-full self-center"}>
            <ToggleButtonGroup
                style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
                value={selectedInterval}
                exclusive
                onChange={handleIntervalChange}
            >
                {options.map((option) => (
                    <ToggleButton key={option} value={option} style={{ width: "50%" }}>
                        {option}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </div>
    );
}
