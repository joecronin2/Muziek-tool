import NoteGroup from "./NoteGroup";
export default class Scale extends NoteGroup {
    static readonly SCALE_INTERVALS = {
        major: [2, 2, 1, 2, 2, 2, 1],
        minor: [2, 1, 2, 2, 1, 2, 2],
        major_bebop: [2, 2, 1, 2, 1, 1, 2],
        natural_minor: [2, 1, 2, 2, 1, 2, 2],
        harmonic_minor: [2, 1, 2, 2, 1, 3, 1],
        melodic_minor_ascending: [2, 1, 2, 2, 2, 2, 1],
        dorian: [2, 1, 2, 2, 2, 1, 2],
        phrygian: [1, 2, 2, 2, 1, 2, 2],
        lydian: [2, 2, 2, 1, 2, 2, 1],
        mixolydian: [2, 2, 1, 2, 2, 1, 2],
        locrian: [1, 2, 2, 1, 2, 2, 2],
        whole_tone: [2, 2, 2, 2, 2, 2],
        // TODO: add more scales
    };
}