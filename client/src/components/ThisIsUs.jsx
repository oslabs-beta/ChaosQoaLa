import React, { Fragment } from "react";

function ThisIsUs() {
  return (
    <div id="thisisus">
      <div id="meettheteam">
        <h1>Meet The Team</h1>
      </div>
      <div id="bios">
        <div className="whoami">
          <h6>Jacob Ory</h6>
          <hr />
          <div className="outsidelinks">
            <a href="https://github.com/jakeory" target='blank'>
              <img src="https://cqlimage.s3-us-west-1.amazonaws.com/GitHub-Mark-Light-32px.png" />
            </a>
            <a href="https://www.linkedin.com/in/jacobory/" target='blank'>
              <img src="https://cqlimage.s3-us-west-1.amazonaws.com/linkedin-3-32.png" />
            </a>
          </div>
        </div>
        <div className="whoami">
          <h6>Nicolas Venegas Parker</h6>
          <hr />
          <div className="outsidelinks">
            <a href="https://github.com/nicvhub" target='blank'>
              <img src="https://cqlimage.s3-us-west-1.amazonaws.com/GitHub-Mark-Light-32px.png" />
            </a>
            <a href="https://www.linkedin.com/in/nicolas-venegas-parker/" target='blank'>
              <img src="https://cqlimage.s3-us-west-1.amazonaws.com/linkedin-3-32.png" />
            </a>
          </div>
        </div>
        <div className="whoami">
          <h6>Samantha Wessel</h6>
          <hr />
          <div className="outsidelinks">
            <a href="https://github.com/sw8wm2013" target='blank'>
              <img src="https://cqlimage.s3-us-west-1.amazonaws.com/GitHub-Mark-Light-32px.png" />
            </a>
            <a href="https://www.linkedin.com/in/samantha-wessel/" target='blank'>
              <img src="https://cqlimage.s3-us-west-1.amazonaws.com/linkedin-3-32.png" />
            </a>
          </div>
        </div>
        <div className="whoami">
          <h6>Simon Maharai</h6>
          <hr />
          <div className="outsidelinks">
            <a href="https://github.com/Simon-IM" target='blank'>
              <img src="https://cqlimage.s3-us-west-1.amazonaws.com/GitHub-Mark-Light-32px.png" />
            </a>
            <a href="https://www.linkedin.com/in/simon-maharai-9553b9193/" target='blank'>
              <img src="https://cqlimage.s3-us-west-1.amazonaws.com/linkedin-3-32.png" />
            </a>
          </div>
        </div>
      </div>
      <div id ='opensource'>
        <p>Want to contribute?</p>
        <h6>ChaosQoala is an open source project</h6>
      </div>
      <div id="finalgitlink">
        <p>Github</p>
      </div>
      <h6>&copy; 2019 ChaosQoala/OSLabs. All rights reserved</h6>
    </div>
  );
}

export default ThisIsUs;
