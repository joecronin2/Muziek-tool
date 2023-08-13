import {useState} from "react";

interface ToggleButtonProps {
    label: string,
    isToggled: boolean,
}

export default function ToggleButton(props: ToggleButtonProps) {
    const [isToggled, setIsToggled] = useState(false)

    const handleToggle = () => {
        setIsToggled(!isToggled)
    }

    return (
        <button onClick={handleToggle} className={"toggleButton " + (isToggled ? "bg-violet-950" : "bg-violet-700")}>
            {props.label}
        </button>
)
}