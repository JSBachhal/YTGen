import { AfterViewInit, Component } from '@angular/core';
import { EditorHelper } from '../editor';
import { Animation } from '../animation';
import { AudioModel, AudioSrcMapModel } from './model/audiomap.model';

@Component({
  selector: 'app-desktop-view',
  templateUrl: './desktop-view.component.html',
  styleUrls: ['./desktop-view.component.scss']
})
export class DesktopViewComponent extends Animation implements AfterViewInit {

  downloadEnable = true //true;
  canvasWidth = 1920 //1920 //3840;
  canvasHeight = 1080 // 1080 // 2160;
  imageBloackSize = 110;
  padding = 15;
  textBloackSize = 50;

  videoTime = 11;

  fontSize = 80;

  textOnTop = 'CAN YOU FIND THE ODD ONE OUT ?';
  textOnBottom = 'SUBSCRIBE And LIKE 👍';

  audiopath1 = 'assets/audio1.mp3';
  audiopath2 = 'assets/audio2.wav';
  audiopath3 = 'assets/audio3.mp3';
  audiopath4 = 'assets/audio4.mp3';

  introAudio = 'assets/audio/introAudio.wav';
  backgroundAudio = 'assets/audio/backgroundAudio.mp3';
  clockAudio = 'assets/audio/clock.wav';
  endAudio = 'assets/audio/endAudio.wav';


  challangeStartAudio1 = 'assets/audio/challangeStartAudio1.wav';
  challangeStartAudio2 = 'assets/audio/challangeStartAudio2.wav';
  challangeStartAudio3 = 'assets/audio/challangeStartAudio3.wav';
  challangeStartAudio4 = 'assets/audio/challangeStartAudio4.wav';
  challangeStartAudio5 = 'assets/audio/challangeStartAudio5.wav';

  challangeEndAudio1 = 'assets/audio/challangeEndAudio1.wav';
  challangeEndAudio2 = 'assets/audio/challangeEndAudio2.wav';
  challangeEndAudio3 = 'assets/audio/challangeEndAudio3.wav';
  challangeEndAudio4 = 'assets/audio/challangeEndAudio4.wav';
  challangeEndAudio5 = 'assets/audio/challangeEndAudio5.wav';


  audioSrcMap: AudioSrcMapModel = {
    introAudio: { name: 'introAudio', path: this.introAudio, index: 0 },

    challangeStartAudio1: { name: 'challangeStartAudio1', path: this.challangeStartAudio1, index: 1 },
    challangeStartAudio2: { name: 'challangeStartAudio2', path: this.challangeStartAudio2, index: 2 },
    challangeStartAudio3: { name: 'challangeStartAudio3', path: this.challangeStartAudio3, index: 3 },
    challangeStartAudio4: { name: 'challangeStartAudio4', path: this.challangeStartAudio4, index: 4 },
    challangeStartAudio5: { name: 'challangeStartAudio5', path: this.challangeStartAudio5, index: 5 },

    challangeEndAudio1: { name: 'challangeEndAudio1', path: this.challangeEndAudio1, index: 6 },
    challangeEndAudio2: { name: 'challangeEndAudio2', path: this.challangeEndAudio2, index: 7 },
    challangeEndAudio3: { name: 'challangeEndAudio3', path: this.challangeEndAudio3, index: 8 },
    challangeEndAudio4: { name: 'challangeEndAudio4', path: this.challangeEndAudio4, index: 9 },
    challangeEndAudio5: { name: 'challangeEndAudio5', path: this.challangeEndAudio5, index: 10 },

    backgroundAudio: { name: 'backgroundAudio', path: this.backgroundAudio, index: 11, volume: 1 },
    clockAudio: { name: 'clockAudio', path: this.clockAudio, index: 12 },
    endAudio: { name: 'endAudio', path: this.endAudio, index: 13 },
  };

  constructor() { super() }

  introPath='assets/introvideo/introBrainTherapy.mp4';

  async ngAfterViewInit() {
    this.clearCanvas();
    
    const player = await this.renderIntro(this.introPath,()=>null);
    player.play();
    // await this.loadBGImage();
    this.bgImage = await this.loadImage('assets/BG4k4.webp', this.bgImage);
    this.createVirtualCanvas();
    this.mediaRecorderOptions.audioBitsPerSecond = 8000000;
    this.mediaRecorderOptions.videoBitsPerSecond = 8000000;

  }

  bgImage: any;
  async loadBGImage() {
    await this.renderImageURI('assets/BG4k4.webp', 0, 0, this.bgImage);
  }

