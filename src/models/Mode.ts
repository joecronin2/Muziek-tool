import Chord from "./Chord.ts";
import Note from "./Note.ts";
import Scale from "./Scale.ts";

export default class Mode {
    private modeIndex: number;
    private intervals: number[];
    private rootNote: Note;
    private chords: Chord[];
    private name: string;

    private readonly defaultModeIndex: number = Mode.IONIAN;
    private readonly defaultRootNote: Note = new Note();
    
    static readonly IONIAN_INTERVALS = [2, 2, 1, 2, 2, 2, 1];
    static readonly DORIAN_INTERVALS = [2, 1, 2, 2, 2, 1, 2];
    static readonly PHRYGIAN_INTERVALS = [1, 2, 2, 2, 1, 2, 2];
    static readonly LYDIAN_INTERVALS = [2, 2, 2, 1, 2, 2, 1];
    static readonly MIXOLYDIAN_INTERVALS = [2, 2, 1, 2, 2, 1, 2];
    static readonly AEOLIAN_INTERVALS = [2, 1, 2, 2, 1, 2, 2];
    static readonly LOCRIAN_INTERVALS = [1, 2, 2, 1, 2, 2, 2];

    static IONIAN = 1;
    static DORIAN = 2;
    static PHRYGIAN = 3;
    static LYDIAN = 4;
    static MIXOLYDIAN = 5;
    static AEOLIAN = 6;
    static LOCRIAN = 7;

    constructor(modeIndex?: number, rootNote?: Note) {
        if (modeIndex === undefined) {
            this.modeIndex = this.defaultModeIndex;
        } else {
            this.modeIndex = modeIndex;
        }
        
        if (rootNote === undefined) {
            this.rootNote = this.defaultRootNote;1
        } else {
            this.rootNote = rootNote;
        }

        for (let i = 0; i < 7; i++) {

        }
    }
}