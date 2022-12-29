import React from "react";
import { useLocation } from "react-router-dom";
import "../../App.css"
import { useStore } from "../../store/StoreProvider";
import FormAddVideo from "../FormAddVideo";

export default function FormAdd(){
    const location = useLocation();
    let videoToEdit = location.state;
    const videos = useStore();
    let video = videos.filter((video)=> video.id === videoToEdit.id)
    return(
       <FormAddVideo videoToEdit={video[0]}></FormAddVideo>
    )
}