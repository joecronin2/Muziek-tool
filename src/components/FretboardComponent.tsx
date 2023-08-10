import React, { Component } from "react";
import Fretboard from "../models/Fretboard.ts";
import Note from "../models/Note.ts";
import GuitarString from "../models/GuitarString.ts";

interface FretboardComponentProps {
    fretboard: Fretboard;
    width?: number;
    height?: number;
    padding?: {
        leftPadding: number;
        rightPadding: number;
        topPadding: number;
        bottomPadding: number;
    };
}

class FretboardComponent extends Component<FretboardComponentProps> {
    static defaultProps = {
        width: 1800,
        height: 300,
        padding: {
            leftPadding: 50,
            rightPadding: 50,
            topPadding: 50,
            bottomPadding: 50
        }
    };

    fretboard: Fretboard;

    width: number;
    height: number;

    leftPadding: number;
    rightPadding: number;
    topPadding: number;
    bottomPadding: number;

    stringSpacing: number;
    fretSpacing: number;

    canvasRef = React.createRef<HTMLCanvasElement>();
    ctx: CanvasRenderingContext2D | null = null;

    constructor(props: FretboardComponentProps) {
        super(props);

        this.fretboard = this.props.fretboard;

        this.width = this.props.width;
        this.height = this.props.height;

        this.leftPadding = this.props.padding.leftPadding;
        this.rightPadding = this.props.padding.rightPadding;
        this.topPadding = this.props.padding.topPadding;
        this.bottomPadding = this.props.padding.bottomPadding;

        // Initialize string and fret spacing
        this.stringSpacing = (this.height - this.topPadding - this.bottomPadding) / (this.fretboard.getStringCount() - 1);
        this.fretSpacing = (this.width - this.leftPadding - this.rightPadding) / (this.fretboard.getFretCount() - 1);
    }

    componentDidMount() {
        // Access canvas and context when the component mounts
        this.ctx = this.canvasRef.current?.getContext("2d");

        // Destructure the padding object
        const { padding , height, width, fretboard} = this.props;


        // Call the drawing method
        this.drawFretboardStructure(this.stringSpacing, this.fretSpacing);

        // Draw the fretboard numbering
        const fontSize = 20;
        const yOffset = -20
        this.drawFretboardNumbering(this.height - this.topPadding + fontSize - yOffset, fontSize);

        // this.drawNote(5, 5, new Note(), 10, 40)
        this.drawVisibleNotes()
    }

    drawFretboardStructure(stringSpacing: number, fretSpacing: number): void {
        if (this.ctx) {
            // Draw strings
            for (let i = 0; i < this.props.fretboard.getStringCount(); i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.leftPadding, this.topPadding + stringSpacing * i);
                this.ctx.lineTo(
                    this.width - this.rightPadding,
                    this.topPadding + stringSpacing * i
                );
                this.ctx.stroke();
            }

            // Draw frets
            for (let i = 0; i < this.props.fretboard.getFretCount(); i++) {
                this.ctx.beginPath();

                if (i === 1) {
                    // Set a thicker line width for the 2nd fret
                    this.ctx.lineWidth = 4;
                }

                this.ctx.moveTo(this.leftPadding + fretSpacing * i, this.height - this.topPadding);
                this.ctx.lineTo(this.leftPadding + fretSpacing * i, this.bottomPadding);
                this.ctx.stroke();

                this.ctx.lineWidth = 1;
            }
        } else {
            throw new Error("Canvas context is null.");
        }
    }

    /**
     * Draws the fretboard numbering.
     * @param yPos : number - The y position of the numbering. Can be used to draw the numbering above or below the fretboard for example.
     * @param fontSize : number - The font size of the numbering.
     * @param fontType : string - The css font type of the numbering. Example: "Arial"
     */
    drawFretboardNumbering(yPos: number, fontSize?: number, fontType?: string): void {
        // Set default font size
        if (fontSize === undefined) {
            fontSize = 20; // TODO: Use static class variable?
        }
        if (fontType === undefined) {
            fontType = "Arial"; // TODO: Use static class variable?
        }

        if (!this.ctx) {
            throw new Error("Canvas context is null.");
        }

        this.ctx.font = `${fontSize}px ${fontType}`;
        this.ctx.textAlign = "center";
        for (let i = 0; i < this.fretboard.getFretCount()-1; i++) {
            this.ctx.fillText(String(i), (this.leftPadding + this.fretSpacing/2) + (i * this.fretSpacing), yPos);
        }

    }

    /**
     * Gets the x and y position of a fret on the fretboard. The position is always exactly in the middle of the fret and on a string.
     * @param fretNumber : number - The number of the fret.
     * @param stringNumber : number - The number of the string.
     */
    getFretPosition(fretNumber: number, stringNumber: number): { xPos: number, yPos: number } {
        const xPos = this.leftPadding + this.fretSpacing * fretNumber + (this.fretSpacing / 2);
        const yPos = this.height - this.topPadding - this.stringSpacing * stringNumber

        return { xPos, yPos };
    }

    drawNote(
        fretNumber: number,
        stringNumber: number,
        note: Note,
        radius?: number,
        size?: number,
        color?: string
    ): void {
        // Set default radius
        if (radius === undefined) {
            radius = 10;
        }

        // Set default color
        if (color === undefined) {
            color = "lightgreen";
        }

        const { xPos, yPos } = this.getFretPosition(fretNumber, stringNumber);
        if (this.ctx) {
            // Save the current context state
            // This is done so that the color change doesn't affect other drawings
            this.ctx.save();

            // Draw the rounded rectangle
            this.ctx.fillStyle = color;
            this.ctx.roundRect(xPos - size/2, yPos - size/2, size, size, radius);
            this.ctx.fill();

            // Add text label on top
            this.ctx.fillStyle = "black";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle"; // Set vertical alignment to center
            this.ctx.fillText(note.getName(), xPos, yPos);

            // Restore the previous context state, reverting the color change
            this.ctx.restore();
        } else {
            throw new Error("Canvas context is null.");
        }
    }

    drawVisibleNotes(): void {
        // loop through fretboard

        let fretboard: GuitarString[] = this.fretboard.getFretboard();

        for (let i = 0; i < fretboard.length; i++) {
            for (let j = 0; j < fretboard[i].getFrets().length-1; j++) {
                let note: Note = fretboard[i].frets[j];
                if (note.getVisibility()) {
                    this.drawNote(
                        j,
                        i,
                        fretboard[i].getFrets()[j],
                        10,
                        30
                    );
                }
            }
        }
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                width={this.props.width}
                height={this.props.height}
                style={{ border: "1px solid black" }}
            />
        );
    }
}

export default FretboardComponent;
