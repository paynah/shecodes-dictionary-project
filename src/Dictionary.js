import React, { useState } from "react";
import "./Dictionary.css";
import owlImg from "./images/owl.png";
import axios from "axios";

export default function Dictionary() {
    const [searchQuery, setSearchQuery] = useState("");
    const baseApiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

    function onDictionarySearchResponse(response) {
        console.log(response.data);
    }

    function handleDictionaryError(response) {
        if (typeof response === "object" && response.constructor.name === "AxiosError") {
            let errorMsg = response.response.data.message + " " + response.response.data.resolution;
            alert(errorMsg);
        } else {
            alert("An error has occurred. Please try again.");
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

    return (
        <div className="Dictionary">
            <img src={owlImg} alt="owl" id="headerImg" />
            <form onSubmit={onSearchSubmit} id="searchForm">
                <input type="search" placeholder="Search for a word" onChange={onSearchQueryChange} className="form-control" />
            </form>
        </div>
    );
}