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
    clockAudio,endAudio
}
