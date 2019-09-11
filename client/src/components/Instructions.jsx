import React from "react";
import { NavLink } from "react-router-dom";

function Instructions() {
  return (
    <div id="instructions">
      <div id="steponeparent">
        <div id="stepone">
          <h2>Planning Phase</h2>
          <p>Add steady state data feed and make baseline data available</p>
          <p> Install and configure the agent on your GraphQL servers</p>
          <p>Install the CLI on test users’ machines</p>
        </div>
        <div id="planningphase">
          <img src="https://cqlimage.s3-us-west-1.amazonaws.com/planning-phase.png" />
        </div>
      </div>
      <div id="steptwoparent">
        <div id="steptwo">
          <h2>Execution Phase</h2>
          <p>Run CLI to create a test setup</p>
          <p>Start & stop the experiment</p>
        </div>
        <div id="cliimage">
          <img src="https://cqlimage.s3-us-west-1.amazonaws.com/CLI+Questions.png" />
        </div>
      </div>
      <div id="stepthreeparent">
        <div id="stepthree">
          <h2>Upload & Analyze Results</h2>
          <p>Compare steady state data during "chaos" against baseline</p>
        </div>
        <div id="chartimage">
          <img
            src="https://cqlimage.s3-us-west-1.amazonaws.com/steadystate.jpeg"
            height="400"
          />
        </div>
      </div>
      <a href="https://www.npmjs.com/" target="blank">
        <button id="download">Download</button>
      </a>
      <button id="uploadlink">
        <NavLink to="/upload">Upload Results</NavLink>
      </button>
    </div>
  );
}

export default Instructions;
