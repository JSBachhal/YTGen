import { AfterViewInit, Component, numberAttribute } from '@angular/core';
import { EditorHelper } from '../editor';
import { AudioModel, AudioSrcMapModel } from '../desktop-view/model/audiomap.model';

@Component({
  selector: 'app-desktop2',
  templateUrl: './desktop2.component.html',
  styleUrls: ['./desktop2.component.scss']
})
export class Desktop2Component extends EditorHelper implements AfterViewInit {

  downloadEnable = true;
  EnableAudio = true;

  canvasWidth = 1920;
  canvasHeight = 1080;
  imageBloackSize = 150;
  textBloackSize = 70;
  bgColor = 'green'//'#84e4f7';
  override TextBgcolor: string = 'Yellow';


  videoTime = 5;


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
  // bgImage:any;
  async ngAfterViewInit() {
    this.imageBloackSize = parseInt(prompt('Please provide imageBloackSize', this.imageBloackSize.toString())
      || this.imageBloackSize.toString());
    this.clearCanvas(this.bgColor);
    this.createVirtualCanvas();
    // this.bgImage = await this.loadImage('assets/BGBlue.webp', this.bgImage);
    // this.bgImage = await this.loadImage('assets/BGPink.jpg', this.bgImage);
    this.mediaRecorderOptions.audioBitsPerSecond = 8000000;
    this.mediaRecorderOptions.videoBitsPerSecond = 8000000;
    // this.drawImage(this.bgImage);
  }

  updateUI() {
    this.ngAfterViewInit();
  }

  rotatedImage!: any;


