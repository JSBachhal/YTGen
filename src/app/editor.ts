import { ViewChild, ElementRef, Directive } from "@angular/core";
import { async } from "@angular/core/testing";

@Directive()
export abstract class EditorHelper {
    @ViewChild('myCanvas', { static: true })
    myCanvas!: ElementRef<HTMLCanvasElement>;
    // @ViewChild('hiddenCanvas', { static: true })
    // hiddenCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('player', { static: true })
    player!: ElementRef<HTMLVideoElement>;

    constructor() { }

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

    mediaRecorderOptions = {
        audioBitsPerSecond: 1024 * 1024 * 200,
        videoBitsPerSecond: 1024 * 1024 * 200,
        mimeType: "video/webm; codecs=vp9",
    };

    frameData!: any;
    getUpdatedFrameData() {
        return this.frameData
    }

    virtualCanvas!:HTMLCanvasElement;
    
    createVirtualCanvas(){
        this.virtualCanvas = document.createElement('canvas');
        this.virtualCanvas.width = this.canvasWidth;
        this.virtualCanvas.height = this.canvasHeight;
        // document.body.appendChild(this.virtualCanvas)
        this.updateVirtualCanvas();
    }

    getVirtualCanvasContext(){
        return this.virtualCanvas.getContext('2d' , { willReadFrequently: true }) || {} as CanvasRenderingContext2D;
    }

    updateVirtualCanvas(){
        // const frameData = this.getUpdatedFrameData();
        if(this.frameData){
            // this.getVirtualCanvasContext().drawImage(frameData as any,0,0);
            this.getVirtualCanvasContext().putImageData(this.frameData,0,0);
        }
        requestAnimationFrame(()=>this.updateVirtualCanvas());
    }

    updateFrameData(){
        const ctx = this.getContext();
        if (!ctx) { return; }
        // this.frameData = ctx.canvas.toDataURL();// getImageData(0,0,this.canvasWidth,this.canvasHeight);
        this.frameData = ctx.getImageData(0,0,this.canvasWidth,this.canvasHeight);
        // console.log(this.frameData)
    }

    // gethiddenCanvas() {
    //     return this.hiddenCanvas.nativeElement;
    // }
    getCanvas() {
        return this.myCanvas.nativeElement;
    }

    getContext() {
        return this.myCanvas.nativeElement.getContext('2d', { willReadFrequently: true });
    }
    // gethiddenCanvasContext() {
    //     return this.hiddenCanvas.nativeElement.getContext('2d');
    // }




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
        let widthCount = Math.floor(gridWidth / (imageBloackSize + imagePadding)) - 1;
        this.widthOfset = (gridWidth % imageBloackSize) + imagePadding;
        let widthOfset = this.widthOfset;

        this.heightOfset = (imageBloackSize + imagePadding) / 1.2;
        let heightOfset = this.heightOfset;

        console.log('widthOfset ' + widthOfset);
        console.log('heightOfset ' + heightOfset);

        let heightCount = Math.floor(
            (gridHeight / (imageBloackSize + imagePadding)) - 1
        );

        const randomImageNumber = this.randomIntFromInterval(
            30,
            widthCount * heightCount
        );
        this.randomLocation = randomImageNumber; 
        // console.log('randomImageNumber ' + randomImageNumber);
        // console.log('widthCount' + widthCount);
        // console.log('heightCount' + heightCount);
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

        return new Promise<{ img: any, imgWidth: number, imgHeigh: number }>(res=>{

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
            // this.oddImagesArray[index] = { img: img, imgWidth: img.width, imgHeigh: img.height };
            res({ img: img, imgWidth: img.width, imgHeigh: img.height })
        };
        img.src = sourceImageData;
    })

    }

    clearCanvas() {
        const ctx = this.getContext();
        if (!ctx) { return; }

        ctx.clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
        ctx.fillStyle = '#222';
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
        font=this.fontName
    ) {
        const ctx = this.getContext();
        if (!ctx) {
            return;
        }
        ctx.font = (fontSize + 10).toString() + `px ${font}`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

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

    drawImage(img: any,x: number =0,y: number=0 ){
        const ctx = this.getContext();
        if (!ctx) { return };
        ctx.drawImage(img,x,y)
    }

     downloadThumbnail(imagePath= this.getCanvas().toDataURL() , imageName: string= 'thumbnail' ){
        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link)
        link.setAttribute('download', imageName + '.png');
        link.setAttribute('href', imagePath.replace("image/png", "image/octet-stream"));
        link.click();
    }
}