  // Here, I created a function to draw image.
  onFileSelected(e: any) {
    this.optons = this.generateOptions();
    const files = e.target.files as FileList;
    this.clearCanvas();
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const reader = new FileReader();

      const img = new Image();
      img.onload = async () => {
        this.imagesArray[index] = { img: img, imgWidth: img.width, imgHeigh: img.height };
        this.oddImagesArray[index] = await this.getOddImage(index) as any;
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
  audioSrcs!: any[];
  getMdeiaStreeam(time: number) {
    const VirtualVideoStream = this.getVirtualCanvasContext().canvas.captureStream();
    // const videoStream = this.getCanvas().captureStream(30);


    const { audioTracks, audioSrcs } = this.addAudioTracks(
      Object.values(this.audioSrcMap)
    )


    this.audioSrcs = audioSrcs;

    const outputStream = new MediaStream();
    // outputStream.addTrack(videoStream.getVideoTracks()[0]);
    outputStream.addTrack(VirtualVideoStream.getVideoTracks()[0]);

    audioTracks.stream.getAudioTracks().forEach((v, i) => {


      outputStream.addTrack(v);


    })


    const mediaRecorder = new MediaRecorder(outputStream, this.mediaRecorderOptions);
    // const mediaRecorder = new MediaRecorder(outputStream);
    this.mediaRecorder = mediaRecorder;

    mediaRecorder.onstop = (e) => {

      if (!this.downloadEnable) { return }

      var blob = new Blob(this.chunks, { type: 'video/webm' });
      // var blob = new Blob(this.chunks, { type: 'video/webm' });
      this.chunks = [];


      var url = URL.createObjectURL(blob);
      var a = document.createElement('a') as any;
      document.body.appendChild(a);
      (a.style as any) = 'display: none';
      a.href = url;
      a.download = 'Can you Find It ? #shorts .webm';
      a.click();
      window.URL.revokeObjectURL(url);
    };
    mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    };

    return { mediaRecorder: mediaRecorder, audioSrc: audioSrcs };
  }


  highLightOddImage() {
    this.drawCircle(
      this.OddImageLocation.x,
      this.OddImageLocation.y,
      this.imageBloackSize / 2,
      '',
      'red',
      8
    )
  }

  

  async startRecording(time = (this.videoTime * 1000) * this.imagesArray.length) {
    const { mediaRecorder, audioSrc } = this.getMdeiaStreeam(time);

    this.clearCanvas();
    mediaRecorder.start();
    mediaRecorder.pause();
    this.drawImage(this.bgImage);
    const player = await this.createIntro(mediaRecorder);
    player.play();
    mediaRecorder.resume();
    // intro audio
    this.startAudioByIndex(0);

    await this.renderPostIntroText(9000);


    this.startAudioByIndex(11);
    const allFrames = new Promise<boolean>(async res=>{
      await this.recordAllFrames(0, this.imagesArray.length,()=>res(true));
    });

    await allFrames;
    this.renderEnding();

  }

  renderPostIntroText(time:number) {
    return new Promise<boolean>(res => {
      setTimeout(async () => {
        this.stop();
        await this.awaitTextRender(["1 Correct Answer = 1 POINT"], 120, 4000);
        await this.awaitTextRender(["LEVEL 1"], 120, 2000);
        res(true);
      }, time);
    })
  }

  startChallangeAudioIndex = 1;
  endChallangeAudioIndex = 7;

  timerInterval: any;

  async recordAllFrames(currentIndex: number, totalIndex: number,doneCallback:()=>void) {
    this.optons = this.generateOptions();
    this.startChallangeAudioIndex = this.randomIntFromInterval(1, 5);
    this.endChallangeAudioIndex = this.randomIntFromInterval(6, 10);

    this.mediaRecorder.pause();
    this.clearCanvas();

    if (currentIndex < totalIndex) {
      await this.renderImage(currentIndex);
      this.updateFrameData();
      this.mediaRecorder.resume();
      this.startAudioByIndex(this.startChallangeAudioIndex);

      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }


      let time = 10;
      this.timerInterval = setInterval(() => {
        if (time < 0) { return }
        this.drawTimer(time);
        this.updateFrameData();
        time = time - 1;
      }, 1000);

      this.startAudioByIndex(this.audioSrcMap.clockAudio.index);

      const showResultAfter = (this.videoTime * 1000);
      setTimeout(async () => {
        const showNextItemAfter = 4500;
        await this.renderResult(currentIndex, totalIndex, showNextItemAfter,doneCallback);
        this.updateFrameData();
        //stop clock
        this.stopAudioByIndex(this.audioSrcMap.clockAudio.index);
        this.startAudioByIndex(this.endChallangeAudioIndex)
      }, showResultAfter);

    } else doneCallback();

  }
  
  optons: any = [];
  async renderImage(index: number) {

    const ctx = this.getContext();
    // render bg
    this.drawImage(this.bgImage);
    await this.addRapidText(0,[this.textOnTop],false, this.getCanvas().width /2 , 50,{color:'yellow'})
    await this.addRapidText(0,[this.textOnBottom],false, this.getCanvas().width / 2, this.getCanvas().height - this.fontSize+15)
    
    this.optons.forEach((option: any) => {
      if (option.rotateImage) {
        ctx?.drawImage(this.oddImagesArray[index].img, option.x, option.y, option.sw, option.sh);
      } else {
        ctx?.drawImage(this.imagesArray[index].img, option.x, option.y, option.sw, option.sh);
      }
    });

  }

  renderResult(currentIndex: number, totalIndex: number, resultTime: number,doneCallback:()=>void) {
    this.highLightOddImage();
    setTimeout(() => {
      this.recordAllFrames(currentIndex + 1, totalIndex,doneCallback);
    }, resultTime);
  }

