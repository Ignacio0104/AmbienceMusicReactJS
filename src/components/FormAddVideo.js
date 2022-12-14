import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from '../store/StoreProvider';
import "./FormAddVideo.css"

import  {firebaseApp}  from "../credentials";
import {getAuth, signOut} from 'firebase/auth'
import {getFirestore,collection,addDoc,getDocs,doc,deleteDoc,getDoc,setDoc} from "firebase/firestore"
import { useNavigate } from 'react-router-dom';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS

function FormAddVideo(props) {
    const dispatch = useDispatch();
    const [labels, setLabels] = useState([]);
    const [nameError, setNameError] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [labelsError, setLabelsError] = useState(false);
    const [pictureError, setPictureError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [editionMode, setEditionMode] = useState(false);
    const [modalFormVisble, setModalFormVisble] = useState(false)
    const labelText = useRef();
    const nameText = useRef();
    const urlText = useRef();
    const pictureText = useRef();
    const descriptionText = useRef();

    const history = useNavigate();

    useEffect(() => {
        console.log(props)
        setEditionMode(props.videoToEdit !== undefined)
        if(editionMode){
            setLabels(props.videoToEdit.theme);
        }

    }, [editionMode])
    

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

  const updateVideo = ()=>{
    dispatch(
      {
        type: "UPDATE",
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
    
    const addRegister =async ()=>{
        
        if(!nameError&&!urlError&&!labelsError&&!pictureError&&!descriptionError)
        {
            addVideo();   
            try{  
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
            }
        }
    }

    const updateRegister =async (id)=>{
        
        if(!nameError&&!urlError&&!labelsError&&!pictureError&&!descriptionError)
        {
            updateVideo();   
            
            try{         
                await setDoc(doc(db,"videos",id),{
                    name:nameText.current.value, 
                    url:urlText.current.value,
                    theme: labels,
                    picture: pictureText.current.value,
                    description: descriptionText.current.value,
                    views: props.videoToEdit.views
                })                     
            }catch(err){
                console.log(err)
            }
        }
    }

    const deleteRegister = async (id)=>{        
        await deleteDoc(doc(db,"videos",id))
        dispatch({
            type: "DELETE",
            payload:{
                id: id
            } 
        })
    }

    const validateFields = (e)=>{
        e.preventDefault();
        validateName();
        validateUrl();
        validateLabel();
        validatePicture();
        validateDescription();
        if(editionMode){
            updateRegister(props.videoToEdit.id);
        }else{
            addRegister();
        }
        history("/")
    }

    const deleteVideo = (e)=>{
        e.preventDefault();
        setModalFormVisble(true);
        /*deleteRegister(props.videoToEdit.id);
        history("/");*/
    }

    const confirmDelete= (boolean)=>{
        if(boolean){
            deleteRegister(props.videoToEdit.id);
            history("/");
        }
        setModalFormVisble(false)
    }
    
  return (
    <div className='form-main'>
     <video src='/videos/video-form.mp4'  type="video/mp4"  autoPlay loop muted />
     <div className='modal-form-delete' style={{display: modalFormVisble ? "flex" : "none"}}>
        <div className='modal-form-content'>
            <h1>Are you sure you want to delete this register?</h1>
            <button onClick={()=>confirmDelete(true)}>Accept</button>
            <button onClick={()=>confirmDelete(false)}>Cancel</button>
        </div>
     </div>
        <div className='form-addVideo-container'>
            <form className='form-add'>
                <input type="text" onBlur={validateName} className={nameError && "error-border"} 
                ref={nameText} placeholder="name" defaultValue={editionMode ? props.videoToEdit.name : ""}/>
                <input type="text" onBlur={validateUrl} className={urlError && "error-border"} 
                ref={urlText} placeholder="url" defaultValue={editionMode ? props.videoToEdit.url : ""}></input>
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
                <input type="text" onBlur={validatePicture} 
                className={`picture-input ${pictureError && "error-border"}`} ref={pictureText} 
                placeholder="picture" defaultValue={editionMode ?  props.videoToEdit.picture : ""}></input>
                <p className='error-label-center'> {pictureError && "Link must begin with 'https://' and be .jpg, .jpeg or .bmp"}</p>
                <textarea type="text" onBlur={validateDescription} 
                className={`description-input ${descriptionError && "error-border"}` } 
                ref={descriptionText} placeholder="description" 
                defaultValue={editionMode ? props.videoToEdit.description: ""}></textarea>
                <p className='error-label-center'> {descriptionError && "Description can't be less than 30 characters"}</p>
                {
                    editionMode ?
                    (<div className='edition-mode-btns'>
                        <button type='submit' onClick={validateFields}> Edit </button>
                        <button type='submit' onClick={deleteVideo}> Delete </button>
                    </div>)
                    :
                    <button type='submit' className='submit-btn-add' disabled={allowSubmit ? false : true} onClick={validateFields}> Submit </button>
                }        
            </form>
        </div>
    </div>
  )
}

export default FormAddVideo

