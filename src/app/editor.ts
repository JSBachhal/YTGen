import { ViewChild, ElementRef, Directive } from "@angular/core";

@Directive()
export class EditorHelper {
    @ViewChild('myCanvas', { static: true })
    myCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('hiddenCanvas', { static: true })
    hiddenCanvas!: ElementRef<HTMLCanvasElement>;
    constructor() {

    }

    gethiddenCanvas() {
        return this.hiddenCanvas.nativeElement;
    }
    getCanvas() {
        return this.myCanvas.nativeElement;
    }
    getContext() {
        return this.myCanvas.nativeElement.getContext('2d');
    }
    gethiddenCanvasContext() {
        return this.hiddenCanvas.nativeElement.getContext('2d');
    }

    drawCircle(ctx: any, x: number, y: number, radius: number, fill: string, stroke: string, strokeWidth: number) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
        if (fill) {
            ctx.fillStyle = fill
            ctx.fill()
        }
        if (stroke) {
            ctx.lineWidth = strokeWidth
            ctx.strokeStyle = stroke
            ctx.stroke()
        }
    }


    getClock(time:number) {
        if(!time === undefined){
            return;
        }

        const d = new Date();
        const str = this.Calculate(d.getHours(), d.getMinutes(), d.getSeconds());

        const context = this.getContext();
        if (context) {
            context.clearRect(0, 0, 100, 50);
            context.font = "30px calibri";
            context.fillStyle = "#222";
            context.fillRect(
                0, 0, 100, 50
              );
            context.fillStyle = "red";
            context.fillText(time.toString(), 50, 45);
        }

        console.log(time)
    }

    Calculate(hour: number, min: number, sec: number) {
        let curTime ='';
        // if (hour < 10)
        //     curTime = "0" + hour.toString();
        // else
        //     curTime = hour.toString();

        // if (min < 10)
        //     curTime += ":0" + min.toString();
        // else
        //     curTime += ":" + min.toString();

        if (sec < 10)
            curTime += "0" + sec.toString();
        else
            curTime += "" + sec.toString();
        return curTime;
    }
}