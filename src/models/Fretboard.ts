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
    private static readonly  defaultFretsAmount = 24;

    /**
     * Standard guitar tuning for a six string guitar
     */
    static readonly STANDARD_TUNING = [
        new Note("E", 4),
        new Note("A", 3),
        new Note("D", 3),
        new Note("G", 3),
        new Note("B", 2),
        new Note("E", 2)
    ];

    /**
     * The default tuning that will be used if no tuning is provided
     * @private
     */
    private static readonly defaultTuning = this.STANDARD_TUNING


    /**
     * This method calculates the expected octave of a tuning rootnote.
     * This is necessary for custom tunings because the octave of a string may change depending on the note that is tuned to.
     *
     * @example Say we have a custom tuning where the G string is instead tuned to an A.
     * The octave of the A string is 3, but the octave of the A note is 4.
     * If we don't change the octave of the A note, the fretboard will be displayed incorrectly.
     *
     * @param note
     * @param guitarString
     */
    static calculateExpectedOctave(note: Note, guitarString: number) {
        const noteIndex = Note.notes.indexOf(note.getName());
        const stringNote = this.STANDARD_TUNING[guitarString - 1];
        const stringIndex = Note.notes.indexOf(stringNote.getName());
        const octaveDiff = stringNote.octave - note.octave; // Calculate octave difference

        const distance = noteIndex - stringIndex;

        const adjustedNote = note.getNextNoteBySemitones(distance);

        // Check if changing octave is necessary based on octave difference
        const expectedOctave = adjustedNote.octave + octaveDiff;
        return expectedOctave;
    }

    static adjustExpectedOctavesForTuning(tuning: Note[]): Note[] {
        const adjustedTuning: Note[] = [];

        for (let i = 0; i < tuning.length; i++) {
            const adjustedOctave = this.calculateExpectedOctave(tuning[i], i + 1);
            const adjustedNote = new Note(tuning[i].getName(), adjustedOctave);
            adjustedTuning.push(adjustedNote);
        }

        return adjustedTuning;
    }


    /*
    * A, A#, B, C, C#, D, D#, E, F, F#, G, G#
    * 0, 1, 2,  3, 4,  5, 6,  7, 8, 9 ,10, 11

    * */

    /**
     * The constructor of the Fretboard class.
     * @param {Note[]} tuning - The tuning of the fretboard.
     * @param {number} fretsAmount - The amount of frets on the fretboard.
     * @param {NoteGroup} noteGroup - Can be used to apply groups of notes (e.g. scales or chords) to the fretboard, for example to highlight those notes.
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
            this.fretsAmount = fretsAmount-1;
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

    /**
     * Returns the tuning of the fretboard as a string
     * @returns string
     * @example "E A D G B E "
     */
    getTuningString(): string {
        let result = "";
        for (const note of this.tuning) {
            result += note.getName() + " ";
        }
        return result;
    }

    /**
     * Sets the visibility of all notes that are not in the note group to false
     * @param noteGroup
     */
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