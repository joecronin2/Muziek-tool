import Note from "./Note.ts";
import NoteGroup from "./NoteGroup.ts";

export default class GuitarString {
    private fretsAmount: number;
    private rootNote: Note;
    private frets: Note[];

    private static defaultFretsAmount = 24;
    private static defaultRootNote = new Note();

    /**
     * Creates a new guitar string. Both parameters are optional and will be set to the default if not provided.
     * @param rootNote
     * @param fretsAmount
     */
    constructor(rootNote?: Note, fretsAmount?: number, noteGroup?: NoteGroup) {
        if (rootNote === undefined) {
            this.rootNote = GuitarString.defaultRootNote;
        } else {
            this.rootNote = rootNote;
        }

        if (fretsAmount === undefined) {
            this.fretsAmount = GuitarString.defaultFretsAmount;
        } else {
            this.fretsAmount = fretsAmount;
        }

        this.frets = [];

        for (let i = 0; i < this.fretsAmount; i++) {
            this.frets[i] = this.rootNote.getNextNoteBySemitones(i);
        }

        // If a note group was provided, remove all notes that are not in the note group
        if (noteGroup !== undefined) {
            for (const note of this.frets) {
                if (!noteGroup.contains(note)) {
                    note.setVisibility(false)
                }
            }
        }
    }

    getLength(): number {
        return this.fretsAmount;
    }

    toString(): string {
        let result = "";

        for (let i = 0; i < this.fretsAmount; i++) {
            if (this.frets[i].getName().length > 1) {
                result += this.frets[i].getName() + "  ";
            } else if (this.frets[i] === null) {
                result += "    ";
            } else {
                result += this.frets[i].getName() + "   ";
            }
        }
        return result;
    }
}