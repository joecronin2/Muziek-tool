import Note from "./Note.ts";

export default class NoteGroup {
    private rootNote: Note;
    private intervals: number[];
    private notes: Note[];



    constructor(rootNote: Note, intervals: number[]) {
        this.rootNote = rootNote;
        this.notes = [];
        this.intervals = intervals;


        this.notes[0] = this.rootNote;
        for (let i = 0; i < intervals.length; i++) {
            this.notes[i + 1] = this.notes[i].getNextNoteBySemitones(intervals[i]);
        }
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