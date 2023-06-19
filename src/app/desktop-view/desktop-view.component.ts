import { AfterViewInit, Component } from '@angular/core';
import { EditorHelper } from '../editor';

@Component({
  selector: 'app-desktop-view',
  templateUrl: './desktop-view.component.html',
  styleUrls: ['./desktop-view.component.scss']
})
export class DesktopViewComponent extends EditorHelper implements AfterViewInit {

  downloadEnable = true;
  canvasWidth = 1920 //3840;
  canvasHeight = 1080 // 2160;
  imageBloackSize = 150;
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
    const files = e.target.files as FileList;
  
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const reader = new FileReader();

      const img = new Image();
      img.onload = async () => {
        this.imagesArray[index] = img;
         this.getOddImage(index);
        await this.renderImage(index);
      };

      reader.onloadend = function () {
        img.src = reader.result as any;
      };
      reader.readAsDataURL(file);

    }
  }

  optons: any = [];
  async renderImage(index: number) {

    const ctx = this.getContext();
    await this.renderImageURI('assets/like&subscribe.png', this.getCanvas().width / 2 - 200, this.getCanvas().height - 50);
    this.optons.forEach((option: any) => {
      if (option.rotateImage) {
        // this.drawRotate(true, option, index);
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


  getOddImage( index: number) {
    // const degrees = clockwise == true ? 90 : -90;
    let canvas = document.createElement('canvas');
    // let canvas = this.gethiddenCanvas();

    canvas.width = this.imageBloackSize;
    canvas.height = this.imageBloackSize;

    let ctx = canvas.getContext('2d');

    ctx?.rotate(Math.PI);
    ctx?.drawImage(
      this.imagesArray[index],
      -this.imageBloackSize,
      -this.imageBloackSize,
      this.imageBloackSize,
      this.imageBloackSize
    );
    const sourceImageData = canvas?.toDataURL();
    const destinationImage = new Image();
    destinationImage.onload = () => {
      this.oddImagesArray[index]= destinationImage;
    };
    destinationImage.src = sourceImageData;
  }

  drawRotate(clockwise: boolean = true, option: any, index: number) {
    const degrees = clockwise == true ? 90 : -90;
    let canvas = this.gethiddenCanvas();

    canvas.width = this.imageBloackSize;
    canvas.height = this.imageBloackSize;

    let ctx = canvas.getContext('2d');

    ctx?.rotate(Math.PI);
    ctx?.drawImage(
      this.imagesArray[index],
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

      if (!this.downloadEnable) { return }

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

  startRecording(time = (this.videoTime * 1000) * this.imagesArray.length) {
    const { mediaRecorder, audioSrc } = this.getMdeiaStreeam(time);
    audioSrc.forEach(v => v.play());


    let intervalId: any;
    // let index: number = 0;
    this.imagesArray.forEach((img: any, index: number) => {
      setTimeout(() => {
        this.optons = this.generateOptions();
        console.log('index imagesArray ' + index)
        clearInterval(intervalId);
        intervalId = setInterval(() => { console.log('indexrender ' + index); this.renderImage(index) }, 300);
      }, (this.videoTime * 1000) * (index))
    })

    
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
    const imagePadding = 12 ;

    let count = 0;
    let widthCount = Math.floor(gridWidth / (imageBloackSize+imagePadding))-1;
    let widthOfset = (gridWidth % imageBloackSize)+imagePadding;
    let heightOfset = (imageBloackSize+imagePadding)/1.2;
    let heightCount = Math.floor(
      (gridHeight / (imageBloackSize+imagePadding))-1
    );

    const randomImageNumber = this.randomIntFromInterval(
      1,
      widthCount * heightCount
    );
    console.log('randomImageNumber '+ randomImageNumber);
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

    ctx.font = (fontSize +10).toString() + 'px monospace';
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
