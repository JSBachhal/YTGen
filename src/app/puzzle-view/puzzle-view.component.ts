import { AfterViewInit, Component } from '@angular/core';
import { AudioSrcMapModel, AudioModel } from './model/audiomap.model';
import { EditorHelper } from '../editor';
import { puzzlesData } from './puzzles';

@Component({
  selector: 'app-puzzle-view',
  templateUrl: './puzzle-view.component.html',
  styleUrls: ['./puzzle-view.component.scss']
})
export class PuzzleViewComponent extends EditorHelper implements AfterViewInit {
  audioSrcs!: any[];

  downloadEnable = true;
  EnableAudio = true;

  canvasWidth = 1920//3840;
  canvasHeight = 1080//2160;
  imageBloackSize = 140;
  textBloackSize = 70;

  videoTime = 4.5;

  fontSize = 40;
  puzzleFontSize = 90;
  textOnTop = 'CAN YOU FIND THE ODD ONE OUT?';
  textOnBottom = 'SUBSCRIBE and LIKE ';
  audiopath1 = 'assets/guessTheName/guessTheNameAudio.mp3';
  endAudio = 'assets/guessTheName/endAudio.mp3';
  bgAudio = 'assets/guessTheName/bgAudio.mp3';

  introImagePath = 'assets/riddles/intro1.png';
  introImage: any;
  imgQuestionMarkPath = 'assets/riddles/img2.png';
  imgQuestionMark: any;

  audioSrcMap: AudioSrcMapModel = {
    introAudio: { name: 'introAudio', path: this.audiopath1, index: 0 },
    bgAudio: { name: 'bgAudio', path: this.bgAudio, index: 1 },
    endAudio: { name: 'endAudio', path: this.endAudio, index: 2 },

  };

  bgImage: any;
  constructor() { super() }

  async ngAfterViewInit() {
    this.mediaRecorderOptions.audioBitsPerSecond = 8000000;
    this.mediaRecorderOptions.videoBitsPerSecond = 8000000;

    this.bgImage = await this.loadImage('assets/guessTheName/BG34k.png', this.bgImage);
    this.introImage = await this.loadImage(this.introImagePath, this.introImage);
    this.imgQuestionMark = await this.loadImage(this.imgQuestionMarkPath, this.imgQuestionMark);
    this.clearCanvas();
    this.createVirtualCanvas();



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

      var blob = new Blob(this.chunks, { type: 'video/mp4' });
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
      a.download = 'Solve The Puzzle.mp4';
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
        this.drawTopTimer(time,timer);
        this.updateFrameData();
        time = time - 1;
      }, 1000);
    })
  }

  async renderIntro() {
    return new Promise<boolean>(async res => {
      this.mediaRecorder.pause();
      this.clearCanvas();
      this.drawImage(this.bgImage);
      this.drawImage(this.introImage, (this.canvasWidth / 2) + (this.introImage.width / 2), this.canvasHeight / 2 - this.introImage.height);
      
      this.drawImage(this.imgQuestionMark,
        (this.canvasWidth -300 ),
        this.canvasHeight/2  + 200 , {imgWidth:300,imgHeight:300});
      this.mediaRecorder.resume();
      await this.addRapidText(450, [
        `${this.puzzleTexts.length} VERY HARD`,
        'RIDDLES',
        '(PART 1)'
      ], false,
        (this.canvasWidth / 2) / 2, (this.canvasHeight / 2) + 150, { fontSize: 140, color: '#ba2649' });

      await this.addDelay(2500);
      res(true);
    })
  }
  



  puzzleTexts: { text: string, delay: number | string, answer: string }[] = puzzlesData;

  enddelay = 4000;
  async startRecording(time = this.videoTime * 1000) {
    const { mediaRecorder, audioSrc } = this.getMdeiaStreeam();

    this.clearCanvas();
    this.drawImage(this.bgImage);
    this.mediaRecorder.start();
    this.mediaRecorder.pause();
    
    await this.renderIntro();
    
    
    this.mediaRecorder.pause();

    for (let index = 0; index < this.puzzleTexts.length; index++) {
      this.clearCanvas();
      this.drawImage(this.bgImage);
      await this.renderPuzzleText(index)
    }

    this.mediaRecorder.pause();
    this.clearCanvas();
    this.drawImage(this.bgImage);
    await this.renderText("Write In the Comments How many did you get? Dont Forget To Like and Subscribe");
    this.mediaRecorder.resume();
    this.startAudioByIndex(2);
    this.startAudioByIndex(this.audioSrcMap.bgAudio.index);
    await this.addDelay(3000);

    this.mediaRecorder.stop();
    if (this.EnableAudio) {
      audioSrc.forEach(v => v.pause());
    }

  }

  async renderPuzzleText(index: number) {

    return new Promise(async res => {
      this.clearCanvas();
      this.drawImage(this.bgImage);
      await this.addRapidText(200, [`Number ${index + 1}`],false);
      this.updateFrameData();
      this.mediaRecorder.resume();
      await this.addDelay(1500);

      this.mediaRecorder.pause();
      this.clearCanvas();
      this.drawImage(this.bgImage);
      this.drawImage(this.imgQuestionMark,
        (this.canvasWidth -300 ),
        this.canvasHeight/2  + 200 , {imgWidth:300,imgHeight:300});

      const text = this.puzzleTexts[index];
      const delay = this.puzzleTexts[index].delay;
      let textProcessed = text.text.split(' ');
      let i = 0;
      let textData: string[] = [];

      const chunksize = 6;
      for (let index = 0; index < textProcessed.length; index++) {
        if (textData[i] === undefined) {
          textData[i] = '';
        }
        const element = textProcessed[index];
        textData[i] += `${element} `;
        if (index && index % chunksize === 0) {
          i += 1;
        }
      }

      await this.addRapidText(450, textData, false, this.canvasWidth / 2, this.canvasHeight / 2, { fontSize: this.puzzleFontSize, color: '#FFF' });
      this.updateFrameData();
      this.startAudioByIndex(this.audioSrcMap.bgAudio.index);
      this.mediaRecorder.resume();
      await this.startTimer(parseInt(delay.toString()));

      await this.renderText(text.answer, 5, 'Answer : ');
      await this.addDelay(2000);
      this.stopAudioByIndex(this.audioSrcMap.bgAudio.index);
      res(true);
    })
  }

  async renderText(result: string, chunkSize = 6, prependText?: string) {
    return new Promise<boolean>(async res => {
      this.mediaRecorder.pause();
      this.clearCanvas();
      this.drawImage(this.bgImage);

      const text = result;
      let textProcessed = text.split(' ');
      let i = 0;
      let textData: string[] = [];

      // const chunksize = 6;
      for (let index = 0; index < textProcessed.length; index++) {
        if (textData[i] === undefined) {
          textData[i] = i === 0 ? `${prependText ? prependText : ''}` : '';
        }
        const element = textProcessed[index];
        textData[i] += `${element} `;
        if (index && index % chunkSize === 0) {
          i += 1;
        }
      }

      await this.addRapidText(450, textData, false, this.canvasWidth / 2, this.canvasHeight / 2, { fontSize: this.puzzleFontSize, color: 'yellow' });
      this.updateFrameData();
      this.mediaRecorder.resume();
      this.addDelay(3000);
      res(true);
    })
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
