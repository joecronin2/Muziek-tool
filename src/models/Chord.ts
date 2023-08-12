import NoteGroup from "./NoteGroup.ts";
import Note from "./Note.ts";

interface CHORD_INTERVALS {
    [type: string]: number[];
}

export default class Chord extends NoteGroup {

    static readonly CHORD_INTERVALS: { [type: string]: number[] } = {
        major: [4, 3],
        minor: [3, 4],
        augmented: [4, 4],
        diminished: [3, 3],
        sus2: [2, 5],
        sus4: [5, 2],
        major_6: [4, 3, 2],
        minor_6: [3, 4, 2],
        dominant_7: [4, 3, 3],
        major_7: [4, 3, 4],
        minor_7: [3, 4, 3],
        minor_major_7: [3, 4, 4],
        augmented_7: [4, 4, 2],
        augmented_major_7: [4, 4, 3],
        half_diminished_7: [3, 3, 4],
        diminished_7: [3, 3, 3],
        dominant_7_flat_5: [4, 2, 4],
        dominant_7_sharp_5: [4, 4, 2],
        dominant_7_sharp_9: [3, 3, 2, 4],
        dominant_7_flat_9: [3, 3, 2, 3],
        major_9: [4, 3, 4, 3],
        minor_9: [3, 4, 3, 4],
        minor_major_9: [3, 4, 4, 3],
        augmented_9: [4, 4, 2, 3],
        augmented_major_9: [4, 4, 3, 3],
        dominant_9: [4, 3, 3, 4],
    };

    contains(note: Note): boolean {
        for (const noteInGroup of this.notes) {
            if (noteInGroup.getName() === note.getName()) {
                return true;
            }
        }
        return false;
    }
}