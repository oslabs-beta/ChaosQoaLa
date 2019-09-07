import React from 'react'
import { NavLink } from 'react-router-dom';

function Main() {
    return (
        <div id='main'>
            {/* <img id='mainpglogo'src='https://cqlimage.s3-us-west-1.amazonaws.com/ChaosQoaLa.png'></img> */}  
            <p><img id='mainqoala'src='https://cqlimage.s3-us-west-1.amazonaws.com/AngryKoala2.png'></img>Chaos<span>Q</span>oa<span>L</span>a</p>
            <p className='mainp'>Ready to ensue Chaos? Check us out on GitHub:</p>
            <a href='https://github.com/oslabs-beta/ChaosQoaLa'target='blank'><button id='gitbutton'>LINK TO GITHUB REPO WILL GO HERE!</button></a>
            <p className='mainp'>And download the ChaosQoaLa tool here:</p>
            <a href='https://www.npmjs.com/'target='blank'><button id='npmbutton'>NPM HERE</button></a>
            <p className='mainp'>Already ensuing chaos?</p>
            <NavLink id='mainupload' to='/Upload'>Upload Results</NavLink>
        </div>
    )
}

export default Main
