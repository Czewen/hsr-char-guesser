import { useState, useEffect } from "react";
import { ImageHolder } from "./components/ImageHolder";
import { Stack, PrimaryButton, StackItem, IStackTokens } from "@fluentui/react";
import { ImageDescriptor } from "./types";
import { Autocomplete, TextField } from "@mui/material";

const stackStyle: IStackTokens = { childrenGap: 5 };

export function GamePage() {
    var [imageDescriptor, setImageDescriptor] = useState<ImageDescriptor | null>(null)

    useEffect(() => {
        console.log(`image descriptor updated: ${imageDescriptor?.link}`)
    }, [imageDescriptor])

    let images : ImageDescriptor[] = [
        {
            link: "https://i.imgur.com/7sA4OV9.png",
            xStart: 679,
            xEnd: 1204,
            yStart: 400,
            yEnd: 1659
        },
        {
            link: "https://i.imgur.com/6CuRMQR.png",
            xStart: 797,
            xEnd: 1313,
            yStart: 287,
            yEnd: 1610
        }
    ]

    let options = [ "Aglaea", "Firefly", "Jingliu", "Cipher"]
    
    function onClick() {
        let index = Math.floor(Math.random() * 2);
        console.log(index);
        console.log(`setting, ${images[index].link}`)
        setImageDescriptor(images[index]);
        console.log("set image");
    }

    return (
        <Stack tokens={stackStyle}>
            <StackItem>
                { imageDescriptor != null && <ImageHolder imageDescriptor={imageDescriptor}/>}
            </StackItem>
            <StackItem>
                <PrimaryButton text="Start" onClick={onClick}></PrimaryButton>
            </StackItem>
            <StackItem>
                <Autocomplete
                    autoHighlight
                    disablePortal
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Character" />}
                />
            </StackItem>
        </Stack>
    )
}