import React from "react";
import { useLocation } from "react-router-dom";
import "../../App.css"
import { useStore } from "../../store/StoreProvider";
import Video from "../Video";


export default function VideoPage(){
    const location = useLocation();
    let id = location.state;
    const videos = useStore();
    let video = videos.filter((video)=> video.id === id)

    return (
      <Video video={video}></Video>
    )
}