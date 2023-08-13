import Note from "../models/Note.ts";
import ToggleButton from "./ToggleButton.tsx";

interface ButtonLayoutProps {
    options: string[]
    maxSelectable?: number
    layout?: 'horizontal' | 'vertical'
}

export default function ButtonLayout(props: ButtonLayoutProps) {
    let containerClass = "selectableButtonContainer ";
    if (props.layout === 'horizontal') {
         containerClass += "flex-row "
    } else if (props.layout === 'vertical') {
        containerClass += "flex-col "
    }

    function getSelected() {
        return []
    }

    containerClass += " border-2 rounded-md";

    const buttons = props.options.map((option, index) => (
        <ToggleButton isToggled={false} label={option}>
            {option}
        </ToggleButton>
    ));

    return (
        <div className={containerClass}>
            {buttons}
        </div>
    )
}

ButtonLayout.defaultProps = {
    layout: 'vertical',
    maxSelectable: 1
};