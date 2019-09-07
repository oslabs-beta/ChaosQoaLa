import  React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

// import DownloadButton from './DownloadButton.jsx';

function NavBar () {
    return (
        <div>
            <img src='https://cqlimage.s3-us-west-1.amazonaws.com/AngryKoala2.png'/>
            <Link to='/upload'>Upload Results </Link>
            <button>Download ChaosQoala</button>
    
        </div>
    )
}

export default NavBar;