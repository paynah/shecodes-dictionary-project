import React, { useState } from "react";
import "./Dictionary.css";
import owlImg from "./images/owl.png";
import axios from "axios";
import SearchResult from "./SearchResult";
import ErrorMsg from "./ErrorMsg";

export default function Dictionary() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const baseApiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

    function onDictionarySearchResponse(response) {
        setErrorMsg(null);
        setSearchResults(response.data);
    }

    function handleDictionaryError(response) {
        console.log(response);
        if (typeof response === "object" && response.constructor.name === "AxiosError") {
            let error = response.response.data ? response.response.data.message + " " + response.response.data.resolution : response.message;
            setErrorMsg(error);
            //alert(errorMsg);
        } else {
            //alert("An error has occurred. Please try again.");
            setErrorMsg("An error has occurred. Please try again.");
            console.log(response);
        }
    }
    
    function onSearchSubmit(event) {
        event.preventDefault();

        const apiUrl = `${baseApiUrl}${searchQuery}`;
        axios.get(apiUrl).then(onDictionarySearchResponse).catch(handleDictionaryError);
    }

    function onSearchQueryChange(event) {
        setSearchQuery(event.target.value);
    }

    if (errorMsg === null) {
        return (
            <div className="Dictionary">
                <img src={owlImg} alt="owl" id="headerImg" />
                <form onSubmit={onSearchSubmit} id="searchForm">
                    <input type="search" placeholder="Search for a word" onChange={onSearchQueryChange} className="form-control" />
                </form>
                <SearchResult searchResults={searchResults} />
            </div>
        );
    } else {
        return (
            <div className="Dictionary">
                <img src={owlImg} alt="owl" id="headerImg" />
                <form onSubmit={onSearchSubmit} id="searchForm">
                    <input type="search" placeholder="Search for a word" onChange={onSearchQueryChange} className="form-control" />
                </form>
                <ErrorMsg message={errorMsg} />
                <SearchResult searchResults={searchResults} />
            </div>
        );
    }
    
}