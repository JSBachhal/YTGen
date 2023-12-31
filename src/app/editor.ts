import { ViewChild, ElementRef, Directive } from "@angular/core";
declare const MarvinImage: any;
declare const Marvin: any;
// import * as MarvinImage from "MarvinImage";
@Directive()
export abstract class EditorHelper {
    @ViewChild('myCanvas', { static: true })
    myCanvas!: ElementRef<HTMLCanvasElement>;
    // @ViewChild('hiddenCanvas', { static: true })
    // hiddenCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('player', { static: true })
    player!: ElementRef<HTMLVideoElement>;

    color = "#ba2649";

    constructor() { }

    // downloadEnable = true;
    fontName = 'Badaboom';
    // fontName='impact';
    // fontName = 'Impacted';
    abstract canvasWidth: number;
    abstract canvasHeight: number;
    abstract imageBloackSize: number;
    abstract textBloackSize: number;
    abstract audioSrcs: any[];

    abstract videoTime: number;
    startTime: number = 0;
    abstract fontSize: number;
    imagesArray: { img: any, imgWidth: number, imgHeigh: number, answer?: string }[] = [];
    oddImagesArray: { img: any, imgWidth: number, imgHeigh: number }[] = [];
    //   textOnTop = 'CAN YOU FIND THE ODD ONE OUT?';
    //   textOnBottom = 'SUBSCRIBE and LIKE ';
    //   audiopath1 = 'assets/audio1.mp3';
    //   audiopath2 = 'assets/audio2.wav';
    //   audiopath3 = 'assets/audio3.mp3';
    //   audiopath4 = 'assets/audio4.mp3';

    mediaRecorderOptions = {
        audioBitsPerSecond: 1024 * 1024 * 200,
        videoBitsPerSecond: 1024 * 1024 * 200,
        mimeType: "video/webm; codecs=vp9",
    };


    frameData!: any;
    getUpdatedFrameData() {
        return this.frameData
    }

    getTransparentImage(config: {
        img: any,
        x: number,
        y: number,
        dw: number,
        dh: number
    }
    ) {
        return new Promise<any>(res => {
            let canvas = document.createElement('canvas') as HTMLCanvasElement | null;
            if (canvas) {
                canvas.width = config.dw;
                canvas.height = config.dh;
                const ctx = canvas.getContext('2d');
                const image = new MarvinImage();
                // MarvinImage.prototype.load = function (img, callback) {
                //     this.onload = callback;
                //     this.image = new Image();
                //     var ref = this;
                //     this.image.onload = function () { ref.callbackImageLoaded(ref) };
                //     this.image.crossOrigin = "anonymous";
                //     this.image.src = url;
                // };
                image.image = config.img;
                image.callbackImageLoaded(image);

                {
                    for (var y = 0; y < image.getHeight(); y++) {

                        for (var x = 0; x < image.getWidth(); x++) {
                            var r = image.getIntComponent0(x, y);
                            var g = image.getIntComponent1(x, y);
                            var b = image.getIntComponent2(x, y);

                            if (r >= 250 && g >= 250 && b >= 250) {
                                image.setIntColor(x, y, 0);
                            }
                        }
                    }
                }

                Marvin.alphaBoundary(image.clone(), image, 8);
                // image.draw(ctx?.canvas);
                // ctx?.drawImage(config.img, 0, 0);
                // const frame = ctx?.getImageData(0, 0, config.dw, config.dh);
                // if (frame) {
                ctx?.putImageData(image.imageData, 0, 0);
                const imageURL = ctx?.canvas?.toDataURL();
                const img = new Image();

                img.onload = () => {
                    res(img);
                };
                img.src = imageURL as any;
                // }
            }
        });
    }

    virtualCanvas!: HTMLCanvasElement;

    createVirtualCanvas() {
        this.virtualCanvas = document.createElement('canvas');
        this.virtualCanvas.width = this.canvasWidth;
        this.virtualCanvas.height = this.canvasHeight;
        // document.body.appendChild(this.virtualCanvas)
        this.updateVirtualCanvas();
    }

    getVirtualCanvasContext() {
        return this.virtualCanvas.getContext('2d', { willReadFrequently: true }) || {} as CanvasRenderingContext2D;
    }

