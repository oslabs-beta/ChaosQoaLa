import React from 'react';
import { NavLink } from 'react-router-dom';

function Instructions() {
    return (
        <div id='instructions'>
            <div id='stepone'>
                <h2>Planning Phase</h2>
                <p>Steady state data feed and make baseline data available</p>
                <p> Install and configure the agent on your GraphQL servers</p>
                <p>Install the CLI on test users’ machines</p>
            </div>
            <div id='steptwo'>
                <h2>Execution Phase</h2>
                <p>Run  CLI to create a test setup</p>
                <p>Start & stop the experiment</p>
            </div>
            <div id='stepthree'>
                <h2>Upload & Analyze Results</h2>
            </div>
         <button id='download'>Download</button>
         <button id='uploadlink'><NavLink to='/upload'>Upload Results</NavLink></button> 
        </div>
    )
}

export default Instructions
