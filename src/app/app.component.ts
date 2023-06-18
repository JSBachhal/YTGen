import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { EditorHelper } from './editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends EditorHelper implements AfterViewInit {

  // @ViewChild('player', { static: true })
  // player!: ElementRef<HTMLVideoElement>;


  canvasWidth = 720;
  canvasHeight = 1334;
  imageBloackSize = 100;
  textBloackSize = 50;

  videoTime = 15;

  fontSize = 30;
  textOnTop = 'CAN YOU FIND THE ODD ONE OUT?';
  textOnBottom = 'SUBSCRIBE and LIKE ';
  audiopath1 = 'assets/audio1.mp3';
  audiopath2 = 'assets/audio2.wav';
  audiopath3 = 'assets/audio3.mp3';

  constructor() { super() }

  ngAfterViewInit() {
    const ctx = this.getContext();
    if (ctx) {
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, this.getCanvas().width, this.getCanvas().height);
    }
  }


  img!: any;
  rotatedImage!: any;
  // Here, I created a function to draw image.
  onFileSelected(e: any) {
    this.optons = this.generateOptions();
    const reader = new FileReader();
    const file = e.target.files[0];
    // load to image to get it's width/height
    const img = new Image();
    img.onload = () => {
      this.img = img;
      this.renderImage();
    };

    // this is to setup loading the image
    reader.onloadend = function () {
      img.src = reader.result as any;
    };
    // this is to read the file
    reader.readAsDataURL(file);
  }

  optons: any = [];
  renderImage() {
    const ctx = this.getContext();
    this.optons.forEach((option: any) => {
      if (option.rotateImage) {
        this.drawRotate(true, option);
      } else {
        ctx?.drawImage(this.img, option.x, option.y, option.sw, option.sh);
      }
    });
    this.addTextOnTop(this.textOnTop, this.fontSize, 'yellow');
    this.addTextOnBottom(this.textOnBottom, this.fontSize, 'yellow');

  }

  

  drawRotate(clockwise: boolean = true, option: any) {
    const degrees = clockwise == true ? 90 : -90;
    let canvas = this.gethiddenCanvas();

    canvas.width = this.imageBloackSize;
    canvas.height = this.imageBloackSize;

    let ctx = canvas.getContext('2d');

    ctx?.rotate(Math.PI);
    ctx?.drawImage(
      this.img,
      -this.imageBloackSize,
      -this.imageBloackSize,
      option.sw,
      option.sh
    );
    const sourceImageData = canvas?.toDataURL();
    const destinationImage = new Image();
    destinationImage.onload = () => {
      this.getContext()?.drawImage(
        destinationImage,
        option.x,
        option.y,
        option.sw,
        option.sh
      );
    };
    destinationImage.src = sourceImageData;
  }

  addAudioTracks(...audioPaths: string[]) {
    const audioCtx = new AudioContext();
    const destination = audioCtx.createMediaStreamDestination();

    const audioSrcs: any[] = [];
    audioPaths.forEach(v => {
      const audioSrc = new Audio(v);
      audioSrcs.push(audioSrc)
      const audioSource = audioCtx.createMediaElementSource(
        audioSrc
      );
      audioSource.connect(destination);
    })

    return { audioTracks: destination, audioSrcs: audioSrcs };
  }


  chunks: any = [];
  getMdeiaStreeam(time: number) {
    const videoStream = this.getCanvas().captureStream(60);


    const { audioTracks, audioSrcs } = this.addAudioTracks(
      // this.audiopath1,
      this.audiopath3,
      this.audiopath2)

    const outputStream = new MediaStream();
    outputStream.addTrack(videoStream.getVideoTracks()[0]);

    audioTracks.stream.getAudioTracks().forEach(v => {
      outputStream.addTrack(v);
    })


    const mediaRecorder = new MediaRecorder(outputStream);

    mediaRecorder.onstop = (e) => {

      var blob = new Blob(this.chunks, { type: 'video/mp4' });
      this.chunks = [];


      var url = URL.createObjectURL(blob);
      var a = document.createElement('a') as any;
      document.body.appendChild(a);
      (a.style as any) = 'display: none';
      a.href = url;
      a.download = 'Can you Find It ? #shorts .mp4';
      a.click();
      window.URL.revokeObjectURL(url);
    };
    mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    };

    return { mediaRecorder: mediaRecorder, audioSrc: audioSrcs };
  }

  startTimer() {
    let time = 10;
    setInterval(() => {
      this.getClock(time);
      if (time <= 0) {
        // this.drawCircle(this.getContext(), this.rotatedOptionLocation.x + (this.imageBloackSize / 2),
        // this.rotatedOptionLocation.y + (this.imageBloackSize / 2), this.imageBloackSize/1.2, 'transparent', 'black', 5);
      } else {
        time -= 1;
      }
    }, 1000);
  }

  startRecording(time = this.videoTime * 1000) {
    const { mediaRecorder, audioSrc } = this.getMdeiaStreeam(time);
    audioSrc.forEach(v => v.play());


    setTimeout(() => this.startTimer(), 3000);
    setInterval(() => this.getContext()?.fillText('', 0, 0), 100);
    // setInterval(() => this.getContext()?.clearRect(0, 0, 100, 50), 100);
    // setInterval(() => this.renderImage(), 300);
    // setTimeout(() => {
    //   this.drawCircle(this.getContext(), this.rotatedOptionLocation.x + (this.imageBloackSize / 2),
    //     this.rotatedOptionLocation.y + (this.imageBloackSize / 2), this.imageBloackSize/1.2, 'transparent', 'black', 5);
    // }, 10000);
    mediaRecorder.start();

    setTimeout(() => {
      mediaRecorder.stop();
      audioSrc.forEach(v => v.pause());

    }, time);
  }

  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  rotatedOptionLocation!: {
    x: number,
    y: number,
    sw: number,
    sh: number,
    rotateImage: boolean,
  };
  generateOptions(
    gridWidth = this.canvasWidth,
    gridHeight = this.canvasHeight,
    imageBloackSize = this.imageBloackSize
  ) {
    const options = [];
    let count = 0;
    let widthCount = Math.floor(gridWidth / imageBloackSize);
    let widthOfset = (gridWidth % imageBloackSize) / 2;
    let heightCount = Math.floor(
      (gridHeight - this.textBloackSize * 2) / imageBloackSize
    );
    const randomImageNumber = this.randomIntFromInterval(
      0,
      widthCount * heightCount
    );
    console.log(randomImageNumber);
    console.log('widthCount' + widthCount);
    console.log('heightCount' + heightCount);
    let xPosition = widthOfset;
    let yPosition = imageBloackSize - widthOfset;
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
        xPosition = xPosition + imageBloackSize;
      }
      xPosition = widthOfset;
      yPosition = yPosition + imageBloackSize;
    }

    return options;
  }

  addTextOnTop(
    string: string,
    fontSize: number = this.fontSize,
    color: string
  ) {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }
    ctx.fillStyle = '#222';

    ctx.font = fontSize.toString() + 'px monospace';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    ctx.fillRect(0, 0, this.canvasWidth, this.textBloackSize);
    ctx.fillStyle = color;
    ctx.fillText(string, this.getCanvas().width / 2, fontSize);
  }

  addTextOnBottom(
    string: string,
    fontSize: number = this.fontSize,
    color: string
  ) {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }
    ctx.fillStyle = '#222';

    ctx.font = fontSize.toString() + 'px monospace';
    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'center';

    ctx.fillRect(
      0,
      this.canvasHeight - this.textBloackSize,
      this.canvasWidth,
      this.textBloackSize
    );
    ctx.fillStyle = color;

    ctx.fillText(
      string,
      this.canvasWidth / 2,
      this.canvasHeight - this.fontSize / 4
    );
  }
}
