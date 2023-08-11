import NoteGroup from "./NoteGroup.ts";

export default class Chord extends NoteGroup {
    static readonly MAJOR = [4, 3];
    static readonly MINOR = [3, 4];
    static readonly AUGMENTED = [4, 4];
    static readonly DIMINISHED = [3, 3];
    static readonly SUS2 = [2, 5];
    static readonly SUS4 = [5, 2];
    static readonly MAJOR_6 = [4, 3, 2];
    static readonly MINOR_6 = [3, 4, 2];
    static readonly DOMINANT_7 = [4, 3, 3];
    static readonly MAJOR_7 = [4, 3, 4];
    static readonly MINOR_7 = [3, 4, 3];
    static readonly MINOR_MAJOR_7 = [3, 4, 4];
    static readonly AUGMENTED_7 = [4, 4, 2];
    static readonly AUGMENTED_MAJOR_7 = [4, 4, 3];
    static readonly HALF_DIMINISHED_7 = [3, 3, 4];
    static readonly DIMINISHED_7 = [3, 3, 3];
    static readonly DOMINANT_7_FLAT_5 = [4, 2, 4];
    static readonly DOMINANT_7_SHARP_5 = [4, 4, 2];
    static readonly DOMINANT_7_SHARP_9 = [3, 3, 2, 4];
    static readonly DOMINANT_7_FLAT_9 = [3, 3, 2, 3];
    static readonly MAJOR_9 = [4, 3, 4, 3];
    static readonly MINOR_9 = [3, 4, 3, 4];
    static readonly MINOR_MAJOR_9 = [3, 4, 4, 3];
    static readonly AUGMENTED_9 = [4, 4, 2, 3];
    static readonly AUGMENTED_MAJOR_9 = [4, 4, 3, 3];
    static readonly DOMINANT_9 = [4, 3, 3, 4];
}