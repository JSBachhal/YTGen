import { ViewChild, ElementRef, Directive } from "@angular/core";

@Directive()
export abstract class EditorHelper {
    @ViewChild('myCanvas', { static: true })
    myCanvas!: ElementRef<HTMLCanvasElement>;
    // @ViewChild('hiddenCanvas', { static: true })
    // hiddenCanvas!: ElementRef<HTMLCanvasElement>;

    constructor() {}

    // downloadEnable = true;
    fontName = 'Badaboom';
    // fontName='impact';
    // fontName='Impacted';
    abstract canvasWidth: number;
    abstract canvasHeight: number;
    abstract imageBloackSize: number;
    abstract textBloackSize: number;

    abstract videoTime: number;

    abstract fontSize: number;
    imagesArray: { img: any, imgWidth: number, imgHeigh: number }[] = [];
    oddImagesArray: { img: any, imgWidth: number, imgHeigh: number }[] = [];
    //   textOnTop = 'CAN YOU FIND THE ODD ONE OUT?';
    //   textOnBottom = 'SUBSCRIBE and LIKE ';
    //   audiopath1 = 'assets/audio1.mp3';
    //   audiopath2 = 'assets/audio2.wav';
    //   audiopath3 = 'assets/audio3.mp3';
    //   audiopath4 = 'assets/audio4.mp3';

    // gethiddenCanvas() {
    //     return this.hiddenCanvas.nativeElement;
    // }
    getCanvas() {
        return this.myCanvas.nativeElement;
    }
    getContext() {
        return this.myCanvas.nativeElement.getContext('2d');
    }
    // gethiddenCanvasContext() {
    //     return this.hiddenCanvas.nativeElement.getContext('2d');
    // }

    drawCircle(ctx: any, x: number, y: number, radius: number, fill: string, stroke: string, strokeWidth: number) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
        if (fill) {
            ctx.fillStyle = fill
            ctx.fill()
        }
        if (stroke) {
            ctx.lineWidth = strokeWidth
            ctx.strokeStyle = stroke
            ctx.stroke()
        }
    }


    renderTick() {
        const context = this.getContext();
        if (context) {
            context.clearRect(0, 0, 100, 50);
            context.font = "30px calibri";
            context.fillStyle = "#222";
            context.fillRect(
                0, 0, 100, 50
            );
            context.fillStyle = "red";
            context.fillText(''.toString(), 50, 45);
        }
    }

    getClock(time: number) {
        if (!time === undefined) {
            return;
        }

        const d = new Date();
        const str = this.Calculate(d.getHours(), d.getMinutes(), d.getSeconds());

        const context = this.getContext();
        if (context) {
            context.clearRect(0, 0, 100, 50);
            context.font = "30px calibri";
            context.fillStyle = "#222";
            context.fillRect(
                0, 0, 100, 50
            );
            context.fillStyle = "red";
            context.fillText(time.toString(), 50, 45);
        }

        console.log(time)
    }

    Calculate(hour: number, min: number, sec: number) {
        let curTime = '';
        // if (hour < 10)
        //     curTime = "0" + hour.toString();
        // else
        //     curTime = hour.toString();

        // if (min < 10)
        //     curTime += ":0" + min.toString();
        // else
        //     curTime += ":" + min.toString();

        if (sec < 10)
            curTime += "0" + sec.toString();
        else
            curTime += "" + sec.toString();
        return curTime;
    }


    getImageBlob = (url: string) => {
        return new Promise(async resolve => {
            let resposne = await fetch(url);
            let blob = resposne.blob();
            resolve(blob);
        });
    };

    // convert a blob to base64
    blobToBase64 = (blob: any) => {
        return new Promise<string | ArrayBuffer | null>(resolve => {
            let reader = new FileReader();
            reader.onload = function () {
                let dataUrl = reader.result;
                resolve(dataUrl);
            };
            reader.readAsDataURL(blob);
        });
    }

    randomLocation!: number;

    randomIntFromInterval(min: number, max: number) {
        // min and max included
        this.randomLocation = Math.floor(Math.random() * (max - min + 1) + min);
        return this.randomLocation;
    }

    rotatedOptionLocation!: {
        x: number,
        y: number,
        sw: number,
        sh: number,
        rotateImage: boolean,
    };

    generateOptionsHelper(
        gridWidth = this.canvasWidth,
        gridHeight = this.canvasHeight,
        imageBloackSize = this.imageBloackSize,
        imagePadding = 12,
    ) {
        const options = [];

        let count = 0;
        let widthCount = Math.floor(gridWidth / (imageBloackSize + imagePadding)) - 1;
        let widthOfset = (gridWidth % imageBloackSize) + imagePadding;
        let heightOfset = (imageBloackSize + imagePadding) / 1.2;
        let heightCount = Math.floor(
            (gridHeight / (imageBloackSize + imagePadding)) - 1
        );

        const randomImageNumber = this.randomIntFromInterval(
            1,
            widthCount * heightCount
        );
        ;
        console.log('randomImageNumber ' + randomImageNumber);
        console.log('widthCount' + widthCount);
        console.log('heightCount' + heightCount);
        let xPosition = widthOfset;
        let yPosition = heightOfset;
        for (let height = 0; height < heightCount; height++) {
            for (let width = 0; width < widthCount; width++) {
                count += 1;
                const option = {
                    x: xPosition,
                    y: yPosition,
                    sw: imageBloackSize,
                    sh: imageBloackSize,
                    rotateImage: count === randomImageNumber,
                };
                if (count === randomImageNumber) {
                    this.rotatedOptionLocation = option;
                }
                options.push(option);
                xPosition = xPosition + imageBloackSize + imagePadding;
            }
            xPosition = widthOfset;
            yPosition = yPosition + imageBloackSize + imagePadding;
        }

        return options;
    }

    getOddImage(index: number) {
        // const degrees = clockwise == true ? 90 : -90;
        let canvas = document.createElement('canvas');
        // let canvas = this.gethiddenCanvas();

        canvas.width = this.imageBloackSize;
        canvas.height = this.imageBloackSize;

        let ctx = canvas.getContext('2d');

        ctx?.rotate(Math.PI);
        ctx?.drawImage(
            this.imagesArray[index].img,
            -this.imageBloackSize,
            -this.imageBloackSize,
            this.imageBloackSize,
            this.imageBloackSize
        );
        const sourceImageData = canvas?.toDataURL();
        const img = new Image();
        img.onload = () => {
            this.oddImagesArray[index] = { img: img, imgWidth: img.width, imgHeigh: img.height };
        };
        img.src = sourceImageData;
    }

    clearCanvas() {
        this.getContext()?.clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
    }
}