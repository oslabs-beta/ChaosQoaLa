import React, { Fragment } from 'react'

function ThisIsUs() {
    return (
        <div id='thisisus'>
            <div id='meettheteam'>
                <h1>Meet The Team</h1>
            </div>
            <div id='bios'>
                <div className='whoami'>
                    <h6>Jacob Ory</h6>
                    <hr/>
                    <div className='outsidelinks'> 
                        <a href='https://github.com/jakeory'><img src='https://cqlimage.s3-us-west-1.amazonaws.com/GitHub-Mark-Light-32px.png'/></a>
                        <a href='https://www.linkedin.com/in/jacobory/'><img src='https://cqlimage.s3-us-west-1.amazonaws.com/linkedin-3-32.png'/></a>
                    </div>
                </div>
                <div className='whoami'>
                    <h6>Nicolas Venegas Parker</h6>
                    <hr/>
                    <div className='outsidelinks'>
                        <a href='https://github.com/nicvhub'><img src='https://cqlimage.s3-us-west-1.amazonaws.com/GitHub-Mark-Light-32px.png'/></a>
                        <a href='https://www.linkedin.com/in/nicolas-venegas-parker/'><img src='https://cqlimage.s3-us-west-1.amazonaws.com/linkedin-3-32.png'/></a>
                    </div>
                </div>
                <div className='whoami'>
                    <h6>Samantha Wessel</h6>
                    <hr/>
                    <div className='outsidelinks'>
                        <a href='https://github.com/sw8wm2013'><img src='https://cqlimage.s3-us-west-1.amazonaws.com/GitHub-Mark-Light-32px.png'/></a>
                        <a href='https://www.linkedin.com/in/samantha-wessel/'><img src='https://cqlimage.s3-us-west-1.amazonaws.com/linkedin-3-32.png'/></a>
                    </div>
                </div>
                <div className='whoami'>
                    <h6>Simon Maharai</h6>
                    <hr/>
                    <div className='outsidelinks'>
                      <a href='https://github.com/Simon-IM'><img src='https://cqlimage.s3-us-west-1.amazonaws.com/GitHub-Mark-Light-32px.png'/></a>
                    </div>
                </div>
            </div>
            <div id='finalgitlink'>
                <p>LINK TO GITHUB AGAIN</p>
            </div>
        </div>
    )
}

export default ThisIsUs
