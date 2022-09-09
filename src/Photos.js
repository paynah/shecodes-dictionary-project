import React from "react";
import "./Photos.css";

export default function Photos(props) {
  if (props.photos && props.photos.length > 0) {
    return (
      <div className="Photos">
        <section className="row">
          {props.photos.map((photo, index) => {
            return (
              <div className="photo col-3" key={index}>
                <a href={photo.sources.url} target="_blank" rel="noreferrer">
                  <img
                    src={photo.sources.landscape}
                    className="img-fluid"
                    alt={photo.alt}
                  />
                </a>
              </div>
            );
          })}
        </section>
      </div>
    );
  } else {
    return null;
  }
}
