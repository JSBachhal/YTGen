import { AfterViewInit, Component } from '@angular/core';
import { EditorHelper } from '../editor';

@Component({
  selector: 'app-mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.scss']
})
export class MobileViewComponent extends EditorHelper implements AfterViewInit {

  downloadEnable = true;
  EnableAudio = true;

  canvasWidth = 1080;
  canvasHeight = 1920;
  imageBloackSize = 140;
  textBloackSize = 70;

  videoTime = 5;

  fontSize = 40;
  textOnTop = 'CAN YOU FIND THE ODD ONE OUT?';
  textOnBottom = 'SUBSCRIBE and LIKE ';
  audiopath1 = 'assets/audio1.mp3';
  audiopath2 = 'assets/audio2.wav';
  audiopath3 = 'assets/audio3.mp3';
  audiopath4 = 'assets/audio4.mp3';

  constructor() { super() }

  ngAfterViewInit() {
    this.clearCanvas();
    this.createVirtualCanvas();
    this.mediaRecorderOptions.audioBitsPerSecond = 8000000;
    this.mediaRecorderOptions.videoBitsPerSecond = 8000000;
  }



  rotatedImage!: any;


  // Here, I created a function to draw image.
  async onFileSelected(e: any) {
    this.clearCanvas();

    this.optons = this.generateOptions();
    const reader = new FileReader();
    const file = e.target.files[0];
    // load to image to get it's width/height
    const img = new Image();
    img.onload = async () => {
      this.imagesArray[0] = { img: img, imgWidth: img.width, imgHeigh: img.height };
      this.oddImagesArray[0] = await this.getOddImage(0) as any;
      await this.renderImage(0);
    };

    // this is to setup loading the image
    reader.onloadend = function () {
      img.src = reader.result as any;
    };
    // this is to read the file
    reader.readAsDataURL(file);
  }

  async onOddFileSelected(e: any) {
    const reader = new FileReader();
    const file = e.target.files[0];

    const img = new Image();
    img.onload = async () => {
      this.oddImagesArray[0] = { img, imgWidth: img.width, imgHeigh: img.height };
      // this.getOddImage(0);
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
    await this.renderImageURI('assets/like.png', this.getCanvas().width - 80, 300, null);
    // await this.renderImageURI('assets/subscribe.png', 100, this.getCanvas().height - 50, null);
    this.addText('Please Like And Subscribe',40,'yellow',this.canvasWidth/2,this.canvasHeight-50)

    this.optons.forEach((option: any) => {
      if (option.rotateImage) {
        ctx?.drawImage(this.oddImagesArray[index].img, option.x, option.y, option.sw, option.sh);
      } else {
        ctx?.drawImage(this.imagesArray[index].img, option.x, option.y, option.sw, option.sh);
      }
    });
    this.addText(this.textOnTop, this.fontSize, 'yellow');

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
  mediaRecorder!: MediaRecorder;
  getMdeiaStreeam() {
    const VirtualVideoStream = this.getVirtualCanvasContext().canvas.captureStream();
    // const videoStream = this.getCanvas().captureStream();


    const { audioTracks, audioSrcs } = this.addAudioTracks(
      // this.audiopath1,
      this.audiopath2,
      this.audiopath4,
    )

    const outputStream = new MediaStream();
    outputStream.addTrack(VirtualVideoStream.getVideoTracks()[0]);

    audioTracks.stream.getAudioTracks().forEach(v => {
      outputStream.addTrack(v);
    })


    const mediaRecorder = new MediaRecorder(outputStream, this.mediaRecorderOptions);
    this.mediaRecorder = mediaRecorder;
    mediaRecorder.onstop = (e) => {

      var blob = new Blob(this.chunks, { type: 'video/webm' });
      this.chunks = [];


      var url = URL.createObjectURL(blob);
      var a = document.createElement('a') as any;
      document.body.appendChild(a);
      (a.style as any) = 'display: none';
      a.href = url;
      a.download = 'Can you Find It ? HIGHT IQ 99% Fail #shorts .mp4';
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

  async startRecording(time = this.videoTime * 1000) {
    const { mediaRecorder, audioSrc } = this.getMdeiaStreeam();
    if(this.EnableAudio){
      audioSrc.forEach(v => v.play());
    }

    this.clearCanvas();
    this.mediaRecorder.start();
    this.mediaRecorder.pause();
    await this.renderImage();
    this.updateFrameData();
    this.mediaRecorder.resume();
    // setInterval(() => this.renderImage(), 300);

    setTimeout(() => {
      this.mediaRecorder.stop();
      if(this.EnableAudio){
      audioSrc.forEach(v => v.pause());
      }
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
