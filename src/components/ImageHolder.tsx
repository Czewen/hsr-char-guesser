import { useEffect, useRef } from "react";
import { endianness } from "../helper/endianess";
import { ImageDescriptor } from "../types";
import './ImageHolder.css'

export interface ImageHolderProps {
    imageDescriptor: ImageDescriptor
}

export function ImageHolder(props: ImageHolderProps) {
    const canvas = useRef<HTMLCanvasElement>(null)
    let img = useRef<HTMLImageElement | null>(null)
    let canvasHeight : number  = 150;
    let canvasWidth : number = 150;    
    function getRandomValueWithinRange(min : number, max : number) {
        return Math.random() * (max - min) + min;
    }

    useEffect(() =>{
        if(props.imageDescriptor) {
            img.current = new Image();
            img.current.crossOrigin = "anonymous";
            
            // image starts donwloading when src is assigned
            img.current.onload = function() {
                loadImage(props.imageDescriptor)
            }
            img.current.src = props.imageDescriptor.link;
        }
    }, [props.imageDescriptor]);

    function loadImage(imageDescriptor: ImageDescriptor) {
        var clipSpaceBlank = true;
        if (canvas.current != null) {

            var canvasElem : HTMLCanvasElement = canvas.current;
            var canvasContext = canvasElem.getContext("2d");

            if (canvasContext != null) {
                while(clipSpaceBlank) {
                    var x = getRandomValueWithinRange(imageDescriptor.xStart, imageDescriptor.xEnd)
                    var y = getRandomValueWithinRange(imageDescriptor.yStart, imageDescriptor.yEnd)
                    var clipArea = { x: x - canvasWidth/2, y: y - canvasHeight/2 };
                    canvasContext?.reset();
                    canvasContext?.scale(1,1);
                    clipImage(canvasContext, img.current, clipArea.x, clipArea.y, 150, 150);
                    clipSpaceBlank = isClipSpaceBlank(canvasContext, 0, 0)
                }
            }
        }
    }


    function isClipSpaceBlank(context : CanvasRenderingContext2D, x: number, y: number) {
        
        var whitePixelCount = 0
        var sampleWidth = canvasWidth;
        var sampleLength = canvasHeight;
        var colOffset = sampleWidth/2;
        var rowOffset = sampleLength/2;
        var data = context.getImageData(x, y, sampleWidth, sampleLength)
        var view = new DataView(data.data.buffer);

        // simple heuristic for checking if the selected area is mostly white

        for(var row = 0; row < 3; row++) {
            var rowStart = row * (rowOffset-1) * (sampleWidth * 4)
            for(var col = 0; col <3; col++) {
                var index = rowStart + (col * (colOffset-1) * 4);
                var rgba = view.getUint32(index, endianness() == 'LE');
                var white = 0x000000ff;
                var rgb = rgba | white;
                if (rgb == white) {
                    whitePixelCount += 1
                }
            }
        }
        return whitePixelCount > 4
    }

    function clipImage(ctx, image, clipX, clipY, imageWidth, imageLength){
            // draw the image to the canvas
            // clip from the [clipX,clipY] position of the source image
            // the clipped portion will be clipWidth x clipHeight
            ctx.drawImage(image, clipX, clipY, imageWidth, imageLength, 0, 0, imageWidth, imageLength);
        }

    return (
        <div id="canvas_container">
            <canvas id="canvas" width={canvasWidth} height={canvasHeight} ref={canvas}/>
        </div>
    )
}