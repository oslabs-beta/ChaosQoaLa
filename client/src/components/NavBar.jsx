import  React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';

// import DownloadButton from './DownloadButton.jsx';

function NavBar () {
    return (
        <div id='navbar'>
            <img id='navBarQL'src='https://cqlimage.s3-us-west-1.amazonaws.com/AngryKoala2.png'/>
            <NavLink id='navbarupload'to='/upload'>Upload Results </NavLink>
            <button id='navbardownload'>Download ChaosQoala</button>
    
        </div>
    )
}

export default NavBar;