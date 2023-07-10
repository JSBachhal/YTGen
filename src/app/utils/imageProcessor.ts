export function makeOutlineTransparent(frame: ImageData) {
    const frameData = frame.data;
    const width = frame.width;
    const height = frame.height;
    const imageLength = frame.data.length;
    console.log(frame)
    outer:for (let l = 0; l < (imageLength/height)/4 ; l+=4) {
        // Inner: for (let w = 0; w < width/4; w+=4) {
            console.log('pixelLocation l',l)
            // console.log('pixelLocation w',w)
            var pixelLocation =  (l*4);
           
            console.log('pixelLocation ',pixelLocation)
            const nextPixelLocation = pixelLocation + 4;
            // console.log('nextPixelLocation ',nextPixelLocation)
            // const element = frameData[w * l];

            let arr = [];
            let r = frameData[pixelLocation + 0];
            let g = frameData[pixelLocation + 1];
            let b = frameData[pixelLocation + 2];
            arr.push(r);
            arr.push(g);
            arr.push(b);
            let makeTransparent = arr[0]>220 && arr[1]>220 && arr[2]>220;

            if (makeTransparent) {
               arr=[];

            //    console.log('nextPixelLocation ',nextPixelLocation)
                // for (let index = nextPixelLocation; index < nextPixelLocation * 4; index += 4) {

                //     let nextr = frameData[index + 0];
                //     let nextg = frameData[index + 1];
                //     let nextb = frameData[index + 2];
                //     arr.push(nextr);
                //     arr.push(nextg);
                //     arr.push(nextb);
                // }
                // trans: for (let index = 0; index < arr.length; index++) {
                //     const value = arr[index];
                //     if (makeTransparent && value < 30) {
                //         makeTransparent = false;
                //     }
                // }
                if (makeTransparent) {
                    frameData[pixelLocation + 3] = 0;
                }
            }

        // }


    }
console.log(frame)
    return frame;
}
