import { AfterViewInit, Component } from '@angular/core';
import { EditorHelper } from '../editor';
import { AudioModel, AudioSrcMapModel } from './model/audiomap.model';

@Component({
  selector: 'app-guess-the-name',
  templateUrl: './guess-the-name.component.html',
  styleUrls: ['./guess-the-name.component.scss']
})
export class GuessTheNameComponent extends EditorHelper implements AfterViewInit {
  audioSrcs!: any[];

  downloadEnable = true;
  EnableAudio = true;

  canvasWidth = 1080;
  canvasHeight = 1920;
  imageBloackSize = 140;
  textBloackSize = 70;

  videoTime = 4.5;

  fontSize = 40;
  textOnTop = 'CAN YOU FIND THE ODD ONE OUT?';
  textOnBottom = 'SUBSCRIBE and LIKE ';
  audiopath1 = 'assets/guessTheName/guessTheNameAudio.mp3';
  endAudio = 'assets/guessTheName/endAudio.mp3';
  clockAudio = 'assets/audio/clock.wav';

  audioSrcMap: AudioSrcMapModel = {
    introAudio: { name: 'introAudio', path: this.audiopath1, index: 0 },
    clockAudio: { name: 'clockAudio', path: this.clockAudio, index: 1 },
    endAudio: { name: 'endAudio', path: this.endAudio, index: 2 },

  };

  bgImage: any;
  constructor() { super() }

  async ngAfterViewInit() {
    this.mediaRecorderOptions.audioBitsPerSecond = 8000000;
    this.mediaRecorderOptions.videoBitsPerSecond = 8000000;

    this.clearCanvas();
    this.createVirtualCanvas();
    this.bgImage = await this.loadImage('assets/guessTheName/BG1.png', this.bgImage);



    this.drawImage(this.bgImage);
    this.updateFrameData();

  }



  rotatedImage!: any;


  // Here, I created a function to draw image.
  async onFileSelected(e: any) {
    this.clearCanvas();

    // this.optons = this.generateOptions();
    const reader = new FileReader();
    const file = e.target.files[0];
    // load to image to get it's width/height
    const img = new Image();
    img.onload = async () => {
      this.imagesArray[0] = { img: img, imgWidth: img.width, imgHeigh: img.height };
      // this.oddImagesArray[0] = await this.getOddImage(0) as any;
      await this.renderImage(0);
    };

    // this is to setup loading the image
    reader.onloadend = function () {
      img.src = reader.result as any;
    };
    // this is to read the file
    reader.readAsDataURL(file);
  }



  

  addAudioTracks(audioPaths: AudioModel[]) {
    const audioCtx = new AudioContext();
    // const volume = audioCtx.createGain();
    const destination = audioCtx.createMediaStreamDestination();

    const audioSrcs: any[] = [];
    audioPaths.forEach(v => {
      const audioSrc = new Audio(v.path);
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
  vidSrc: any;
  getMdeiaStreeam() {
    const VirtualVideoStream = this.getVirtualCanvasContext().canvas.captureStream();

    const { audioTracks, audioSrcs } = this.addAudioTracks(
      Object.values(this.audioSrcMap)
    )
    this.audioSrcs = audioSrcs;

    const outputStream = new MediaStream();
    outputStream.addTrack(VirtualVideoStream.getVideoTracks()[0]);

    audioTracks.stream.getAudioTracks().forEach(v => {
      outputStream.addTrack(v);
    })


    const mediaRecorder = new MediaRecorder(outputStream, this.mediaRecorderOptions);
    this.mediaRecorder = mediaRecorder;
    mediaRecorder.onstop = (e) => {

      var blob = new Blob(this.chunks, { type: 'video/webm' });
      // this.player.nativeElement.srcObject= blob;
      // this.vidSrc= blob;
      this.chunks = [];
      if (!this.downloadEnable) {
        return;
      }


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

  timerInterval: any
  startTimer(timer = 10) {
    return new Promise(res => {

      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }

      let time = timer;
      this.timerInterval = setInterval(() => {
        if (time < 0) {
          res(true);
          return;
        }
        this.drawTimer(time);
        this.updateFrameData();
        time = time - 1;
      }, 1000);
    })
  }

  async startRecording(time = this.videoTime * 1000) {
    const { mediaRecorder, audioSrc } = this.getMdeiaStreeam();

    this.clearCanvas();
    this.mediaRecorder.start();
    this.mediaRecorder.pause();

    this.drawImage(this.bgImage);
    this.startAudioByIndex(0);
    await this.addRapidText(400, ["Let's see", "if you", "can guess the name",  "of this Animal"],false,500);
    await this.addDelay(500);
    
    this.mediaRecorder.pause();
    this.startAudioByIndex(1);
    await this.renderImage();
    this.mediaRecorder.resume();
    this.updateFrameData();

    await this.startTimer();
    this.stopAudioByIndex(1);
    
    this.mediaRecorder.pause();
    
    this.startAudioByIndex(2);
    await this.addRapidText(400, ["Write the", "answer in comments"],false,400);
    this.updateFrameData();
    this.mediaRecorder.resume();
    await this.addDelay(5000);


    this.mediaRecorder.stop();
    if (this.EnableAudio) {
      audioSrc.forEach(v => v.pause());
    }

  }

  optons: any = [];
  async renderImage(index: number = 0) {
    const ctx = this.getContext();
    this.drawImage(this.bgImage);
    this.addText('Guess the Animal Name', 100, 'yellow', this.canvasWidth / 2, 100)
    ctx?.drawImage(this.imagesArray[index].img, 200, 200, this.imagesArray[index].imgWidth, this.imagesArray[index].imgHeigh);
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




  
}
