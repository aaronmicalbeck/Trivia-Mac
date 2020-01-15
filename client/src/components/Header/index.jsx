import React from "react";
import "./header.css";

const HeaderComponent = props => {
  let Greeting;
  if (!props.user) {
    Greeting = <p>Hello guest</p>;
  } else if (props.user.firstName) {
    Greeting = (
      <p>
        Welcome back, <strong>{props.user.firstName}</strong>
      </p>
    );
  } else if (props.user.local.username) {
    Greeting = (
      <p>
        Welcome back, <strong>{props.user.local.username} </strong>
      </p>
    );
  }
  return (
    <div id="header" className="Header">
      {Greeting}
    </div>
  );
};

export const Header = React.memo(HeaderComponent);
