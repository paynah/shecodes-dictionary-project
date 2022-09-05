import React, { useState } from "react";
import "./Phonetics.css";

export default function Phonetics (props) {
    const [audioInfo, setAudioInfo] = useState(null);

    function onPlayPhoneticsAudioClick(event) {
        event.preventDefault();
        
        let updatedAudioInfo; 

        if (!audioInfo || audioInfo.url !== props.url) {
            updatedAudioInfo = updateAudioInfo();
        } else {
            updatedAudioInfo = audioInfo;
        }

        updatedAudioInfo.audio.play();
    }

    function updateAudioInfo() {
        // audioInfo.url 
        // audioInfo.audio
        // audioInfo.context
        const newAudioInfo = {};
        newAudioInfo.url = props.url;

        const audio = new Audio(props.url);
        audio.crossOrigin = "anonymous";
        newAudioInfo.audio = audio;

        // If we already have a context, reuse it
        const context = audioInfo ? audioInfo.context : new AudioContext();
        newAudioInfo.context = context;
        
        const source = context.createMediaElementSource(audio);
        source.connect(context.destination);

        setAudioInfo(newAudioInfo);

        return newAudioInfo;
    }

    if (props.url === "") {
        return (
            <span className="Phonetics">
                {props.phonetics} 
            </span>
        )
    } else {
        return (
            <span className="Phonetics">
                {props.phonetics} 
                <button id="audioBtn" type="button" className="btn btn-default shadow-none" onClick={onPlayPhoneticsAudioClick}>
                    <i className="fa-solid fa-volume-high"></i>
                </button>
            </span>
        )
    }
    
}