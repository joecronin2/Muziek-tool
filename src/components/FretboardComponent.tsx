import React, { Component } from "react";
import Fretboard from "../models/Fretboard.ts";
import Note from "../models/Note.ts";
import GuitarString from "../models/GuitarString.ts";
import Color from "colorjs.io";

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
    palette?: {
        octaveColors?: Color[]
        backgroundColor?: Color;
        stringColor?: Color;
        fretColor?: Color;
        noteTextColor?: Color;
        noteColor?: Color;
        fretNumberingColor?: Color;
    }

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
        },
        palette: {
            octaveColors: [
                new Color("#FF5733"), // Reddish-orange
                new Color("#FFA333"), // Light orange
                new Color("#FFD700"), // Gold
                new Color("#80C72F"), // Greenish
                new Color("#00CED1"), // Dark Turquoise
                new Color("#0074D9"), // Blue
                new Color("#8A2BE2"), // Blue Violet
                new Color("#FF1493"), // Deep Pink
                new Color("#FF69B4"), // Hot Pink
                new Color("#FF5733"), // Reddish-orange (same as the first for a cyclic look)
            ],
            backgroundColor: new Color("white"),
            stringColor: new Color("black"),
            fretColor: new Color("black"),
            noteTextColor: new Color("#000000"),
            noteColor: new Color("lightgreen"),
            fretNumberingColor: new Color("black")
        }
    }


    // TODO: class attributes arent updated when props change
    // fretboard: Fretboard;

    private stringSpacing: number | undefined;
    private fretSpacing: number | undefined;


    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    ctx: CanvasRenderingContext2D | null = null;


    componentDidMount() {
        console.log("Component Mounted")

        if (this.props === undefined) {
            throw new Error("Props are undefined");
            // this.props = FretboardComponent.defaultProps;
        }

        if (this.canvasRef.current) {
            this.ctx = this.canvasRef.current.getContext("2d");
            if (this.ctx) {
                this.init();
            }
        }

    }

    componentDidUpdate() {
        // clear canvas
        this.ctx!.clearRect(0, 0, this.props.width!, this.props.height!);

        console.log("Component Updated")
        this.init()
    }



    init() {
        console.log("componentDidMount")

        // Initialize string and fret spacing

        // actual width is the width of the fretboard without the padding
        const actualWidth = this.props.width! - this.props.padding!.leftPadding - this.props.padding!.rightPadding
        const actualHeight = this.props.height! - this.props.padding!.topPadding - this.props.padding!.bottomPadding

        const totalFretCount: number = this.props.fretboard.getFretCount() + 1

        this.stringSpacing = actualHeight / (this.props.fretboard.getStringCount() - 1);
        this.fretSpacing = actualWidth / (totalFretCount);




        // Access canvas and context when the component mounts
        this.ctx = this.canvasRef.current?.getContext("2d");

        // Set background color
        if (this.ctx) {
            this.ctx.fillStyle = this.props.palette.backgroundColor.toString({format: "hex"});
            this.ctx.fillRect(0, 0, this.props.width, this.props.height);
        }

        // Call the drawing method
        this.drawFretboardStructure(this.stringSpacing, this.fretSpacing);

        // Draw the fretboard numbering
        const fontSize = 20;
        const yOffset = -20

        this.ctx.fillStyle = this.props.palette.fretNumberingColor.toString({format: "hex"});
        this.drawFretboardNumbering(this.props.height - this.props.padding.topPadding + fontSize - yOffset, fontSize);

        this.drawVisibleNotes()
    }
    drawFretboardStructure(stringSpacing: number, fretSpacing: number): void {
        if (this.ctx) {
            // save the current context state
            // This is done so that the color change doesn't affect other drawings
            this.ctx.save();

            // set string color
            this.ctx.strokeStyle = this.props.palette.stringColor.toString({format: "hex"});

            // Draw strings
            for (let i = 0; i < this.props.fretboard.getStringCount(); i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.props.padding.leftPadding, this.props.padding.topPadding + stringSpacing * i);
                this.ctx.lineTo(
                    this.props.width - this.props.padding.rightPadding,
                    this.props.padding.topPadding + stringSpacing * i
                );
                this.ctx.stroke();
            }

            // restore
            this.ctx.restore();

            // set fret color
            this.ctx.strokeStyle = this.props.palette.fretColor.toString({format: "hex"});

            // Draw frets
            for (let i = 0; i < this.props.fretboard.getFretCount()+2; i++) {
                this.ctx.beginPath();

                if (i === 1) {
                    // Set a thicker line width for the 2nd fret
                    this.ctx.lineWidth = 4;
                }

                this.ctx.moveTo(this.props.padding.leftPadding + fretSpacing * i, this.props.height - this.props.padding.topPadding);
                this.ctx.lineTo(this.props.padding.leftPadding + fretSpacing * i, this.props.padding.bottomPadding);
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
        for (let i = 0; i < this.props.fretboard.getFretCount()+1; i++) {
            this.ctx.fillText(String(i), (this.props.padding.leftPadding + this.fretSpacing/2) + (i * this.fretSpacing), yPos);
        }

    }

    /**
     * Gets the x and y position of a fret on the fretboard. The position is always exactly in the middle of the fret and on a string.
     * @param fretNumber : number - The number of the fret.
     * @param stringNumber : number - The number of the string.
     */
    getFretPosition(fretNumber: number, stringNumber: number): { xPos: number, yPos: number } {
        const xPos = this.props.padding.leftPadding + this.fretSpacing * fretNumber + (this.fretSpacing / 2);
        const yPos = this.props.height - this.props.padding.topPadding - this.stringSpacing * stringNumber

        return { xPos, yPos };
    }

    drawNote(
        fretNumber: number,
        stringNumber: number,
        note: Note,
        radius?: number,
        size: number = 30,
        color: Color = this.props.palette.noteColor ?? FretboardComponent.defaultProps.palette.noteColor,
        drawNoteName: boolean = true
    ): void {
        // Set default radius
        if (radius === undefined) {
            radius = 10;
        }

        // Set default color
        if (color === undefined) {
            color = this.props.palette.noteColor;
        }

        const { xPos, yPos } = this.getFretPosition(fretNumber, stringNumber);
        if (this.ctx) {
            // Save the current context state
            // This is done so that the color change doesn't affect other drawings
            this.ctx.save();


            // Draw the rounded rectangle
            this.ctx.fillStyle = color.toString({format: "hex"});
            this.roundedRect(xPos - size/2, yPos - size/2, size, size, radius);
            this.ctx.fill();


            // Add text label on top
            this.ctx.fillStyle = "black";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle"; // Set vertical alignment to center
            this.ctx.fillText(note.getName(), xPos, yPos);
            this.ctx.restore();


            // Restore the previous context state, reverting the color change
        } else {
            throw new Error("Canvas context is null.");
        }

    }

    /**
     * Draws a rounded rectangle.
     * This method should be used instead of the native roundRect() method because it causes bugs.
     * @param x: number - The x position of the rectangle.
     * @param y: number - The y position of the rectangle.
     * @param width: number - The width of the rectangle.
     * @param height: number - The height of the rectangle.
     * @param radius: number - The radius of the rectangle.
     */
    roundedRect(x: number, y: number, width: number, height: number, radius: number) {
        this.ctx?.beginPath();
        this.ctx?.moveTo(x, y + radius);
        this.ctx?.arcTo(x, y + height, x + radius, y + height, radius);
        this.ctx?.arcTo(x + width, y + height, x + width, y + height - radius, radius);
        this.ctx?.arcTo(x + width, y, x + width - radius, y, radius);
        this.ctx?.arcTo(x, y, x, y + radius, radius);
        this.ctx?.stroke();
    }

    drawVisibleNotes(): void {
        const octaveColors = this.props.palette?.octaveColors ?? FretboardComponent.defaultProps.palette.octaveColors
        // console.log(octaveColors)
        console.log(this.props.fretboard)

        const fretboard: GuitarString[] = this.props.fretboard.getFretboard();

        // loop through fretboard
        for (let i = 0; i < fretboard.length; i++) {
            for (let j = 0; j < fretboard[i].getFrets().length; j++) {
                const note: Note = fretboard[i].frets[j];
                if (note.getVisibility()) {
                    this.drawNote(
                        j,
                        i,
                        fretboard[i].getFrets()[j],
                        10,
                        30,
                        octaveColors[note.octave % octaveColors.length],
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
            />
        );
    }
}

export default FretboardComponent;
