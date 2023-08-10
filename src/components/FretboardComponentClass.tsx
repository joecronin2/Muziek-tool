// import React, { Component } from "react";
// import Fretboard from "../models/Fretboard.ts";
//
// interface FretboardComponentProps {
//     fretboard: Fretboard;
//     width: number;
//     height: number;
//     padding: {
//         leftPadding: number;
//         rightPadding: number;
//         topPadding: number;
//         bottomPadding: number;
//     };
// }
//
// class FretboardComponentClass extends Component<FretboardComponentProps> {
//     canvasRef = React.createRef<HTMLCanvasElement>();
//     ctx: CanvasRenderingContext2D | null = null;
//
//     constructor(props: FretboardComponentProps) {
//         super(props);
//         const { fretboard, width, height, padding } = this.props;
//
//         // Initialize canvas dimensions
//         const stringSpacing = (height - padding.topPadding - padding.bottomPadding) / (fretboard.getStringCount() - 1);
//         const fretSpacing = (width - padding.leftPadding - padding.rightPadding) / (fretboard.getFretCount() - 1);
//
//         // Access canvas and context when the component mounts
//         this.ctx = this.canvasRef.current?.getContext("2d");
//
//         this.drawFretboardStructure(stringSpacing, fretSpacing);
//     }
//
//     drawFretboardStructure(stringSpacing: number, fretSpacing: number) {
//         if (this.ctx) {
//             // Draw fretboard outline
//
//             // Draw strings
//             for (let i = 0; i < this.props.fretboard.getStringCount(); i++) {
//                 this.ctx.beginPath();
//                 this.ctx.moveTo(this.props.padding.leftPadding, this.props.padding.topPadding + stringSpacing * i);
//                 this.ctx.lineTo(
//                     this.props.width - this.props.padding.rightPadding,
//                     this.props.padding.topPadding + stringSpacing * i
//                 );
//                 this.ctx.stroke();
//             }
//
//             // Draw frets
//             for (let i = 0; i < this.props.fretboard.getFretCount(); i++) {
//                 this.ctx.beginPath();
//                 this.ctx.moveTo(this.props.padding.leftPadding + fretSpacing * i, this.props.height - this.props.padding.topPadding);
//                 this.ctx.lineTo(this.props.padding.leftPadding + fretSpacing * i, this.props.padding.bottomPadding);
//                 this.ctx.stroke();
//             }
//         }
//     }
//
//     render() {
//         return (
//             <canvas
//                 ref={this.canvasRef}
//                 width={this.props.width}
//                 height={this.props.height}
//                 style={{ border: "1px solid black" }}
//             />
//         );
//     }
// }
//
// export default FretboardComponentClass;
