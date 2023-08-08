import Note from "./Note.ts";
import GuitarString from "./GuitarString.ts";
import NoteGroup from "./NoteGroup.ts";


export default class Fretboard {
    private fretboard: GuitarString[];
    private tuning: Note[];
    private fretsAmount: number;

    private static defaultFretsAmount = 24;

    private static defaultTuning = [
        new Note("E", 4),
        new Note("B", 3),
        new Note("G", 3),
        new Note("D", 3),
        new Note("A", 2),
        new Note("E", 2)
    ];

    constructor (tuning?: Note[], fretsAmount?: number, noteGroup?: NoteGroup) {
        // Checks if the tuning was provided and sets it to the default if it wasn't
        if (tuning === undefined) {
            this.tuning = Fretboard.defaultTuning;
        } else {
            this.tuning = tuning;
        }

        // Checks if the frets amount was provided and sets it to the default if it wasn't
        if (fretsAmount === undefined) {
            this.fretsAmount = Fretboard.defaultFretsAmount;
        } else {
            this.fretsAmount = fretsAmount;
        }

        this.fretboard = [];
        for (const rootNote of this.tuning) {
            if (noteGroup === undefined) {
                this.fretboard.push(new GuitarString(rootNote, this.fretsAmount));
            } else {
                this.fretboard.push(new GuitarString(rootNote, this.fretsAmount, noteGroup));
            }
        }
    }


    toString(): string {
        let result = "";

        // append the fret numbers
        for (let i = 0; i < this.fretboard[0].getLength(); i++) {
            if (i < 10) {
                result += (i + "   ");
            } else {
                result += (i + "  ");
            }
        }

        result += "\n";

        for (const element of result) {
            result += "─";
        }

        for (const guitarString of this.fretboard) {
            // console.log(guitarString.toString());
            result += ('\n' +  guitarString.toString());
        }
        return result;
    }


}