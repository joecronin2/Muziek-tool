/**
 * Represents a musical note
 */
export default class Note {
    /**
     * Represents the notation of the note. e.g. "C#"
     * @private
     */
    private name: string;
    /**
     * Represents the octave of the note. e.g. 4
     * @private
     */
    private octave: number;

    private isVisible: boolean = true;

    private static notes: string[] = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    private static defaultOctave = 4;
    private static defaultNote = "A";


    /**
     * Creates a new note. Both parameters are optional and will be set to the default if not provided.
     * @param {string} name - The name of the note
     * @param {number} octave - The octave of the note.
     * @constructor
     */
    constructor (name?: string, octave?: number) {
        // Checks if the note name was provided and sets it to the default if it wasn't
        if (name === undefined) {
            this.name = Note.defaultNote;
        } else {
            // If the note name was provided, checks if it is valid and throws an error if it isn't
            if (Note.isValidNoteName(name)) {
                this.name = name;
            } else {
                throw new Error("Invalid note name: " + name);
            }
        }

        // Checks if an octave was provided and sets it to the default if it wasn't
        if (octave === undefined) {
            this.octave = Note.defaultOctave;
        } else {
            this.octave = octave;
        }
    }

    /**
     * Checks if the provided note name is valid
     * @param name: string - The note name to check
     * @private
     */
    private static isValidNoteName(name: string): boolean {
        return Note.notes.includes(name);
    }

    /**
     * Returns a new note object by adding the provided semitones offset to the current noted
     * @param semitones: number - The semitones offset to add to the current note
     * @returns {Note} - The new note object, adjusted by the provided semitones offset
     */
    getNextNoteBySemitones(semitones: number): Note {
        // get index of current note
        const currentIndex = Note.notes.indexOf(this.name);

        /** In case that the semitones offset exceeds an octave, we need to adjust the octave as well
         * Say we have a note C4 and a semitones offset of 13. The resulting note should be C#5
         *
         * We calculate the octave adjustment by dividing the semitones offset by 12 and rounding down.
         * For example, 13/12 = 1.08 -> 1
         */
        const octaveAdjustment = Math.floor((semitones + currentIndex) / 12)

        // get new index by calculating the remainder of the semitones offset divided by 12
        const newIndex = (semitones + currentIndex) % 12;

        // get new index and octave
        const newOctave = this.octave + octaveAdjustment;
        
        // get new note based on index
        const newNoteName = Note.notes[newIndex];
        
        return new Note(newNoteName, newOctave);
    }

    /**
     * Returns the semitone offset for the given interval name.
     * @param {string} interval - The name of the interval (e.g., "minor second", "major third").
     * @returns {number | null} - The semitone offset for the interval. Returns null if the interval name is invalid.
     */
    getSemitoneOffsetByInterval(interval: string): number | null {
        let semitones = 0;

        switch (interval) {
            case "minor second":
            case "m2":
                semitones = 1;
                break;
            case "major second":
            case "M2":
                semitones = 2;
                break;
            case "minor third":
            case "m3":
                semitones = 3;
                break;
            case "major third":
            case "M3":
                semitones = 4;
                break;
            case "perfect fourth":
            case "p4":
                semitones = 5;
                break;
            case "augmented fourth":
            case "a4":
                semitones = 6;
                break;
            case "diminished fifth":
            case "d5":
                semitones = 6;
                break;
            case "perfect fifth":
            case "p5":
                semitones = 7;
                break;
            case "augmented fifth":
            case "minor sixth":
            case "m6":
                semitones = 8;
                break;
            case "major sixth":
            case "M6":
                semitones = 9;
                break;
            case "minor seventh":
            case "m7":
                semitones = 10;
                break;
            case "major seventh":
            case "M7":
                semitones = 11;
                break;
            case "perfect octave":
            case "p8":
                semitones = 12;
                break;
            default:
                console.log("Invalid interval name. Please use a valid interval name. e.g. 'minor second' or 'm2'");
                return null;
        }

        return semitones;
    }

    setVisibility(isVisible: boolean): void {
        this.isVisible = isVisible;
    }

    getName(): string {
        if (this.isVisible) {
            return this.name;

        } else {
            return "-";
        }
    }
}