    updateVirtualCanvas() {
        if (this.frameData) {
            this.getVirtualCanvasContext().putImageData(this.frameData, 0, 0);
        }
        requestAnimationFrame(() => this.updateVirtualCanvas());
    }

    updateFrameData() {
        const ctx = this.getContext();
        this.frameData = ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    }

    // gethiddenCanvas() {
    //     return this.hiddenCanvas.nativeElement;
    // }
    getCanvas() {
        return this.myCanvas.nativeElement;
    }

    getContext() {
        return this.myCanvas.nativeElement.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
    }
    // gethiddenCanvasContext() {
    //     return this.hiddenCanvas.nativeElement.getContext('2d');
    // }

    drawTimer(time: number, timer: number) {
        this.drawCircle(
            35,
            35,
            35,
            'yellow',
            '#ba2649',
            8
        )
        this.addText(time.toString(), 40, 'black', 70, 70);
        this.drawTopTimer(time, timer);
    }

    drawTopTimer(timeLeft: number, totalTime: number) {
        const context = this.getContext();
        if (context) {
            context.fillStyle = "#ba2649"//"#ba2649";
            context.fillRect(
                0, 0, context.canvas.width * (1 - timeLeft / totalTime), 5
            );
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




    randomLocation!: number;

    randomIntFromInterval(min: number, max: number) {
        // min and max included
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        return randomNumber;
    }

    OddImageLocation!: {
        x: number,
        y: number,
        sw: number,
        sh: number,
        rotateImage: boolean,
    };

    widthOfset = 0;
    heightOfset = 0;

    generateOptionsHelper(
        gridWidth = this.canvasWidth,
        gridHeight = this.canvasHeight,
        imageBloackSize = this.imageBloackSize,
        imagePadding = 12,
    ) {
        const options = [];

        let count = 0;
        const items = gridWidth / (imageBloackSize + imagePadding);
        let widthCount = Math.floor(items);

        this.widthOfset = (this.canvasWidth - ((imageBloackSize + imagePadding) * widthCount)) / 2;
        let widthOfset = this.widthOfset;

        this.heightOfset = (imageBloackSize + imagePadding) / 1.2;
        let heightOfset = this.heightOfset;

        // console.log('widthOfset ' + widthOfset);
        // console.log('heightOfset ' + heightOfset);

        let heightCount = Math.floor(
            (gridHeight / (imageBloackSize + imagePadding)) - 1
        );

        const randomImageNumber = this.randomIntFromInterval(
            15,
            widthCount * heightCount
        );
        this.randomLocation = randomImageNumber;
        // console.log('randomImageNumber ' + randomImageNumber);
        // console.log('widthCount' + widthCount);
        // console.log('heightCount' + heightCount);
        let xPosition = widthOfset;
        let yPosition = heightOfset + imagePadding;
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
                    this.OddImageLocation = option;
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

        return new Promise<{ img: any, imgWidth: number, imgHeigh: number }>(res => {

            // const degrees = clockwise == true ? 90 : -90;
            let canvas = document.createElement('canvas');
            // let canvas = this.gethiddenCanvas();

            canvas.width = this.imageBloackSize;
            canvas.height = this.imageBloackSize;

            let ctx = canvas.getContext('2d');

            ctx?.translate(this.imageBloackSize / 2, this.imageBloackSize / 2);
            ctx?.scale(-1, 1)
            // ctx?.rotate(Math.PI);
            ctx?.drawImage(
                this.imagesArray[index].img,
                -this.imageBloackSize / 2,
                -this.imageBloackSize / 2,
                this.imageBloackSize,
                this.imageBloackSize
            );
            const sourceImageData = canvas?.toDataURL();
            const img = new Image();
            img.onload = () => {
                // this.oddImagesArray[index] = { img: img, imgWidth: img.width, imgHeigh: img.height };
                res({ img: img, imgWidth: img.width, imgHeigh: img.height })
            };
            img.src = sourceImageData;
        })

    }

    clearCanvas(color = '#222') {
        const ctx = this.getContext();
        if (!ctx) { return; }

        ctx.clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, this.getCanvas().width, this.getCanvas().height);
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
            reader.onload = () => {
                let dataUrl = reader.result;
                resolve(dataUrl);
            };
            reader.readAsDataURL(blob);
        });
    }

    async renderImageURI(path: string, xpos: number, ypos: number, target: any, ctx = this.getContext()) {
        return new Promise(async resolve => {
            if (ctx) {
                if (target) {
                    ctx.drawImage(target as any, xpos, ypos);
                    resolve(true);
                }

                let blob = await this.getImageBlob(path);
                let base64 = await this.blobToBase64(blob);

                const img = new Image();
                img.onload = () => {
                    if (target !== null) {
                        target = img;
                    }
                    ctx.drawImage(img as any, xpos, ypos);
                    resolve(true);
                };
                img.src = base64 as any;
            }
        });
    }

    async loadImage(path: string, target: any,) {

        return new Promise(async res => {

            let blob = await this.getImageBlob(path);
            let base64 = await this.blobToBase64(blob);

            target = new Image();
            target.onload = () => {
                res(target);
            };
            target.src = base64 as any;
        });
    }

    addText(
        string: string,
        fontSize: number = this.fontSize,
        color: string,
        xpos: number = this.getCanvas().width / 2,
        ypos: number = fontSize,
        config?: {
            font?: string,
            strokeColor?: string
        }
    ) {

        const options = {
            font: this.fontName,
            strokeColor: '#FFF',
            ...config
        }
        const ctx = this.getContext();
        if (!ctx) {
            return;
        }
        ctx.font = (fontSize).toString() + `px ${options.font}`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.strokeStyle = options.strokeColor;
        ctx.lineWidth = 10;
        ctx.strokeText(string, xpos, ypos);
        ctx.fillStyle = color;
        ctx.fillText(string, xpos, ypos);
    }

    drawCircle(x: number, y: number, radius: number, fill: string, stroke: string, strokeWidth: number) {
        const ctx = this.getContext();
        if (!ctx) { return; }
        ctx.beginPath()
        ctx.arc(x + radius, y + radius, radius + 10, 0, 2 * Math.PI, false)
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



    typeOut(str: string, startX: number, startY: number, lineHeight: number, padding: number) {
        var cursorX = startX || 0;
        var cursorY = startY || 0;
        var lineHeight = lineHeight || 32;
        padding = padding || 10;
        var i = 0;
        const ctx = this.getContext();
        if (!ctx) { return };
        const _inter = setInterval(function () {
            var w = ctx.measureText(str.charAt(i)).width;
            if (cursorX + w >= ctx.canvas.width - padding) {
                cursorX = startX;
                cursorY += lineHeight;
            }
            ctx.fillText(str.charAt(i), cursorX, cursorY);
            i++;
            cursorX += w;
            if (i === str.length) {
                clearInterval(_inter);
            }
        }, 75);
    }

    drawImage(img: any, x: number = 0, y: number = 0, config?: { imgWidth: number, imgHeight: number }) {
        const ctx = this.getContext();
        if (!ctx || !img) { return };
        if (config) {
            ctx.drawImage(img, x, y, config.imgWidth, config.imgHeight)
        } else {
            ctx.drawImage(img, x, y)
        }
    }

    downloadThumbnail(imagePath = this.getCanvas().toDataURL(), imageName: string = 'thumbnail') {
        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link)
        link.setAttribute('download', imageName + '.png');
        link.setAttribute('href', imagePath.replace("image/png", "image/octet-stream"));
        link.click();
    }

    startAudioByIndex(index: number) {
        this.audioSrcs[index].play();
    }
    stopAudioByIndex(index: number) {
        this.audioSrcs[index].pause();
    }


    addDelay(delay: number) {
        return new Promise<boolean>(res => {
            setTimeout(() => {
                res(true);
            }, delay);
        })
    }

    rapidTextInterval!: any;
    addRapidText(intervalTime = 500, text: string[], clearPreviousText = true, xpos = this.canvasWidth / 2,
        startYPos = this.canvasHeight / 2, options?: {
            fontSize?: number, color?: string, padding?: number,
            drawOnBackround?: boolean
            backroundColor?: string,
            strokeColor?: string
        }) {

        const config = {
            fontSize: 90, color: this.color, padding: 20, drawOnBackround: false,
            backroundColor: '#FFF',
            strokeColor: '#FFF',
            ...options
        }
        return new Promise<boolean>(res => {

            let index = 0;
            if (this.rapidTextInterval) {
                clearInterval(this.rapidTextInterval);
            }

            this.rapidTextInterval = setInterval(() => {

                if (index === text.length) {
                    clearInterval(this.rapidTextInterval);
                    res(true);
                    return;
                }

                let yOffset = text.length > 1 ? (index + 1) * (config.fontSize + config.padding) : 0;
                let yPos = startYPos - (config.fontSize * text.length);
                yPos = yPos + yOffset;


                if (text[index]) {

                    if (config.drawOnBackround && index === 0) {
                        this.drawRect(yPos, config.fontSize, { bgColor: config.backroundColor, heightPaddingPercentage: 20 });
                    }

                    if (clearPreviousText) {
                        this.clearCanvas();
                        this.addText(text[index], config.fontSize, config.color, xpos, this.canvasHeight / 2);
                    } else {

                        this.addText(text[index], config.fontSize, config.color, xpos, yPos, { strokeColor: config.strokeColor });
                    }
                }
                this.updateFrameData();
                index += 1;
            }, intervalTime)

        })
    }

    TextBgcolor: string = '#FFF';
    drawRect(ypos: number, fontSize: number, options = { heightPaddingPercentage: 20, bgColor: this.TextBgcolor }) {
        const ctx = this.getContext();
        ctx.fillStyle = options.bgColor || '#FFF';
        ctx.font = (fontSize).toString() + `px ${this.fontName}`;

        let fontHeight = ctx.measureText('M').width;
        let height = fontHeight + ((options.heightPaddingPercentage / fontHeight) * 100);
        ctx.fillRect(0, ypos - height, this.canvasWidth, height * 1.75);
    }



    introVideo: HTMLVideoElement | null = null;
    introVideoCanvas: HTMLCanvasElement | null = null;
    videoWidth!: number;
    videoHeight!: number;

    createVideoElement(videoSrc: string, readyCallback: (introVideo: HTMLVideoElement) => void) {
        const introVideoCanvas = document.createElement('canvas');
        const ctx = introVideoCanvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) { return };
        ctx.canvas.width = this.canvasWidth;
        ctx.canvas.height = this.canvasHeight;

        const introVideo = document.createElement('video');
        introVideo.src = videoSrc;

        introVideo.onloadedmetadata = (e) => {
            this.videoWidth = 1920 // this.canvasWidth;
            this.videoHeight = 1080 // this.canvasHeight;
            readyCallback(introVideo);
        };



        introVideo.onplaying = (e) => {
            this.timerCallback(ctx)
        };


        this.introVideo = introVideo;
        this.introVideoCanvas = introVideoCanvas;
        return this.introVideo;
    }



    play(img: any) {
        return new Promise(res => {
            // this.drawImage(img);
            (this.introVideo as HTMLVideoElement).onended = (e) => res(true);
            this.introVideo?.play();
        })
    }

    stop() {
        this.introVideo?.pause();
        this.introVideo = null
        this.introVideoCanvas = null;
    }

    timerCallback(ctx: CanvasRenderingContext2D) {
        if (this.introVideo?.paused || this.introVideo?.ended) {
            return;
        }
        const { frame } = this.computeFrame(ctx);

        this.getContext().putImageData(frame, 0, 0);
        this.updateFrameData();
        setTimeout(() => {
            this.timerCallback(ctx);
        }, 0);

    }

    activeImageFrameData!: ImageData | null;
    computeFrame(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.introVideo as any, 0, 0, this.canvasWidth, this.canvasHeight);
        let frame = ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight) as ImageData;
        // let imgData = ctx?.canvas.toDataURL() // (0, 0, this.videoWidth, this.videoHeight);

        let l = frame.data.length / 4;

        const data = frame.data;

        for (let i = 0; i < l; i++) {
            const index = i * 4;
            let r = frame.data[index + 0];
            let g = frame.data[index + 1];
            let b = frame.data[index + 2];
            if (g < 10 && r < 10 && b < 10) {

                if (this.activeImageFrameData) {
                    frame.data[index + 0] = this.activeImageFrameData.data[index + 0];
                    frame.data[index + 1] = this.activeImageFrameData.data[index + 1];
                    frame.data[index + 2] = this.activeImageFrameData.data[index + 2];
                }

                frame.data[i * 4 + 3] = 100;
            }
        }
        return { frame };

    }

    async addVideo(introPath: string) {
        return new Promise<HTMLVideoElement>(resolve => {
            this.createVideoElement(introPath, (playerElement) => resolve(playerElement));
        })
    }

}