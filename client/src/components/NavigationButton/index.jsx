import React from "react";
import "./style.css";


function NavigationBtn(props) {
    return (
      <button onClick={props.onClick} className={`navigation-btn ${props["data-value"]}`} {...props}>
      </button>
    );
  }
  
  export default NavigationBtn;
  