  async renderEnding() {

    this.mediaRecorder.pause();
    const ctx = this.getContext();
    // render bg
    if (!ctx) { return }

    this.mediaRecorder.resume();
    this.startAudioByIndex(this.audioSrcMap.endAudio.index);

    await this.awaitTextRender(["It's time for the results. Are you prepared?"], 40, 3000);

    await this.awaitTextRender([
      "0 - 15",
      "focus on paying more attention to smaller details and practice your observation skills.",
      "Over time, your results will significantly improve"], 40, 10000);
    await this.awaitTextRender([
      "16 - 30",
      "You have keen eyes. Keep up the good work!"
    ], 80, 6000);

    await this.awaitTextRender([
      "30 - 50",
      "you possess the sharpest eyes. You can even spot the smallest details."], 60, 6000);

    await this.awaitTextRender(["like and subscribe"], 100, 7000);
    this.stopRecording();
    this.frameData = null;

  }

  awaitTextRender(text: string[], fontSize: number, delay: number) {
    return new Promise(res => {
      this.insertIntroText(text, fontSize);
      this.updateFrameData();
      setTimeout(() => res(true), delay)
    });
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.audioSrcs.forEach(v => v.pause());
  }


  generateOptions(
    gridWidth = this.canvasWidth,
    gridHeight = this.canvasHeight,
    imageBloackSize = this.imageBloackSize
  ) {

    const superOptions = super.generateOptionsHelper(
      gridWidth,
      gridHeight,
      imageBloackSize, this.padding);

    return superOptions;


  }

  async createIntro(mediaRecorder: MediaRecorder) {
    return new Promise<HTMLVideoElement>(async resolve => {
      
      const ctx = this.getContext();
      // render bg
      if (!ctx) { return }
      this.renderIntro(this.introPath,(playerElement)=>resolve(playerElement));

    })
  }


  introVideo: HTMLVideoElement | null = null;
  introVideoCanvas: HTMLCanvasElement | null = null;
  videoWidth!: number;
  videoHeight!: number;

  createVideoElement(videoSrc: string, readyCallback: (introVideo:HTMLVideoElement) => void) {
    const introVideoCanvas = document.createElement('canvas');
    const ctx = introVideoCanvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) { return };
    ctx.canvas.width = this.canvasWidth;
    // ctx.canvas.width = 1920;
    // ctx.canvas.height = 1080;
    ctx.canvas.height = this.canvasHeight;

    const introVideo = document.createElement('video');
    introVideo.src = videoSrc;

    introVideo.onloadedmetadata = (e) => {
      this.videoWidth = 1920 // this.canvasWidth;
      this.videoHeight = 1080 // this.canvasHeight;
      readyCallback(introVideo);
    };

    introVideo.onplay = (e) => {
      this.timerCallback()
    };

    this.introVideo = introVideo;
    this.introVideoCanvas = introVideoCanvas;
    return this.introVideo;
  }

  async renderIntro(videoSrc:string,readyCallback:(introVideo:HTMLVideoElement)=>void) {
    return this.createVideoElement(videoSrc,readyCallback) as HTMLVideoElement;
  }

  play() {
    this.drawImage(this.bgImage);
    return this.introVideo?.play();
  }

  stop() {
    this.introVideo?.pause();
    this.introVideo = null
    this.introVideoCanvas = null;
  }

  async timerCallback() {
    if (this.introVideo?.paused || this.introVideo?.ended) {
      return;
    }
    const { frame, imgData } = await this.computeFrame();


    const ctx = this.getContext();
    if (!frame || !ctx) { return };
    this.frameData = frame;

    ctx.putImageData(frame, ctx.canvas.width / 2, ctx.canvas.height / 2);
    setTimeout(() => {
      this.timerCallback();
    }, 0);

  }

  async computeFrame() {
    const ctx = this.introVideoCanvas?.getContext('2d', { willReadFrequently: true });

    ctx?.drawImage(this.introVideo as any, 0, 0, this.canvasWidth, this.canvasHeight);

    // let frame = ctx?.getImageData(0, 0, this.videoWidth, this.videoHeight);
    let frame = ctx?.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    let imgData = ctx?.canvas.toDataURL() // (0, 0, this.videoWidth, this.videoHeight);
    // if (!frame) { return };

    // let l = frame.data.length / 4;

    // const data = frame.data;

    // for (let i = 0; i < l; i++) {
    //   let r = frame.data[i * 4 + 0];
    //   let g = frame.data[i * 4 + 1];
    //   let b = frame.data[i * 4 + 2];
    //   if (g > 100 && r > 100 && b < 43)
    //     frame.data[i * 4 + 3] = 0;
    // }

    return { frame, imgData };

  }


  insertIntroText(text: string[], fontSize = 150) {
    this.clearCanvas();
    this.drawImage(this.bgImage);

    text.forEach((text, index) => {
      this.addText(text, fontSize, 'yellow', this.canvasWidth / 2, (this.canvasHeight / 2) + (index * (fontSize + 15)));
    })

  }

  
}
