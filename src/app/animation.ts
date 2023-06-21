import { EditorHelper } from "./editor";

export abstract class Animation extends EditorHelper {

    constructor() {
        super()
    }
    presets = {};
    elements: any[] = [];

    presetso(x: number, y: any, s: number, dx: any, dy: any) {
        let r = 12 * s;
        let w = 5 * s;
        return {
            x: x,
            y: y,
            r: r,
            w: w,
            dx: dx,
            dy: dy,
            draw: (ctx: any, t: number) => {
                x += dx;
                y += dy;

                ctx.beginPath();
                ctx.arc(x + + Math.sin((50 + x + (t / 10)) / 100) * 3,
                    y + + Math.sin((45 + x + (t / 10)) / 100) * 4, r, 0, 2 * Math.PI, false);
                ctx.lineWidth = w;
                ctx.strokeStyle = '#fff';
                ctx.stroke();
            }
        }
    };

    presetsx = (x: number, y: number, s: number, dx: any, dy: any, dr: any, r: number) => {
        r = r || 0;
        let w = 5 * s;
        return {
            x: x,
            y: y,
            s: 20 * s,
            w: 5 * s,
            r: r,
            dx: dx,
            dy: dy,
            dr: dr,
            draw: (ctx: any, t: number) => {
                x += dx;
                y += dy;
                r += dr;


                var line = (x: number, y: number, tx: number, ty: number, c: string, o: number | undefined) => {
                    o = o || 0;
                    ctx.beginPath();
                    ctx.moveTo(-o + ((s / 2) * x), o + ((s / 2) * y));
                    ctx.lineTo(-o + ((s / 2) * tx), o + ((s / 2) * ty));
                    ctx.lineWidth = w;
                    ctx.strokeStyle = c;
                    ctx.stroke();
                };

                ctx.save();

                ctx.translate(x + Math.sin((x + (t / 10)) / 100) * 5, y + Math.sin((10 + x + (t / 10)) / 100) * 2);
                ctx.rotate(r * Math.PI / 180);

                line(-1, -1, 1, 1, '#fff', undefined);
                line(1, -1, -1, 1, '#fff', undefined);

                ctx.restore();
            }
        }
    };

    createElements() {
        this.elements = [];
        for (let x = 0; x < this.widthOfset; x++) {
            for (let y = 0; y < this.getCanvas().height; y++) {
                if (Math.round(Math.random() * 8000) == 1) {
                    let s = ((Math.random() * 5) + 1) / 10;
                    if (Math.round(Math.random()) == 1)
                        this.elements.push(this.presetso(x, y, s, 0, 0));
                    else
                        this.elements.push(this.presetsx(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
                }
            }
        }
    }

    drawBGAnimation() {
        let time = new Date().getTime();
        for (var e in this.elements)
            this.elements[e].draw(this.getContext(), time);
    }
}