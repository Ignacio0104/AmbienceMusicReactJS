
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./UserProfile.css"
import  {firebaseApp}  from "../credentials";
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import {getFirestore, doc, updateDoc} from "firebase/firestore"

const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS

function UserProfile(props) {
  const [editMode, setEditMode] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [gender, setGender] = useState("")
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const dateTextRef = useRef();
  const nameTextRef = useRef();
  const lastnameTextRef = useRef();

  const history = useNavigate();
    const user = {
        name: localStorage.getItem("userName"),
        lastname: localStorage.getItem("lastname"),
        dateOfBirth: localStorage.getItem("dateOfBirth"),
        email: localStorage.getItem("email"),
        genre: localStorage.getItem("genre"),
        role: localStorage.getItem("role"),
        id: localStorage.getItem("userId"),
        docId:localStorage.getItem("docId")
    }

  const validateName = ()=>{
    if(/\d/.test(nameTextRef.current.value) || nameTextRef.current.value.length < 2)
    {
        setNameError(true)
    }else{
        setNameError(false)
    }     
    setAllowSubmit(true);     
}

const validateLastname = ()=>{
    if(/\d/.test(lastnameTextRef.current.value)|| lastnameTextRef.current.value.length <3)
    {
        setLastnameError(true)
    }else{
        setLastnameError(false)
    }          
    setAllowSubmit(true);
}
const validateDate = ()=>{
    if(dateTextRef.current.value > new Date().getDate())
    {
        setDateError(true)
    }else{
        setDateError(false)
    }
    setAllowSubmit(true);
}

    const updateGender = (gender)=>{
      setGender(gender);
      localStorage.setItem("genre",gender);
    }

    const updateRegister = async (e)=>{
      e.preventDefault();
      validateDate();
      validateName();
      validateLastname();
      if(!nameError&&!lastnameError&&!dateError)
      {
        const userReference = doc(db, "users", user.docId);
        localStorage.setItem("userName",nameTextRef.current.value);
        localStorage.setItem("lastname",lastnameTextRef.current.value);
        localStorage.setItem("dateOfBirth",dateTextRef.current.value)
        await updateDoc(userReference, {
          name: nameTextRef.current.value,
          lastname: lastnameTextRef.current.value,
          dateOfBirth: dateTextRef.current.value,
          genre: localStorage.getItem("genre")
        });
        setError(false)
        toogleEditMode();
      }else{
        setError(true);       
      }    
    }
    const toogleEditMode = ()=>{
      setAllowSubmit(false);
      setEditMode(!editMode);
      if(!editMode)
      {
        setError(false)
      }
    }

    const logout = ()=>{     
      localStorage.clear();
      props.changeLogin(false);
      history("/");
    }
  return (
    <div className='main-container'>
    <img src='/images/profile-background.jpg' className='background-profile' alt='background'></img>
      <div className='profile-container'>
        <div className='profile-pic-container'>
          <img width="300px" height="300px" src={user.genre==="Female" ? "/images/icon-women-profile.png" :"/images/icon-men-profile.png"} alt="profile"></img>
          { editMode && (
            <div>
            <p> <span onClick={()=>updateGender("Male")} style={{fontWeight: gender==="Male" && "bold"}} className='select-maleFemale'>Male</span> | 
            <span onClick={()=>updateGender("Female")} style={{fontWeight: gender==="Female" && "bold"}} className='select-maleFemale'>Female</span></p>
            </div>
            )
            }
          <p onClick={logout}>Logout <i class="fas fa-sign-out-alt"></i></p>
        </div>
        <div className='profile-info-container'>
          <div className='profile-info-title'>
            <h2>{editMode ? <input onBlur={validateName} ref={nameTextRef} placeholder="Name"  type="text"></input> : user.name + " "} 
            {editMode ? <input onInput={validateLastname} ref={lastnameTextRef} placeholder="Lastname"  type="text"></input> : user.lastname} </h2>
            <i onClick={toogleEditMode} style={{cursor:"pointer"}} class="fas fa-edit"></i>    
          </div> 
          <h4> Date of Birth: {editMode ? <input onBlur={validateDate} ref={dateTextRef} type="date"></input> :  user.dateOfBirth}</h4>
          <h4> Email: {user.email}</h4>
           {error && <p>Please verify the entered information</p>}
          {
            editMode &&
            (
              <div className='button-container'>
                <button onClick={updateRegister} disabled={!allowSubmit} style={{cursor : allowSubmit ? "pointer" : "default"}} type="submit"> Confirm</button>
                <button onClick={updateRegister}> Cancel </button>
              </div>
            )
          }
        </div>
      </div> 
    </div>
  )
}

export default UserProfile
