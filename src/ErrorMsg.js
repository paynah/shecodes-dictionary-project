import React from "react";
import "./ErrorMsg.css";

export default function ErrorMsg(props) {
    return (
        <div className="ErrorMsg">{props.message}</div>
    );
}