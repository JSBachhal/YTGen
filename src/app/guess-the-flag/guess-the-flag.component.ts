import { AfterViewInit, Component } from '@angular/core';
import { AudioSrcMapModel, AudioModel } from './model/audiomap.model';
import { Animation } from '../animation';

@Component({
  selector: 'app-guess-the-flag',
  templateUrl: './guess-the-flag.component.html',
  styleUrls: ['./guess-the-flag.component.scss']
})
export class GuessTheFlagComponent extends Animation implements AfterViewInit {

  downloadEnable = true //true;
  canvasWidth = 1920 //1920 //3840;
  canvasHeight = 1080 // 1080 // 2160;
  imageBloackSize = 110;
  padding = 15;
  textBloackSize = 50;
  bgColor='#222';
  
  videoTime = 3;

  fontSize = 90;
  override color: string='black';
  override TextBgcolor: string='yellow';

  textOnTop = 'GUESS THE NAME ?';
  textOnBottom = 'SUBSCRIBE And LIKE ';

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

  bgImage: any;
  pokemonBallImg: any;
  async ngAfterViewInit() {

    
    this.clearCanvas(this.bgColor);

    this.pokemonBallImg = await this.loadImage('assets/guessTheName/pokemonBall.png', this.pokemonBallImg);
    // this.bgImage = await this.loadImage('assets/BGGreen.jpg', this.bgImage);

    this.bgImage = await this.loadImage('assets/guessTheName/BG34k.png', this.bgImage);
    // this.bgImage = await this.loadImage('assets/BG4k1.jpg', this.bgImage);
    // this.bgImage = await this.loadImage('assets/BG4k4.webp', this.bgImage);
    this.createVirtualCanvas();
    this.mediaRecorderOptions.audioBitsPerSecond = 8000000;
    this.mediaRecorderOptions.videoBitsPerSecond = 8000000;
    
    this.updateFrameData();
  }


  // Here, I created a function to draw image.
  async onFileSelected(e: any) {
    // this.optons = this.generateOptions();
    const files = e.target.files as FileList;
    this.clearCanvas(this.bgColor);
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const reader = new FileReader();

      const img = new Image();
      
      img.onload = async () => {
        let name = file.name.split('.')[0].split('-')[1];
        this.imagesArray[index] = { img: img, imgWidth: img.width, imgHeigh: img.height, answer:name };
        await this.renderFlag(index);
        this.clearCanvas(this.bgColor);
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

      var blob = new Blob(this.chunks, { type: 'video/mp4' });
      // var blob = new Blob(this.chunks, { type: 'video/webm' });
      this.chunks = [];


      var url = URL.createObjectURL(blob);
      var a = document.createElement('a') as any;
      document.body.appendChild(a);
      (a.style as any) = 'display: none';
      a.href = url;
      a.download = 'GUess the Pokemon name.mp4';
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
    // audioSrc.forEach(v => v.play());



    this.clearCanvas(this.bgColor);
    this.mediaRecorder.start();
    this.startTime = Date.now();

    this.startAudioByIndex(this.audioSrcMap.clockAudio.index);
   
    for (let index = 0; index < this.imagesArray.length; index++) {
      await this.recordAllFrames(index);
    }

    this.stopRecording();
    this.stopAudioByIndex(this.audioSrcMap.clockAudio.index);

  }

  startChallangeAudioIndex = 1;
  endChallangeAudioIndex = 7;

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

  tranitionPath='assets/transitions/transition2.mp4'
  async recordAllFrames(currentIndex: number) {

    this.mediaRecorder.pause();
    this.clearCanvas(this.bgColor);
    await this.renderFlag(currentIndex);
    this.updateFrameData();
    this.mediaRecorder.resume();
    await this.startTimer(Math.floor(this.videoTime));

    await this.renderResult(currentIndex);
    this.updateFrameData();
    await this.addDelay(500);
    // this.mediaRecorder.pause();
    this.activeImageFrameData = this.getContext().getImageData(0,0,this.canvasWidth,this.canvasHeight);
    await this.addVideo(this.tranitionPath);
    // this.mediaRecorder.resume();
    await this.play(this.bgImage);
    this.mediaRecorder.pause();
    this.activeImageFrameData = null;

  }

  optons: any = [];
  async renderFlag(index: number) {
    this.drawImage(this.bgImage, 0, 0);
    this.drawImage(this.pokemonBallImg,
       this.canvasWidth-this.pokemonBallImg.width/1.2 ,
       this.canvasHeight-this.pokemonBallImg.height/1.2
       );

    const ctx = this.getContext();
    
    const xOffSet = 0;
    const yOffSet = 0;

    // const xOffSet = 40;
    // const yOffSet = 100;
    const flag = this.imagesArray[index];
    const img = await this.getTransparentImage(
      {
        img: flag.img,
        x: (this.canvasWidth / 2 - flag.imgWidth / 2) - xOffSet,
        y: (this.canvasHeight / 2 - flag.imgHeigh / 2) - yOffSet,
        dw: flag.imgWidth,
        dh: flag.imgHeigh
      });

  
    ctx?.drawImage(
      img,
      (this.canvasWidth / 2 - flag.imgWidth/2) - xOffSet,
      (this.canvasHeight / 2 - flag.imgHeigh/2) - yOffSet,
      flag.imgWidth,
      flag.imgHeigh);
      await this.addRapidText(0, [...'SUBSCRIBE'.split('')], false, 40, this.canvasHeight/2 + 250,{fontSize:80})
      await this.addRapidText(0, [...'LIKE'.split(''), '👍'], false, this.getCanvas().width - 150, this.canvasHeight/2 )
      await this.addRapidText(0, ['Write in Comments'], false, this.getCanvas().width /2,this.getCanvas().height +30,{fontSize:80,padding:0})
      await this.addRapidText(0, [`${index +1 }/${this.imagesArray.length}`], 
      false,
       this.getCanvas().width -100,
       150, {fontSize:80,padding:0,color:'#F34573'})
      this.addText(this.textOnTop, this.fontSize - 20, this.color);

  }



  async renderResult(currentIndex: number) {

    const xpos = this.canvasWidth / 2 ;
    const ypos = this.canvasHeight - 200 ;

    await this.addRapidText(0, [this.imagesArray[currentIndex].answer?.toUpperCase() || ''],
      false,
      xpos,
      ypos, { fontSize: 140 ,drawOnBackround:true});
    this.updateFrameData();
    
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




  insertIntroText(text: string[], fontSize = 150) {
    this.clearCanvas(this.bgColor);
    this.drawImage(this.bgImage);

    text.forEach((text, index) => {
      this.addText(text, fontSize, 'yellow', this.canvasWidth / 2, (this.canvasHeight / 2) + (index * (fontSize + 15)));
    })

  }


}
