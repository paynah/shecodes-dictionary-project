import React, { useState } from "react";
import "./Dictionary.css";
import owlImg from "./images/owl.png";
import axios from "axios";
import SearchResult from "./SearchResult";
import ErrorMsg from "./ErrorMsg";
import Photos from "./Photos";

export default function Dictionary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [photos, setPhotos] = useState(null);
  const baseApiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  const pexelsBaseApiUrl = "https://api.pexels.com/v1/";
  const pexelsKey = "563492ad6f91700001000001ef99fedbd3824fa496dbeb86a518d0af";

  function onDictionarySearchResponse(response) {
    setErrorMsg(null);
    setSearchResults(response.data);
  }

  function onPexelsSearchResponse(response) {
    //console.log(response);
    const photosData = response.data.photos;
    const photosArray = [];
    for (let x = 0; x < photosData.length; x++) {
      const photo = {};
      photo.alt = photosData[x].alt;
      photo.sources = {
        landscape: photosData[x].src.landscape,
        url: photosData[x].url,
      };

      photosArray.push(photo);
    }

    setPhotos(photosArray);
    console.log(photosArray);
    sendDictionaryRequest();
  }

  function sendDictionaryRequest() {
    const apiUrl = `${baseApiUrl}${searchQuery}`;
    axios
      .get(apiUrl)
      .then(onDictionarySearchResponse)
      .catch(handleDictionaryError);
  }

  function handleDictionaryError(response) {
    console.log(response);
    if (
      typeof response === "object" &&
      response.constructor.name === "AxiosError"
    ) {
      let error = response.response.data
        ? response.response.data.message +
          " " +
          response.response.data.resolution
        : response.message;
      setErrorMsg(error);
    } else {
      setErrorMsg("An error has occurred. Please try again.");
      console.log(response);
    }
  }

  function onSearchSubmit(event) {
    event.preventDefault();

    const pexelsApiUrl = `${pexelsBaseApiUrl}search?query=${searchQuery}&per_page=9`;
    const headers = { Authorization: `Bearer ${pexelsKey}` };
    axios
      .get(pexelsApiUrl, { headers })
      .then(onPexelsSearchResponse)
      .catch(handleDictionaryError);
  }

  function onSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  if (errorMsg === null) {
    return (
      <div className="Dictionary">
        <img src={owlImg} alt="owl" id="headerImg" />
        <form onSubmit={onSearchSubmit} id="searchForm">
          <input
            type="search"
            placeholder="Search for a word"
            onChange={onSearchQueryChange}
            className="form-control"
          />
        </form>
        <SearchResult searchResults={searchResults} />
        <Photos photos={photos} />
      </div>
    );
  } else {
    return (
      <div className="Dictionary">
        <img src={owlImg} alt="owl" id="headerImg" />
        <form onSubmit={onSearchSubmit} id="searchForm">
          <input
            type="search"
            placeholder="Search for a word"
            onChange={onSearchQueryChange}
            className="form-control"
          />
        </form>
        <ErrorMsg message={errorMsg} />
        <SearchResult searchResults={searchResults} />
        <Photos photos={photos} />
      </div>
    );
  }
}
