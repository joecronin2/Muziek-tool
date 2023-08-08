import NoteGroup from "./NoteGroup";
export default class Scale extends NoteGroup {
    static readonly MAJOR = [2, 2, 1, 2, 2, 2, 1];
    static readonly MINOR = [2, 1, 2, 2, 1, 2, 2];
    static readonly MAJOR_BEBOP = [2, 2, 1, 2, 1, 1, 2];
    static readonly NATURAL_MINOR = [2, 1, 2, 2, 1, 2, 2];
    static readonly HARMONIC_MINOR = [2, 1, 2, 2, 1, 3, 1];
    static readonly MELODIC_MINOR_ASCENDING = [2, 1, 2, 2, 2, 2, 1];
    static readonly DORIAN = [2, 1, 2, 2, 2, 1, 2];
    static readonly PHRYGIAN = [1, 2, 2, 2, 1, 2, 2];
    static readonly LYDIAN = [2, 2, 2, 1, 2, 2, 1];
    static readonly MIXOLYDIAN = [2, 2, 1, 2, 2, 1, 2];
    static readonly LOCRIAN = [1, 2, 2, 1, 2, 2, 2];
    static readonly WHOLE_TONE = [2, 2, 2, 2, 2, 2];

    // constructor(rootNote: Note, intervals: number[], name?: string) {
    //     super(rootNote, intervals, name);
    // }


}