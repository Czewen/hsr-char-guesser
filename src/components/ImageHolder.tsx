import { useEffect, useRef } from "react";
import { Stack } from "@fluentui/react";
import { ImageDescriptor } from "../types";
import './ImageHolder.css'

export interface ImageHolderProps {
    imageDescriptor: ImageDescriptor
}

export function ImageHolder(props: ImageHolderProps) {
    const canvas = useRef<HTMLCanvasElement>(null)
    let img = useRef<HTMLImageElement | null>(null)
    let canvasHeight : number  = 200;
    let canvasWidth : number = 200;    
    function getRandomValueWithinRange(min : number, max : number) {
        return Math.random() * (max - min) + min;
    }

    useEffect(() =>{
        if(props.imageDescriptor) {
            img.current = new Image();
            img.current.crossOrigin = "anonymous";
            
            // image starts donwloading when src is assigned
            img.current.src = props.imageDescriptor.link;
            img.current.onload = function() {
                loadImage(props.imageDescriptor)
            }
        }
    }, [props.imageDescriptor]);

    function loadImage(imageDescriptor: ImageDescriptor) {
        var x = getRandomValueWithinRange(imageDescriptor.xStart, imageDescriptor.xEnd)
        var y = getRandomValueWithinRange(imageDescriptor.yStart, imageDescriptor.yEnd)
        var clipArea = { x: x - canvasWidth/2, y: y - canvasHeight/2 };
        if (canvas.current != null) {
            var canvasElem : HTMLCanvasElement = canvas.current;
            var canvasContext = canvasElem.getContext("2d");
            canvasContext?.reset();
            canvasContext?.scale(1.5,1.5);
            clipImage(canvasContext, img.current, clipArea.x, clipArea.y, 150, 150);            
        }
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