  // Here, I created a function to draw image.
  async onFileSelected(e: any) {
    this.optons = this.generateOptions();
    const files = e.target.files as FileList;
    this.clearCanvas(this.bgColor);
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const reader = new FileReader();

      const img = new Image();
      img.onload = async () => {
        this.imagesArray[index] = { img: img, imgWidth: img.width, imgHeigh: img.height };
        this.oddImagesArray[index] = await this.getOddImage(index) as any;
        const oddIndex = await this.renderImage(index);
      await this.animateOddImage(oddIndex , index);
      };

      reader.onloadend = () => {
        img.src = reader.result as any;
      };
      reader.readAsDataURL(file);

    }
  }

  async onOddFileSelected(e: any) {
    const reader = new FileReader();
    const file = e.target.files[0];

    const img = new Image();
    img.onload = async () => {
      this.oddImagesArray[0] = { img, imgWidth: img.width, imgHeigh: img.height };
      // this.getOddImage(0);
      this.clearCanvas(this.bgColor);
      const oddIndex = await this.renderImage(0);
      await this.animateOddImage(oddIndex , 0);
    };

    // this is to setup loading the image
    reader.onloadend = function () {
      img.src = reader.result as any;
    };
    // this is to read the file
    reader.readAsDataURL(file);
  }

  async changeOddFileSelected(e:any,index:number){
    const reader = new FileReader();
    const file = e.target.files[0];

    const img = new Image();
    img.onload = async () => {
      this.oddImagesArray[index] = { img, imgWidth: img.width, imgHeigh: img.height };
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
  audioSrcs!: any[];
  getMdeiaStreeam() {
    const VirtualVideoStream = this.getVirtualCanvasContext().canvas.captureStream();

    const { audioTracks, audioSrcs } = this.addAudioTracks(
      Object.values(this.audioSrcMap)
    )


    this.audioSrcs = audioSrcs;

    const outputStream = new MediaStream();
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
      const fixedBlob = await webmFixDuration(blob, duration);
      this.chunks = [];
      
      var url = URL.createObjectURL(fixedBlob);
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

  async redraw() {
    this.optons = this.generateOptions({ padding: 10 })
    this.clearCanvas(this.bgColor);

    await this.renderImage();
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
        this.drawTimer(time, timer);
        this.updateFrameData();
        time = time - 1;
      }, 1000);
    })
  }
  startChallangeAudioIndex = 1;
  endChallangeAudioIndex = 7;
  async startRecording(time = this.videoTime * 1000) {
    const { mediaRecorder, audioSrc } = this.getMdeiaStreeam();
    // if (this.EnableAudio) {
    //   audioSrc.forEach(v => v.play());
    // }

    this.mediaRecorder.start();
    this.startTime = Date.now();

    for (let index = 0; index < this.imagesArray.length; index++) {
      this.mediaRecorder.pause();
      this.optons = this.generateOptions();
      this.startChallangeAudioIndex = this.randomIntFromInterval(1, 5);
      this.endChallangeAudioIndex = this.randomIntFromInterval(6, 10);

      this.mediaRecorder.pause();
      this.clearCanvas();
      this.clearCanvas(this.bgColor);

      const oddindex = await this.renderImage(index);
      this.updateFrameData();
      this.mediaRecorder.resume();
      // this.startAudioByIndex(this.startChallangeAudioIndex);
      await this.addDelay(1500);
      this.startAudioByIndex(this.audioSrcMap.clockAudio.index);
      await this.startTimer(Math.floor(this.videoTime));
      
      this.mediaRecorder.pause();
      this.stopAudioByIndex(this.audioSrcMap.clockAudio.index);
      await this.animateOddImage(oddindex, index);
      // this.startAudioByIndex(this.endChallangeAudioIndex);
      this.updateFrameData();
      this.addDelay(3000)
    }


    this.mediaRecorder.stop();
    if (this.EnableAudio) {
      audioSrc.forEach(v => v.pause());
    }

  }

  async animateOddImage(oddIndex: number, imgIndex: number, time: number = 50) {

    return new Promise<boolean>(async res => {

      const ctx = this.getContext();
      ctx.globalAlpha = .8;
      ctx.fillStyle = '#222';// this.bgColor;
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      ctx.globalAlpha = 1;
      ctx.fillStyle = this.bgColor;
      const option = this.optons[oddIndex] as any;
      let x = option.x;
      let y = option.y;
      let sw = option.sw;
      let sh = option.sh;
      this.mediaRecorder?.resume();
      const incrementStep=10;
      for (let index = 0; index <= time; index += incrementStep) {
        x = x - (index?index/2:index);
        y = y - (index?index/2:index);
        sw = sw + index;
        sh = sh + index;
        
      if(index === time){
        ctx.fillStyle = '#222';
        this.highLightOddImage(option.x-time - (incrementStep*2), option.y-time - (incrementStep*2), sw);
        ctx.fillStyle = this.bgColor;
      }
        ctx.drawImage(this.oddImagesArray[imgIndex].img, x, y, sw, sh);
        this.updateFrameData();
        await this.addDelay(100);
      };
      this.updateFrameData();
      await this.addDelay(2000);
     
      res(true);
    })
  }

  highLightOddImage(x: number, y: number, imageWidth: number,fill=this.bgColor) {
    this.drawCircle(
      x,
      y,
      imageWidth/2,
      fill,
      'red',
      8
    );
  
  }


  optons: any = [];
  async renderImage(index: number = 0) {

    return new Promise<number>(async res => {

      // this.drawImage(this.bgImage);
      const ctx = this.getContext();
      // await this.addRapidText(0,['L','I','K','E','👇'],false, this.getCanvas().width - 120, 450)

      let oddIndex = 0;

      this.optons.forEach((option: any, optionIndex: number) => {
        if (option.rotateImage) {
          oddIndex = optionIndex;
          ctx?.drawImage(this.oddImagesArray[index].img, option.x, option.y, option.sw, option.sh);
        } else {
          ctx?.drawImage(this.imagesArray[index].img, option.x, option.y, option.sw, option.sh);
        }
      });
      await this.addRapidText(0, [this.textOnTop], false, this.getCanvas().width / 2, 150,
        {
          color: 'black',
          strokeColor: "#FFF",
          drawOnBackround: true,
          backroundColor: '#f34573'
        })
      // this.addText(this.textOnTop, this.fontSize, this.color);

      res(oddIndex);
    })

  }



  generateOptions(options?: {
    gridWidth?: number,
    gridHeight?: number,
    imageBloackSize?: number,
    padding?: number
  }
  ) {

    const config = {
      gridWidth: this.canvasWidth,
      gridHeight: this.canvasHeight,
      imageBloackSize: this.imageBloackSize,
      padding: 15
      , ...options
    }
    console.log(config)

    const superOptions = super.generateOptionsHelper(
      config.gridWidth,
      config.gridHeight,
      config.imageBloackSize, config.padding);

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
