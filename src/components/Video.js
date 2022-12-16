import React from 'react'
import "./Video.css"

function Video(props) {
  return (
        <div className="videoPage" >
            <div className="video-container">
            <div className="video-item">
                <div className="video-info">
                    <h1 className="video-title"> {props.video[0].name} </h1>
                    <iframe className="video-image" src={props.video[0].url} title="Youtube video" allo></iframe>
                    <p>{props.video[0].description}</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Video
