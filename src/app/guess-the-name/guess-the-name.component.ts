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
  answers:string[]=[];
  async onFileSelected(e: any) {
    const files = e.target.files as FileList;
    this.clearCanvas();
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const reader = new FileReader();

      const img = new Image();
      img.onload = async () => {
        this.imagesArray[index] = { img: img, imgWidth: img.width, imgHeigh: img.height };
        this.answers.push('');

        await this.renderImage(index);
      };

      reader.onloadend = () => {
        img.src = reader.result as any;
      };
      reader.readAsDataURL(file);

    }
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
        this.drawTimer(time,timer);
        this.updateFrameData();
        time = time - 1;
      }, 1000);
    })
  }

  async startRecording(time = this.videoTime * 1000) {
    const { mediaRecorder, audioSrc } = this.getMdeiaStreeam();

    this.clearCanvas();
    this.mediaRecorder.start();
    this.startTime = Date.now();

    // this.drawImage(this.bgImage);
    // this.startAudioByIndex(0);
    // await this.addRapidText(400, ["Let's see", "if you", "can guess the name"],false,this.canvasWidth/2,this.canvasHeight/2,{color:'yellow'});
    // await this.addDelay(500);
    
    this.mediaRecorder.pause();
    
    for (let index = 0; index < this.imagesArray.length; index++) {
      this.clearCanvas();
      await this.renderImage(index);
      this.updateFrameData();
      this.mediaRecorder.resume();
      this.startAudioByIndex(1);
      await this.startTimer(3);
      this.stopAudioByIndex(1);
    }
    
    // this.mediaRecorder.pause();
    
    // this.startAudioByIndex(2);
    // await this.addRapidText(400, ["Write the", "answer in comments"],false);
    // this.updateFrameData();
    // this.mediaRecorder.resume();
    // await this.addDelay(100);


    this.mediaRecorder.stop();
    if (this.EnableAudio) {
      audioSrc.forEach(v => v.pause());
    }

  }

  optons: any = [];
  async renderImage(index: number = 0) {
    const ctx = this.getContext();
    this.drawImage(this.bgImage);
    this.addText('Guess the Name', 100, 'yellow', this.canvasWidth / 2, 100)
    this.addText('Write in comments', 50, 'yellow', this.canvasWidth / 2, this.canvasHeight-50)
    ctx?.drawImage(this.imagesArray[index].img, 0, 0, this.imagesArray[index].imgWidth, this.imagesArray[index].imgHeigh);
    this.updateFrameData();
  }
  
  async renderResult(index: number = 0) {
    const ctx = this.getContext();
    this.drawImage(this.bgImage);
    this.addText('Guess the Name', 100, 'yellow', this.canvasWidth / 2, 100)
    await this.addRapidText(400, [this.answers[index]],false);
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
