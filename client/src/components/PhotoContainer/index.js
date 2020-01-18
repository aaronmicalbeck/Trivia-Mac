import React from "react";
import "./photocontainer.css";

function PhotoContainer(props) {
  return (
    <div className={`container${props.fluid ? "-fluid" : ""}`} {...props}></div>
  );
}

export default PhotoContainer;
