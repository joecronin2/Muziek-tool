import Note from "./Note";

export default class NoteGroup {
    private rootNote: Note;
    protected intervals: number[];
    private notes: Note[];


    /**
     * Creates a new note group. Both parameters are optional and will be set to the default if not provided.
     * @param rootNote: Note - The root note of the note group
     * @param intervals: number[] - The intervals of the note group
     */
    constructor(rootNote: Note, intervals: number[]) {
        this.rootNote = rootNote;
        this.notes = [];
        this.intervals = intervals;


        this.notes[0] = this.rootNote;
        for (let i = 0; i < intervals.length; i++) {
            this.notes[i + 1] = this.notes[i].getNextNoteBySemitones(intervals[i]);
        }
    }

    getNotes(): Note[] {
        return this.notes;
    }

    getRootNote(): Note {
        return this.rootNote;
    }

    addNoteByIntervalFromRoot(interval: Interval): void {

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