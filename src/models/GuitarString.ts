import Note from "./Note.ts";
import NoteGroup from "./NoteGroup.ts";

export default class GuitarString {
    get frets(): Note[] {
        return this._frets;
    }
    private fretsAmount: number;
    private rootNote: Note;
    private _frets: Note[];

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

        this._frets = [];

        for (let i = 0; i < this.fretsAmount+1; i++) {
            this._frets[i] = this.rootNote.getNextNoteBySemitones(i);
        }

        // If a note group was provided, remove all notes that are not in the note group
        if (noteGroup !== undefined) {
            this.setNoteGroup(noteGroup)
        }
    }

    /**
     * Sets the visibility of all notes that are not in the note group to false
     * @param noteGroup
     */
    setNoteGroup(noteGroup: NoteGroup): void {
        if (!(noteGroup instanceof NoteGroup)) {
            throw new Error("Invalid noteGroup: It should be an instance of NoteGroup or its subclass.");
        }

        // Reset the note visibility
        this.setAllNotesVisibility(true);

        // Set the visibility of notes not in the note group to false
        for (const note of this._frets) {
            if (!noteGroup.contains(note)) {
                note.setVisibility(false);
            }
        }
    }

    /**
     * Sets the visibility of all notes to the provided value
     * @param visibility
     */
    setAllNotesVisibility(visibility: boolean): void {
        for (const note of this._frets) {
            note.setVisibility(visibility);
        }
    }

    getLength(): number {
        return this.fretsAmount;
    }

    getFrets(): Note[] {
        return this._frets;
    }

    toString(): string {
        let result = "";

        for (let i = 0; i < this.fretsAmount; i++) {
            if (this._frets[i].getName().length > 1) {
                result += this._frets[i].getName() + "  ";
            } else if (this._frets[i] === null) {
                result += "    ";
            } else {
                result += this._frets[i].getName() + "   ";
            }
        }
        return result;
    }
}