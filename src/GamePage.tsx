import { useState, useEffect, useRef } from "react";
import { ImageHolder } from "./components/ImageHolder";
import { Stack, IconButton, StackItem, IStackTokens, IIconProps, Text } from "@fluentui/react";
import { ImageDescriptor } from "./types";
import { Autocomplete, TextField, Paper, AutocompleteInputChangeReason } from "@mui/material";
import imageConfig from './images.json' with { type: 'json' };
import { shuffle }  from "lodash";
import './App.css'

const refreshIcon: IIconProps = { iconName: 'Refresh' };
const stackStyle: IStackTokens = { childrenGap: 5 };
const horizontalGapStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
};

export function GamePage() {

    const imageDescriptors : ImageDescriptor[] = imageConfig as ImageDescriptor[];
    const options = imageDescriptors.map(i => i.name);
    var [imageDescriptor, setImageDescriptor] = useState<ImageDescriptor | undefined>(undefined);
    let shuffledImages = useRef<ImageDescriptor[]>([]);
    let iteration = useRef<number>(0);
    let [userInput, setUserInput] = useState<string>("")
    let [streak, setStreak] = useState<number>(0);
    let [bestStreak, setBestStreak] = useState<number>(0);

    useEffect(() => {
        shuffleImages();
        setNextImage();
    }, []);

    useEffect(() => {
        if(streak > bestStreak) {
            setBestStreak(streak);
        }
    }, [streak]);

    function shuffleImages() {
        shuffledImages.current = shuffle(imageDescriptors);
    }
    
    function setNextImage() {
        var nextImage = shuffledImages.current.pop();
        if (nextImage) {
            nextImage.iteration = iteration.current;
            iteration.current += 1
            setImageDescriptor(Object.assign({}, nextImage));
        }

        if(shuffledImages.current.length == 0) {
            shuffleImages();
        }
    }

    function onUserInput(event: React.SyntheticEvent, value: string | null, reason: AutocompleteInputChangeReason) {
        switch(reason) {
            case "selectOption":
                if(value && isAnswerCorrect(value)) {
                    setStreak(streak + 1)
                } else {
                    setStreak(0)
                }
                setUserInput("");
                setNextImage();
                break;
                
            case "input":
                setUserInput(value ?? "");
                break;
    
            case "clear":
            case "reset":
            default:
                setUserInput("");
        }
    }

    function isAnswerCorrect(answer : string) {
        return answer.toLowerCase() === imageDescriptor?.name.toLowerCase();
    }

    function clipNewSection() {
        setImageDescriptor(Object.assign({}, imageDescriptor));
    }

    return (
        <Paper id= "gamebody" elevation={14}>
            <Stack tokens={stackStyle}>
                <StackItem>
                    { imageDescriptor != null && <ImageHolder imageDescriptor={imageDescriptor}/>}
                </StackItem>

                <StackItem>
                    <Stack horizontal tokens={horizontalGapStackTokens}>
                        <StackItem align="center">
                            <Autocomplete
                                autoHighlight
                                disablePortal
                                options={options}
                                sx={{ width: 270 }}
                                renderInput={(params) => <TextField {...params} label="Select a character" />}
                                onInputChange={onUserInput}
                                inputValue={userInput}
                                value={userInput}
                            />
                        </StackItem>
                        <StackItem align="center">
                            <IconButton iconProps={refreshIcon} onClick={clipNewSection}/>
                        </StackItem>
                    </Stack>
                </StackItem>

                <Stack horizontal tokens={horizontalGapStackTokens}>
                    <StackItem>
                        <Text block variant="mediumPlus">{`Streak: ${streak}`}</Text>
                    </StackItem>
                    <StackItem>
                        <Text block variant="mediumPlus">{`Best streak: ${bestStreak}`}</Text>
                    </StackItem>
                </Stack>
                    
            </Stack>
        </Paper>
        
    )
}