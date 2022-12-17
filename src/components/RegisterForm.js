import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from '../store/StoreProvider';
import "./RegisterForm.css"

import  {firebaseApp}  from "../credentials";
import {getAuth, signOut} from 'firebase/auth'
import {getFirestore,collection,addDoc,getDocs,doc,deleteDoc,getDoc,setDoc} from "firebase/firestore"

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS

function RegisterForm() {
    const dispatch = useDispatch();
    const [labels, setLabels] = useState([]);
    const [nameError, setNameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [pictureError, setPictureError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [allowSubmit, setAllowSubmit] = useState(false)
    const emailText = useRef();
    const nameText = useRef();
    const lastnameText = useRef();
    const pictureText = useRef();
    const descriptionText = useRef();

  const addVideo = ()=>{
    dispatch(
      {
        type: "ADD",
        payload:{
          name:nameText.current.value, 
          url:lastnameText.current.value,
          theme: labels,
          picture: pictureText.current.value,
          description: descriptionText.current.value
        }
      }
    )
  }

    const validateName = ()=>{
        enableButton();
        if(!/\D/.test(nameText.current.value) && nameText.current.value.length > 5)
        {
            setNameError(false)
        }else{
            setNameError(true)
        }          
    }

    const validateLastname = ()=>{
        enableButton();
        if(!/\D/.test(nameText.current.value) && nameText.current.value.length > 5)
        {
            setLastnameError(false)
        }else{
            setLastnameError(true)
        }          
    }
    const validateUrl = ()=>{
        enableButton();
        setLastnameError(!lastnameText.current.value.includes("www.youtube.com/embed"))
    }
   
    const validateEmail = ()=>{
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailText.current.value))
        {
            setEmailError(false);
        }else{
            setEmailError(true)
        }
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
        if(nameText.current.value.length >0 && lastnameText.current.value.length>0
            && pictureText.current.value.length >0 && descriptionText.current.value.length >0)
            {
               setAllowSubmit(true);
            }else{
                setAllowSubmit(true);
            }
    }
    
    const updateList = ()=>{
        
        if(!nameError&&!lastnameError&&!emailError&&!pictureError&&!descriptionError)
        {
            //addVideo();   
            /*try{  
                alert("Estoy agregando")
                await addDoc(collection(db,'videos'),{
                    name:nameText.current.value, 
                    url:lastnameText.current.value,
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
        validateEmail();
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
                <input type="text" onBlur={validateLastname} className={lastnameError && "error-border"} ref={lastnameText} placeholder="lastname"></input>
                <p> {nameError && "Minimun 6 characters. Must contain at least one letter"}</p>
                <p> {lastnameError && "Minimun 6 characters. Must contain at least one letter"}</p>   
                <input type="email" onBlur={validateEmail} className={`email-input ${emailError && "error-border"}` } 
                ref={emailText} placeholder="email"></input>
                <p className='error-label-center'> {emailError && "Use a valid email address"}</p>     
                <input type="date" className={emailError && "error-border"} ></input>   
                <div className='radio-btn-container'>
                    <div className='female-radiobtn'>
                        <span class="radio-checkbox__text">Female</span>
                        <input class="radio-checkbox__input" type="radio" name="genre" value="female" checked/>
                    </div>
                    <div className='male-radiobtn'>
                        <span class="radio-checkbox__text">Male</span>
                        <input class="radio-checkbox__input" type="radio" name="genre" value="male"/>
                    </div>
                </div>
                <p className='error-label-center'> {nameError && "Link must begin with 'https://' and be .jpg, .jpeg or .bmp"}</p>
                <input type="password" onBlur={validateDescription} className={`${descriptionError && "error-border"}` } ref={descriptionText} placeholder="Password"></input>
                <input type="password" onBlur={validateDescription} className={`${descriptionError && "error-border"}` } ref={descriptionText} placeholder="Repeat password"></input>
                <p> {descriptionError && "Description can't be less than 30 characters"}</p>
                <p> {descriptionError && "Description can't be less than 30 characters"}</p>
                <button type='submit' disabled={allowSubmit ? false : true} onClick={validateFields}> Submit </button>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm
