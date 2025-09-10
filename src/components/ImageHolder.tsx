import { useEffect, useRef, useState } from "react";
import { PrimaryButton, Stack } from "@fluentui/react";
import { ImageDescriptor } from "../types";

export interface ImageHolderProps {
    imageDescriptor: ImageDescriptor
}

export function ImageHolder(props: ImageHolderProps) {
    const canvas = useRef<HTMLCanvasElement>(null)
    let img = useRef<HTMLImageElement | null>(null)
    let canvasHeight : number  = 300;
    let canvasWidth : number = 300;
    console.log("In image holder")
    
    function getRandomValueWithinRange(min : number, max : number) {
        return Math.random() * (max - min) + min;
    }

    useEffect(() =>{
        console.log("hook ran")
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
        console.log("Load image")
        var x = getRandomValueWithinRange(imageDescriptor.xStart, imageDescriptor.xEnd)
        var y = getRandomValueWithinRange(imageDescriptor.yStart, imageDescriptor.yEnd)
        var clipArea = { x: x - canvasWidth/2, y: y - canvasHeight/2 };
        if (canvas.current != null) {
            // var image = new Image();
            // image.crossOrigin = "anonymous";

            // // image starts donwloading when src is assigned
            // image.src = imageDescriptor.link;
            // image.onload = function() {
            //     if(canvas.current == null) {
            //         return
            //     }
            //     var canvasElem : HTMLCanvasElement = canvas.current;

            //     var canvasContext = canvasElem.getContext("2d");
            //     canvasContext?.clearRect(0, 0, canvasWidth, canvasHeight)
            //     clipImage(canvasContext, image, clipArea.x, clipArea.y, 150, 150);
            //     setIsLoading(false)
            // }

            var canvasElem : HTMLCanvasElement = canvas.current;
            var canvasContext = canvasElem.getContext("2d");
            canvasContext?.reset();
            canvasContext?.scale(1.5,1.5);
            clipImage(canvasContext, img.current, clipArea.x, clipArea.y, 300, 300);            
        }
    }

    function onClick() {
        loadImage(props.imageDescriptor)
    }

    function clipImage(ctx, image, clipX, clipY, imageWidth, imageLength){
            
            // draw the image to the canvas
            // clip from the [clipX,clipY] position of the source image
            // the clipped portion will be clipWidth x clipHeight
            ctx.drawImage(image, clipX, clipY, imageWidth, imageLength, 0, 0, imageWidth, imageLength);
        }

    return (
        <Stack>
            <canvas id="canvas" width={canvasWidth} height={canvasHeight} ref={canvas}/>
        </Stack>
    )
}