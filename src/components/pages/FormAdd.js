import React from "react";
import { useLocation } from "react-router-dom";
import "../../App.css"
import FormAddVideo from "../FormAddVideo";

export default function FormAdd(){
    const location = useLocation();
    let videoToEdit = location.state;
    return(
       <FormAddVideo videoToEdit={videoToEdit}></FormAddVideo>
    )
}