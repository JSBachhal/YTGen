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
    bgAudio,
    endAudio,

    number,
    number1,
    number2,
    number3,
    number4,
    number5,
    number6,
    number7,
    number8,
    number9,
    number10,
    number11,
    number12,
    number13,
    number14,
    number15,
    number16,
    number17,
    number18,
    number19,
    number20
}
