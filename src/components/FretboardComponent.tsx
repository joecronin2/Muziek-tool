import React, { Component } from "react";
import Fretboard from "../models/Fretboard.ts";

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
    stringSpacing: number;
    fretSpacing: number;

    canvasRef = React.createRef<HTMLCanvasElement>();
    ctx: CanvasRenderingContext2D | null = null;

    constructor(props: FretboardComponentProps) {
        super(props);
    }

    componentDidMount() {
        // Access canvas and context when the component mounts
        this.ctx = this.canvasRef.current?.getContext("2d");

        // Destructure the padding object
        const { padding , height, width, fretboard} = this.props;

        // Initialize string and fret spacing
        this.stringSpacing = (height - padding.topPadding - padding.bottomPadding) / (fretboard.getStringCount() - 1);
        this.fretSpacing = (width - padding.leftPadding - padding.rightPadding) / (fretboard.getFretCount() - 1);

        // Call the drawing method
        this.drawFretboardStructure(this.stringSpacing, this.fretSpacing);
    }

    drawFretboardStructure(stringSpacing: number, fretSpacing: number): void {
        // Destructure the padding object
        const {
            padding: {
                leftPadding,
                rightPadding,
                topPadding,
                bottomPadding
            },
            width,
            height
        }: FretboardComponentProps = this.props;

        if (this.ctx) {
            // Draw strings
            for (let i = 0; i < this.props.fretboard.getStringCount(); i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(leftPadding, topPadding + stringSpacing * i);
                this.ctx.lineTo(
                    width - rightPadding,
                    topPadding + stringSpacing * i
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

                this.ctx.moveTo(leftPadding + fretSpacing * i, height - topPadding);
                this.ctx.lineTo(leftPadding + fretSpacing * i, bottomPadding);
                this.ctx.stroke();

                this.ctx.lineWidth = 1;
            }
        } else {
            throw new Error("Canvas context is null.");
        }
    }

    drawFretboardNumbering(yPos: number): void {
        // TODO: Implement

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
