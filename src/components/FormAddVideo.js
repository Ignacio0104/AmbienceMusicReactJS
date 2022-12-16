import React, { useEffect, useRef, useState } from 'react'
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
    const [allowSubmit, setAllowSubmit] = useState(false)
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
        if(labelText.current.value.length >0)
        {
            setLabels([...labels, labelText.current.value]);
            labelText.current.value = ""
        }
    }

    const deleteLabel = (labelSelected)=>{
        setLabels(labels.filter((label)=>label!==labelSelected));
    }
    const validateName = ()=>{
        enableButton();
        if(nameText.current.value.length > 5)
            setNameError(false)
        else 
            setNameError(true)
    }
    const validateUrl = ()=>{
        enableButton();
        setUrlError(!urlText.current.value.includes("www.youtube.com/embed"))
    }
   
    const validateLabel = ()=>{
        enableButton();
        setLabelsError(labels.length<1);
    }
    const validatePicture = ()=>{
        enableButton();
        setPictureError(!pictureText.current.value.includes("https://") && 
        (!pictureText.current.value.includes("jpg")||!pictureText.current.value.includes("jpeg")
        ||!pictureText.current.value.includes("bmp")));
    }

    const validateDescription = ()=>{
        enableButton();
        setDescriptionError(descriptionText.current.value.length<30)
    }

    const enableButton = ()=>{
        if(nameText.current.value.length >0 && urlText.current.value.length>0
            && pictureText.current.value.length >0 && descriptionText.current.value.length >0)
            {
               setAllowSubmit(true);
            }else{
                setAllowSubmit(true);
            }
    }
    
    const updateList = ()=>{
        
        if(!nameError&&!urlError&&!labelsError&&!pictureError&&!descriptionError)
        {
            //addVideo();   
            alert("Estoy aca")
            /*try{  
                alert("Estoy agregando")
                await addDoc(collection(db,'videos'),{
                    name:nameText.current.value, 
                    url:urlText.current.value,
                    theme: labels,
                    picture: pictureText.current.value,
                    description: descriptionText.current.value,
                    views:0
                })
            }catch(err){
                console.log(err)
            }*/
        }
    }

    const validateFields = (e)=>{
        e.preventDefault();
        validateName();
        validateUrl();
        validateLabel();
        validatePicture();
        validateDescription();
        updateList();
    }
    
  return (
    <div className='form-main'>
     <video src='/videos/video-form.mp4'  type="video/mp4"  autoPlay loop muted />
        <div className='form-add-container'>
            <form className='form-add'>
                <input type="text" onBlur={validateName} className={nameError && "error-border"} ref={nameText} placeholder="name"/>
                <input type="text" onBlur={validateUrl} className={urlError && "error-border"} ref={urlText} placeholder="url"></input>
                <p> {nameError && "Minimun 6 characters"}</p>
                <p> {urlError && "Use a validate embed youtube link"}</p>
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
                <p className='error-label-center'> {pictureError && "Link must begin with 'https://' and be .jpg, .jpeg or .bmp"}</p>
                <textarea type="text" onBlur={validateDescription} className={`description-input ${descriptionError && "error-border"}` } ref={descriptionText} placeholder="description"></textarea>
                <p className='error-label-center'> {descriptionError && "Description can't be less than 30 characters"}</p>
                <button type='submit' disabled={allowSubmit ? false : true} onClick={validateFields}> Submit </button>
            </form>
        </div>
    </div>
  )
}

export default FormAddVideo



/*return (
    <div className='form-main'>
     <video src='/videos/video-form.mp4'  type="video/mp4"  autoPlay loop muted />
        <div className='form-add-container'>
            <form className='form-add'>
                <input type="text" onBlur={validateName} className={nameError && "error-border"} ref={nameText} placeholder="name"/>
                {nameError && <p className='error-label-left-top'>Minimun 6 characters</p>}
                <input type="text" onBlur={validateUrl} className={urlError && "error-border"} ref={urlText} placeholder="url"></input>
                {urlError && <p className='error-label-right-top'>Use a validate embed youtube link</p>}
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
                {pictureError && <p className='error-label-left-middle'>Link must begin with "https://" and be .jpg, .jpeg or .bmp</p>}
                <textarea type="text" onBlur={validateDescription} className={`description-input ${descriptionError && "error-border"}` } ref={descriptionText} placeholder="description"></textarea>
                {descriptionError && <p className='error-label-bottom'>Description can't be less than 30 characters</p>}
                <button type='submit' onClick={validateFields}> Submit </button>
            </form>
        </div>
    </div>
  )*/