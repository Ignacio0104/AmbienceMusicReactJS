import React, { useRef, useState } from 'react'
import { useDispatch } from '../store/StoreProvider';
import "./FormAddVideo.css"

import  {firebaseApp}  from "../credentials";
import {getAuth, signOut} from 'firebase/auth'
import {getFirestore,collection,addDoc,getDocs,doc,deleteDoc,getDoc,setDoc} from "firebase/firestore"

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS

function FormAddVideo() {
    const dispatch = useDispatch();
    const [labels, setLabels] = useState([]);
    const [nameError, setNameError] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [labelsError, setLabelsError] = useState(false);
    const [pictureError, setPictureError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const labelText = useRef();
    const nameText = useRef();
    const urlText = useRef();
    const pictureText = useRef();
    const descriptionText = useRef();

    
  const addVideo = ()=>{
    dispatch(
      {
        type: "ADD",
        payload:{
          name:nameText.current.value, 
          url:urlText.current.value,
          theme: labels,
          picture: pictureText.current.value,
          description: descriptionText.current.value
        }
      }
    )
  }

    const addLabel = ()=>{
        setLabels([...labels, labelText.current.value])
    }

    const deleteLabel = (labelSelected)=>{
        setLabels(labels.filter((label)=>label!==labelSelected));
    }
    const validateName = ()=>{
        if(nameText.current.value.length > 5)
            setNameError(false)
        else 
            setNameError(true)
    }
    const validateUrl = ()=>{
        setUrlError(!urlText.current.value.includes("www.youtube.com/embed"))
    }
   
    const validateLabel = ()=>{
        setLabelsError(labels.length<1);
    }
    const validatePicture = ()=>{
        setPictureError(!pictureText.current.value.includes("https://") && 
        (!pictureText.current.value.includes("jpg")||!pictureText.current.value.includes("jpeg")
        ||!pictureText.current.value.includes("bmp")));
    }

    const validateDescription = ()=>{
        setDescriptionError(descriptionText.current.value<30)
    }

    const validateFields = async (e)=>{
        e.preventDefault();
        validateName();
        validateUrl();
        validateLabel();
        validatePicture();
        validateDescription();
        try{   //ADD A BASE DE DATOS
            await addDoc(collection(db,'videos'),{
                id:1,
                name:"Cozy Jazz Music at Snow Christmas Night", 
                theme: ["jazz","christmas","winter"],
                url:"https://www.youtube.com/embed/qFbY87Gm7dI",
                picture: "https://i.ytimg.com/vi/qFbY87Gm7dI/maxresdefault.jpg?v=6395b513",
                description: "On cold snow nights, what could be better than sitting somewhere in the middle of the noisy city, sipping your favorite drink and watching the space darken in a corner of this cozy room, on a christmas night. The relaxing and smooth melodies of Piano Jazz are enough for those who sit here to feel like they can drop their souls into that wonderful space. A truly meaningful relaxation time before the end of a long day. Take time for yourself, enjoy the peace of life through delicious cups of coffee and some soft jazz music.",
                views:0
            })
        }catch(err){
            console.log(err)
        }
        if(!nameError&&!urlError&&!labelsError&&!pictureError&&!descriptionError)
        {
            addVideo();
     
        }
    }
    
  return (
    <div className='form-main'>
     <video src='/videos/video-form.mp4'  type="video/mp4"  autoPlay loop muted />
        <div className='form-add-container'>
            <form className='form-add'>
                <input type="text" onBlur={validateName} className={nameError && "error-border"} ref={nameText} placeholder="name"/>
                {nameError && <p className='error-label-left-top'>Please verify the name<br/> (no less than 5 characters)</p>}
                <input type="text" onBlur={validateUrl} className={urlError && "error-border"} ref={urlText} placeholder="url"></input>
                {urlError && <p className='error-label-right-top'>Please verify the URL.<br/> Use a validate embed youtube link</p>}
                <input type="text" onBlur={validateLabel} className={labelsError && "error-border"} ref={labelText} placeholder="labels"></input>
                <i className="plus-btn fas fa-plus" onClick={addLabel}></i>
                {labels.length > 0 ? 
                (
                    <div className='labels-container'>
                        {labels.map((label)=> (<p> <i className="plus-btn fas fa-minus-circle" onClick={()=>deleteLabel(label)}></i> {label}</p>))}
                    </div>
                ):
                (
                    <div className='labels-container'>
                        <p>There are no labels added</p>
                    </div>
                )}
                <input type="text" onBlur={validatePicture} className={`picture-input ${pictureError && "error-border"}`} ref={pictureText} placeholder="picture"></input>
                {pictureError && <p className='error-label-left-middle'>Please verify the picture link. <br/>Must begin with "https://" and be .jpg, .jpeg or .bmp</p>}
                <textarea type="text" onBlur={validateDescription} className={`description-input ${descriptionError && "error-border"}` } ref={descriptionText} placeholder="description"></textarea>
                {descriptionError && <p className='error-label-bottom'>Please verify the description. Can't be less than 30 characters</p>}
                <button type='submit' onClick={validateFields}> Submit </button>
            </form>
        </div>
    </div>
  )
}

export default FormAddVideo
