import React from "react";
import { NavLink } from "react-router-dom";

function Main() {
  return (
    <div id="main">
      {/* <img id='mainpglogo'src='https://cqlimage.s3-us-west-1.amazonaws.com/ChaosQoaLa.png'></img> */}
      <p id="title">
        <img
          id="mainqoala"
          src="https://cqlimage.s3-us-west-1.amazonaws.com/AngryKoala2.png"
        ></img>
        Chaos<span>Q</span>oa<span>L</span>a
      </p>
      <p id="missionstatement">Bringing Chaos Engineering to GraphQL</p>

      <p id="starp">
        Star Us on GitHub!{" "}
        <a href="https://github.com/oslabs-beta/ChaosQoaLa" target="blank">
          <button id="gitbutton">
            <img
              className="star"
              src="https://cqlimage.s3-us-west-1.amazonaws.com/star.png"
            />
            Star
          </button>
        </a>
      </p>
      <div id="downloadbutton">
        <a href="https://www.npmjs.com/package/chaosqoala" target="blank">
          <button id="npmbutton">Download</button>
        </a>
      </div>
    </div>
  );
}

export default Main;
