import Note from "./Note";

export default class NoteGroup {
    private rootNote: Note;
    protected intervals: number[];
    protected notes: Note[];


    /**
     * Creates a new note group. Both parameters are optional and will be set to the default if not provided.
     * @param {Note} rootNote - The root note of the note group
     * @param {number[]} intervals? - The intervals of the note group. Defaults to []
     */
    constructor(rootNote: Note, intervals?: number[]) {
        this.rootNote = rootNote;
        this.notes = [];
        this.notes[0] = this.rootNote;


        // set default of this.intervals to an empty array if intervals haven't been provided
        if (intervals === undefined) {
            this.intervals = [];
        } else {
            this.intervals = intervals;
            this.buildNotesFromIntervals()
        }


    }

    buildNotesFromIntervals(): void {
        this.notes[0] = this.rootNote;
        for (let i = 0; i < this.intervals.length; i++) {
            this.notes[i + 1] = this.notes[i].getNextNoteBySemitones(this.intervals[i]);
        }
    }

    getNotes(): Note[] {
        return this.notes;
    }

    getRootNote(): Note {
        return this.rootNote;
    }

    /**
     * Makes the intervals array based on the notes in the note array
     */
    buildIntervalsFromNotes(): void {
        // TODO: Implement this method
    }

    addNoteByIntervalFromRoot(interval: number): void {
        this.notes.push(this.rootNote.getNextNoteBySemitones(interval));

        this.buildIntervalsFromNotes()
    }


    toString(): string {
        let result = "";
        for (const note of this.notes) {
            result += note.getName() + " ";
        }
        return result;
    }

    contains(note: Note): boolean {
        for (const noteInGroup of this.notes) {
            if (noteInGroup.getName() === note.getName()) {
                return true;
            }
        }
        return false;
    }
}