import React from "react";
import "./PartOfSpeech.css";
import Synonyms from "./Synonyms";

export default function PartOfSpeech (props) {
    return (
        <div className="PartOfSpeech" key={props.index}>{props.partOfSpeech}
            {/* Loop through each definition for the current part of speech */}
            {props.definitions.map((definition, index) => {
                return (
                    <div className="definition" key={index}> 
                        {index + 1}. {definition.definition} 
                    </div>
                );
            })}
            <Synonyms synonyms={props.synonyms} />
        </div>
    );
}