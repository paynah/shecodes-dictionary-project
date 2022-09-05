import React from "react";
import "./Synonyms.css";

export default function Synonyms(props) {
    if (props.synonyms.length > 0) {
        return (
            <div className="Synonyms">Synonyms:&nbsp;
                {props.synonyms.map((synonym, index) => {
                    if (index === props.synonyms.length - 1) {
                        return synonym;
                    } else {
                        return synonym + ", ";
                    }
                })}
            </div>
        );
    } else {
        return null;
    }
}