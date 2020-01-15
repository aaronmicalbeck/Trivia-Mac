import React from "react";
import CardBtn from "../CardBtn";

// import CardContext from "../../utils/CardContext";
import CardTitle from "../CardTitle";
import "./style.css";

function Card() {
  return (
    // The most straightforward solution would be to add the Consumer to the Card component.
    // This way, all Card components can have the Card context passed directly as props

    <CardContainer>

      {({ image, handleBtnClick }) => (
        <div
          className="card"
          style={{
            backgroundImage: image ? `url(${image})` : "none"
          }}
        >
          {/* Here, we do not pass the title to demonstrate that it can also be consumed from the CardTitleText component */}

          <CardBtn
            style={{ opacity: image ? 1 : 0 }}
            onClick={handleBtnClick}
            data-value="back"
          />
          <CardBtn
            style={{ opacity: image ? 1 : 0 }}
            onClick={handleBtnClick}
            data-value="next"
          />
        </div>
      )}

    </CardContainer>

  );
}

export default Card;
