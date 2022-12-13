import React from "react";
import { useLocation } from "react-router-dom";
import "../../App.css"
import { useStore } from "../../store/StoreProvider";


export default function Videos(){
    const location = useLocation();
    let id = location.state;
    const videos = useStore();
    let video = videos.filter((video)=> video.id === id)

    return (
        <div className="videoPage">
            <div className="video-container">
                <div className="video-item">
                    <div className="video-info">
                        <h1 className="video-title"> {video[0].name} </h1>
                        <iframe className="video-image" src={video[0].url} title="Youtube video"></iframe>
                        <p>{video[0].description}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}