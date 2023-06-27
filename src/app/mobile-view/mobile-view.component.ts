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
  imageBloackSize = 145;
  textBloackSize = 70;
  bgColor='#222';

  videoTime = 4.5;

  fontSize = 70;
  textOnTop = 'FIND THE ODD ONE OUT?';
  textOnBottom = 'SUBSCRIBE and LIKE ';
  audiopath1 = 'assets/audio1.mp3';
  audiopath2 = 'assets/audio2.wav';
  audiopath3 = 'assets/audio3.mp3';
  audiopath4 = 'assets/audio4.mp3';
  
  audioSrcs!: any[];

  constructor() { super() }
  // bgImage:any;
  async ngAfterViewInit() {
    this.imageBloackSize = parseInt(prompt('Please provide imageBloackSize', this.imageBloackSize.toString()) 
    || this.imageBloackSize.toString()) ;
    this.clearCanvas(this.bgColor);
    this.createVirtualCanvas();
    // this.bgImage = await this.loadImage('assets/BGBlue.webp', this.bgImage);
    // this.bgImage = await this.loadImage('assets/BGPink.jpg', this.bgImage);
    this.mediaRecorderOptions.audioBitsPerSecond = 8000000;
    this.mediaRecorderOptions.videoBitsPerSecond = 8000000;
    // this.drawImage(this.bgImage);
  }

  updateUI(){
    this.ngAfterViewInit();
  }

  rotatedImage!: any;


  // Here, I created a function to draw image.
  async onFileSelected(e: any) {
    this.clearCanvas(this.bgColor);

    this.optons = this.generateOptions({padding:10});
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
      this.clearCanvas(this.bgColor);
      await this.renderImage(0);
    };

    // this is to setup loading the image
    reader.onloadend = function () {
      img.src = reader.result as any;
    };
    // this is to read the file
    reader.readAsDataURL(file);
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
  vidSrc:any;
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
      // this.player.nativeElement.srcObject= blob;
      // this.vidSrc= blob;
      this.chunks = [];
      // return


      var url = URL.createObjectURL(blob);
      var a = document.createElement('a') as any;
      document.body.appendChild(a);
      (a.style as any) = 'display: none';
      a.href = url;
      a.download = 'Find the odd one out @braindevelopmentSkills .mp4';
      a.click();
      window.URL.revokeObjectURL(url);
    };
    mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    };

    return { mediaRecorder: mediaRecorder, audioSrc: audioSrcs };
  }

  async redraw(){
    this.optons= this.generateOptions({padding:10})
    this.clearCanvas(this.bgColor);

    await this.renderImage();
  }

  async startRecording(time = this.videoTime * 1000) {
    const { mediaRecorder, audioSrc } = this.getMdeiaStreeam();
    if(this.EnableAudio){
      audioSrc.forEach(v => v.play());
    }

    this.clearCanvas(this.bgColor);
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

  
  optons: any = [];
  async renderImage(index: number = 0) {
    // this.drawImage(this.bgImage);
    const ctx = this.getContext();
    await this.addRapidText(0,['L','I','K','E','👇'],false, this.getCanvas().width - 120, 450)
   

    this.optons.forEach((option: any) => {
      if (option.rotateImage) {
        ctx?.drawImage(this.oddImagesArray[index].img, option.x, option.y, option.sw, option.sh);
      } else {
        ctx?.drawImage(this.imagesArray[index].img, option.x, option.y, option.sw, option.sh);
      }
    });
    this.addText(this.textOnTop, this.fontSize, 'yellow');

  }



  generateOptions(options?:{
   gridWidth? :number,
    gridHeight? :number,
    imageBloackSize? :number,
    padding?:number
  }
  ) {

    const config ={
      gridWidth : this.canvasWidth,
      gridHeight : this.canvasHeight,
      imageBloackSize : this.imageBloackSize,
      padding : 15
      ,...options
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
