export function makeOutlineTransparent(frameData: any, imageWidth: number, imageHeight: number,imageLength:number) {
    // let frameData = frame.data;
    outer:for (let l = 0; l < imageHeight ; l ++) {
        Inner: for (let w = 0; w < imageWidth; w++) {
            var pixelLocation = (l + w * imageWidth)*4;
           
            // console.log('pixelLocation ',pixelLocation)
            const nextPixelLocation = pixelLocation + 4;
            // console.log('nextPixelLocation ',nextPixelLocation)
            // const element = frameData[w * l];

            const arr = [];
            let r = frameData[pixelLocation + 0];
            let g = frameData[pixelLocation + 1];
            let b = frameData[pixelLocation + 2];
            arr.push(r);
            arr.push(g);
            arr.push(b);
            let nextr = frameData[nextPixelLocation + 0];
            let nextg = frameData[nextPixelLocation + 1];
            let nextb = frameData[nextPixelLocation + 2];
            arr.push(nextr);
            arr.push(nextg);
            arr.push(nextb);
            let makeTransparent = true;
            trans :for (let index = 0; index < arr.length; index++) {
                const value = arr[index];
                if (makeTransparent && value < 220) {
                    makeTransparent = false;
                }
            }
            // console.log('makeTransparent ',makeTransparent)
            if (makeTransparent) {
                frameData[pixelLocation + 3] = 0;
            } else{
                break Inner;
            }

        }


    }

    // return frameData;
}
