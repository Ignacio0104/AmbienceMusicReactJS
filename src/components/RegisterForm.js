import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from '../store/StoreProvider';
import "./RegisterForm.css"

import  {firebaseApp}  from "../credentials";
import {createUserWithEmailAndPassword, getAuth, signOut} from 'firebase/auth'
import {getFirestore,collection,addDoc,getDocs,doc,deleteDoc,getDoc,setDoc} from "firebase/firestore"

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS

function RegisterForm() {
    const [register, setRegister] = useState(false)
    const [passwordOneVisible, setPasswordOneVisible] = useState(false)
    const [passwordTwoVisible, setPasswordTwoVisible] = useState(false)
    const [nameError, setNameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [passwordErrorOne, setPasswordErrorOne] = useState(false);
    const [passwordErrorTwo, setPasswordErrorTwo] = useState(false);
    const [passwordEqualError, setPasswordEqualError] = useState(false);
    const [allowSubmit, setAllowSubmit] = useState(false);
    const emailText = useRef();
    const nameText = useRef();
    const lastnameText = useRef();
    const dateText = useRef();
    const passwordOneText = useRef();
    const passwordTwoText = useRef();
    const genreFemBtn = useRef();

  const toogleVisibility = (e)=>{
    if(e.current.type==="text")
    {
        e.current.type = "password"
        if(e.current.id === "passwordOne")
        {
            setPasswordOneVisible(true)
        }else{
            setPasswordTwoVisible(true)
        }
    }else
    {
        e.current.type="text"
        if(e.current.id === "passwordOne")
        {
            setPasswordOneVisible(false)
        }else{
            setPasswordTwoVisible(false)
        }
    }
  
  }

    const validateName = ()=>{
        enableButton();
        if(/\D/.test(nameText.current.value) || nameText.current.value.length < 6)
        {
            setNameError(false)
        }else{
            setNameError(true)
        }          
    }

    const validateLastname = ()=>{
        enableButton();
        if(/\D/.test(nameText.current.value)|| nameText.current.value.length <6)
        {
            setLastnameError(false)
        }else{
            setLastnameError(true)
        }          
    }
   
    const validateEmail = ()=>{
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailText.current.value))
        {
            setEmailError(false);
        }else{
            setEmailError(true)
        }
    }
    const validateDate = ()=>{
        enableButton();
        if(dateText.current.value > new Date().getDate())
        {
            setDateError(true)
        }else{
            setDateError(false)
        }
    }

    const validatePassword = ()=>{
        enableButton();
        setPasswordErrorOne(passwordOneText.current.value.length<8)
        setPasswordErrorTwo(passwordTwoText.current.value.length<8)
        setPasswordEqualError(!(passwordTwoText.current.value === passwordOneText.current.value))
    }

    const enableButton = ()=>{
        if(nameText.current.value.length >0 && lastnameText.current.value.length>0
            && dateText.current.value.length >0 && passwordOneText.current.value.length >0)
            {
               setAllowSubmit(true);
            }else{
                setAllowSubmit(true);
            }
    }
    
    const submitRequest = async (e)=>{
        e.preventDefault()
        let genre = genreFemBtn.current.checked ? "Female" : "Male";
        let idLogin =  await createUserWithEmailAndPassword(auth,emailText.current.value,passwordOneText.current.value);
        if(!nameError&&!lastnameError&&!emailError&&!dateError&&!passwordErrorOne&&!passwordErrorTwo)
        {
            console.log(idLogin)
            try{  
                await addDoc(collection(db,'users'),{
                    userId: idLogin.user.uid,
                    name:nameText.current.value, 
                    lastname:lastnameText.current.value,
                    email: emailText.current.value,
                    dateOfBirth: dateText.current.value,
                    genre: genre,
                    role: "admin"
                })
            }catch(err){
                console.log(err)
            }
        }
    }

    const validateFields = (e)=>{
        e.preventDefault();
        validateName();
        validateLastname();
        validateEmail();
        validateDate();
        validateEmail();
        submitRequest();
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
                <input type="email" onBlur={validateEmail} className={`email-input ${emailError && "error-border"}`} 
                ref={emailText} placeholder="email"></input>
                <p className='error-label-center'> {emailError && "Use a valid email address"}</p>     
                <input type="date" ref={dateText} onBlur={validateDate} className={dateError && "error-border"} ></input>   
                <div className='radio-btn-container'>
                    <div className='female-radiobtn'>
                        <span class="radio-checkbox__text">Female</span>
                        <input class="radio-checkbox__input" ref={genreFemBtn} type="radio" name="genre" value="female" checked/>
                    </div>
                    <div className='male-radiobtn'>
                        <span class="radio-checkbox__text">Male</span>
                        <input class="radio-checkbox__input" type="radio" name="genre" value="male"/>
                    </div>
                </div>
                <p className='error-label-center'> {dateError && "Date of birth can't be larger than today"}</p>
                <div className='password-container'>
                    <input type="password" id='passwordOne' onBlur={validatePassword} className={`${(passwordErrorOne || passwordEqualError) && "error-border"}` } ref={passwordOneText} placeholder="Password"></input>
                    <i onClick={()=>toogleVisibility(passwordOneText)} class={`${passwordOneVisible ? "fas fa-eye" : "fas fa-eye-slash" }`}></i>
                </div>
                <div className='password-container'>
                    <input type="password" onBlur={validatePassword} className={`${(passwordErrorTwo || passwordEqualError) && "error-border"}` } ref={passwordTwoText} placeholder="Repeat password"></input>
                    <i onClick={()=>toogleVisibility(passwordTwoText)} class={`${passwordTwoVisible ? "fas fa-eye" : "fas fa-eye-slash" }`}></i>
                </div>
                <p> {passwordErrorOne && "Password can't be less than 8 characters"}<br/>{passwordEqualError && "Passwords do not match"}</p>
                <p> {passwordErrorTwo && "Password can't be less than 8 characters"}</p>
                <button type='submit' disabled={allowSubmit ? false : true} onClick={submitRequest}> Submit </button>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm
