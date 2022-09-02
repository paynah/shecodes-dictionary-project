import React, { useState } from "react";
import "./Dictionary.css";
import owlImg from "./images/owl.png";
import axios from "axios";

export default function Dictionary() {
    const [searchQuery, setSearchQuery] = useState("");

    function onSearchSubmit(event) {
        event.preventDefault();

        alert(`Searching for ${searchQuery}`);
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