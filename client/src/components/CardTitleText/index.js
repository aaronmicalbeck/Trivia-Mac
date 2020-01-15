import React from "react";
// import CardContext from "../../utils/CardContext";

function CardTitleText() {
  return <div id="cardContext>">{({ title }) => <h2>{title}</h2>}</div>
}

export default CardTitleText;
