import React from "react";
import "./SearchResult.css";
import PartOfSpeech from "./PartOfSpeech";

export default function SearchResult(props) {
    if (props.searchResults) {
        //console.log(props.searchResults);
        const cleanedResults = cleanUpSearchResults(props.searchResults);
        console.log(cleanedResults);

        return (
            <div className="SearchResult">
                <span className="definitionHeader">{cleanedResults.word}</span>
                <span className="phonetics">({cleanedResults.phonetics})</span>
                <div className="partsOfSpeech">
                    {
                        // Loop through each part of speech
                        Object.entries(cleanedResults.partsOfSpeech).map(([partOfSpeech, meaning], index) => {
                            return (
                                <PartOfSpeech partOfSpeech={partOfSpeech} 
                                    key={index} 
                                    definitions={meaning.definitions}
                                    synonyms={meaning.synonyms} />
                            );
                        })
                    }
                </div>
            </div>
        );
    } else {
        return null;
    }
}

function cleanUpSearchResults(results) {
    const cleanedResults = {};
    const partsOfSpeech = {};    // Key: Part of speech; Value: definitions
    let phoneticsUrl = "";
    let phonetics = "";

    if (results.length === 0) {
        return cleanedResults;
    }

    // Map definitions to their part of speech
    for (let x = 0; x < results.length; x++) {
        let meanings = results[x].meanings;
        for (let y = 0; y < meanings.length; y++) {
            const partOfSpeech = meanings[y].partOfSpeech;
            const synonyms = meanings[y].synonyms;

            const result = 
                {
                    definitions: meanings[y].definitions,
                    synonyms: synonyms
                };
            partsOfSpeech[partOfSpeech] = result;
        }
    }

    const phoneticsArray = results[0].phonetics;
    for (let x = 0; x < phoneticsArray.length; x++) {
        if (phoneticsArray[x].audio !== "") {
            phoneticsUrl = phoneticsArray[x].audio;
        }
        if (phoneticsArray[x].text !== "") {
            phonetics = phoneticsArray[x].text;
        }
        if (phonetics !== "" && phoneticsUrl !== "") {
            break;
        }
    }

    cleanedResults.partsOfSpeech = partsOfSpeech;
    cleanedResults.word = results[0].word;
    cleanedResults.phonetics = phonetics;
    cleanedResults.phoneticsUrl = phoneticsUrl;

    return cleanedResults;
}