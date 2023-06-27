export interface AudioModel {
    name: string;
    path: string;
    index: number;
    volume?: number;
}

export type AudioSrcMapModel = {
    [key in keyof typeof audioKeysEnum]: AudioModel;
};

enum audioKeysEnum {
    introAudio,
    challangeStartAudio1,
    challangeStartAudio2,
    challangeStartAudio3,
    challangeStartAudio4,
    challangeStartAudio5,
    challangeEndAudio1,
    challangeEndAudio2,
    challangeEndAudio3,
    challangeEndAudio4,
    challangeEndAudio5,
    backgroundAudio,
    clockAudio,
    endAudio,
}
