import Note from "./Note";
import GuitarString from "./GuitarString";
import NoteGroup from "./NoteGroup";


export default class Fretboard {
    /**
     * The fretboard which is an array of GuitarString objects
     * @private
     */
    private fretboard: GuitarString[];

    /**
     * The tuning of the fretboard
     * @private
     */
    private tuning: Note[];

    /**
     * The amount of frets on the fretboard
     * @private
     */
    private fretsAmount: number;

    /**
     * The default amount of frets that will be used if no amount is provided
     * @private
     */
    private static defaultFretsAmount = 24;

    /**
     * The default tuning that will be used if no tuning is provided
     * @private
     */
    private static defaultTuning = [
        new Note("E", 4),
        new Note("A", 3),
        new Note("D", 3),
        new Note("G", 3),
        new Note("B", 2),
        new Note("E", 2)
    ];

    /**
     * The constructor of the Fretboard class.
     * @param tuning: Note[] - The tuning of the fretboard
     * @param fretsAmount: number - The amount of frets on the fretboard
     * @param noteGroup: Can be used to apply groups of notes (e.g. scales or chords) to the fretboard, for example to highlight those notes
     */
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

        // Creates the fretboard
        this.fretboard = [];
        // Loop through the notes of the tuning and create a new GuitarString object based on each note
        for (const rootNote of this.tuning) {
            // Apply the optional noteGroup to the GuitarString object if it was provided
            this.fretboard.push(new GuitarString(rootNote, this.fretsAmount));
        }

        // If a NoteGroup was provided, use the setNoteGroup method to apply it to the fretboard
        if (noteGroup !== undefined) {
            this.setNoteGroup(noteGroup);
        }
    }

    getTuningString(): string {
        let result = "";
        for (const note of this.tuning) {
            result += note.getName() + " ";
        }
        return result;
    }

    setNoteGroup(noteGroup: NoteGroup): void {
        for (const guitarString of this.fretboard) {
            guitarString.setNoteGroup(noteGroup);
        }
    }

    /**
     * Returns the fretboard as an array of GuitarString objects
     * @returns GuitarString[]
     */
    getFretboard(): GuitarString[] {
        return this.fretboard;
    }

    /**
     * Returns the amount of frets on the fretboard
     * @returns number: The amount of frets on the fretboard
     */
    getFretCount(): number {
        return this.fretsAmount;
    }

    /**
     * Returns the amount of strings on the fretboard
     * @returns number: The amount of strings on the fretboard
     */
    getStringCount(): number {
        return this.tuning.length;
    }

    /**
     * Returns a string representation of the fretboard
     * @returns string
     */
    toString(): string {
        let result = "";

        // add the fret numbers
        for (let i = 0; i < this.fretboard[0].getLength(); i++) {
            if (i < 10) {
                result += (i + "   ");
            } else {
                result += (i + "  ");
            }
        }

        result += "\n";

        // add a line to separate the fret numbers from the fretboard
        for (const element of result) {
            result += "─";
        }

        // use the toString method of each GuitarString object to add the notes to the string
        for (const guitarString of this.fretboard) {
            result += ('\n' +  guitarString.toString());
        }
        return result;
    }


}