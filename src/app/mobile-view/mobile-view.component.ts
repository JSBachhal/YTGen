import { AfterViewInit, Component } from '@angular/core';
import { EditorHelper } from '../editor';

@Component({
  selector: 'app-mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.scss']
})
export class MobileViewComponent extends EditorHelper implements AfterViewInit {

  downloadEnable = true;

  canvasWidth = 720;
  canvasHeight = 1334;
  imageBloackSize = 70;
  textBloackSize = 50;

  videoTime = 9;

  fontSize = 30;
  textOnTop = 'CAN YOU FIND THE ODD ONE OUT?';
  textOnBottom = 'SUBSCRIBE and LIKE ';
  audiopath1 = 'assets/audio1.mp3';
  audiopath2 = 'assets/audio2.wav';
  audiopath3 = 'assets/audio3.mp3';
  audiopath4 = 'assets/audio4.mp3';

  constructor() { super() }

  ngAfterViewInit() {
    const ctx = this.getContext();
    if (ctx) {
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, this.getCanvas().width, this.getCanvas().height);
    }
  }


  imagesArray: any[] = [];
  oddImagesArray: any[] = [];
  rotatedImage!: any;

  // Here, I created a function to draw image.
  async onFileSelected(e: any) {
    this.optons = this.generateOptions();
    const reader = new FileReader();
    const file = e.target.files[0];
    // load to image to get it's width/height
    const img = new Image();
    img.onload = async () => {
      this.imagesArray[0] = img;
      this.getOddImage(0);
      await this.renderImage(0);
    };

    // this is to setup loading the image
    reader.onloadend = function () {
      img.src = reader.result as any;
    };
    // this is to read the file
    reader.readAsDataURL(file);
  }

  optons: any = [];
  async renderImage(index: number = 0) {
    const ctx = this.getContext();
    await this.renderImageURI('assets/like.png', this.getCanvas().width - 80, 300);
    await this.renderImageURI('assets/subscribe.png', 100, this.getCanvas().height - 50);
    this.optons.forEach((option: any) => {
      if (option.rotateImage) {
        ctx?.drawImage(this.oddImagesArray[index], option.x, option.y, option.sw, option.sh);
      } else {
        ctx?.drawImage(this.imagesArray[index], option.x, option.y, option.sw, option.sh);
      }
    });
    this.addTextOnTop(this.textOnTop, this.fontSize, 'yellow');
    // this.addTextOnBottom(this.textOnBottom, this.fontSize, 'yellow');

  }


  async renderImageURI(path: string, xpos: number, ypos: number) {
    const ctx = this.getContext();
    if (ctx) {
      let blob = await this.getImageBlob(path);
      let base64 = await this.blobToBase64(blob);

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img as any, xpos, ypos);

      };
      img.src = base64 as any;


    }
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
      this.audiopath2,
      this.audiopath4,
    )

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

    setInterval(() => this.renderImage(), 300);
    
    mediaRecorder.start();

    setTimeout(() => {
      mediaRecorder.stop();
      audioSrc.forEach(v => v.pause());

    }, time);
  }



  generateOptions(
    gridWidth = this.canvasWidth,
    gridHeight = this.canvasHeight,
    imageBloackSize = this.imageBloackSize
  ) {

    const superOptions = super.generateOptionsHelper(
      gridWidth,
      gridHeight,
      imageBloackSize, 15);

    return superOptions;

    const options = [];
    let count = 0;
    let widthCount = Math.floor(gridWidth / imageBloackSize) - 1;
    let widthOfset = 10;
    let heightCount = Math.floor(
      (gridHeight - this.textBloackSize * 2) / imageBloackSize
    ) - 1;
    const randomImageNumber = this.randomIntFromInterval(
      1,
      widthCount * heightCount
    );
    console.log(randomImageNumber);
    console.log('widthCount' + widthCount);
    console.log('heightCount' + heightCount);
    let xPosition = widthOfset;
    let yPosition = imageBloackSize - widthOfset + 40;
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

    ctx.font = fontSize.toString() + `px ${this.fontName}`;
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

    ctx.font = fontSize.toString() + `px ${this.fontName}`;
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
