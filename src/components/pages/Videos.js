import React from "react";
import { useLocation } from "react-router-dom";
import "../../App.css"
import { useStore } from "../../store/StoreProvider";

export default function Videos(){
    const location = useLocation();
    let id = location.state;
    const videos = useStore();
    let video = videos.filter((video)=> video.id === id)
    console.log(video);

    return (
        <div className="videoPage">
            <div className="video-container">
                <div className="video-item">
                    <div className="video-info">
                        <h1> {video[0].name} </h1>
                        <a href={video[0].url} target="_blank">
                            <img src={video[0].picture} alt="Error"></img>
                        </a>
                        <p>{video[0].description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}