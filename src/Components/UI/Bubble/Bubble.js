import React from "react";
import "./Bubble.css";

function Bubble(props) {
  return (
    <div className="container">
      <div class="talk-bubble tri-right round left-in">
        <div class="talktext">
          <p>{props.data}</p>
        </div>
      </div>
    </div>
  );
}

export default Bubble;
