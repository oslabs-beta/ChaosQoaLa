import React from 'react';
import { Link } from 'react-router-dom';

function Instructions() {
    return (
        <div>
            <p>Step One</p>
            <p>Step Two</p>
            <p>Step Three</p>
            <p>Step Four</p>
            <p>GIF</p>
            <p>GIF</p>
            <p>GIF</p>
            <button>Download</button>
            <Link to='/upload'>Upload Results</Link>
        </div>
    )
}

export default Instructions
