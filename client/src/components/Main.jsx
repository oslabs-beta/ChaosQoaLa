import React from 'react'
import { Link } from 'react-router-dom';

function Main() {
    return (
        <div>
            <img src='https://cqlimage.s3-us-west-1.amazonaws.com/ChaosQoaLa.png'></img>
            <h1>Using GraphQL? Not sure if you're system is redundant? Use ChaosQoala to test the redundancy of your system</h1>
            <img src='https://cqlimage.s3-us-west-1.amazonaws.com/AngryKoala2.png'></img>
            <p>Ready to ensue Chaos? Check us out on GitHub:</p>
            <button>LINK TO GITHUB REPO WILL GO HERE!</button>
            <p>And download the ChaosQoaLa tool here:</p>
            <button>NPM HERE</button>
            <p>Already ensuing chaos?</p>
            <Link to='/upload'>Upload Results</Link>
        </div>
    )
}

export default Main
