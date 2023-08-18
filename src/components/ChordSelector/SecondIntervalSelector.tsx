import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function SecondIntervalSelector() {
    const options = ["Major", "Suspended 4th", "Minor", "Suspended 2nd"];

    return (
        <div className={"bg-secondary w-full self-center"}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {options.map((option) => (
                    <ToggleButton key={option} value={option} style={{ width: "50%" }}>
                        {option}
                    </ToggleButton>
                ))}
            </div>
        </div>
    );
}
