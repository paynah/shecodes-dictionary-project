import React from "react";
import "./PartOfSpeech.css";

export default function PartOfSpeech (props) {
    return (
        <div className="PartOfSpeech" key={props.index}>{props.partOfSpeech}
            {/* Loop through each definition for the current part of speech */}
            {props.definitions.map((definition, index) => {
                return (
                    // <Definition index={index} definition={definition} />
                    <div className="definition" key={index}> 
                        {index + 1}. {definition.definition} 
                    </div>
                );
            })}
        </div>
    );
}